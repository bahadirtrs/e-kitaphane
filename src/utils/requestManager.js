import axios from "axios"
import Toast from "react-native-simple-toast"
import RNSecureStorage from "rn-secure-storage"
import NavigationService from "./navigationService"
import { removeTokens, storeTokens } from "./utils"
import { BASE_URL, CLIENT_ID, CLIENT_SECRET, endpoints } from "./constants"
let isRefreshing = false
let failedQueue = []

const RequestManager = options => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
    headers: {
      "Cache-Control": "no-cache",
    },
  })
  if (options.auth) {
    axiosInstance.interceptors.request.use(async request => {
      try {
        const accessToken = await RNSecureStorage.get("access_token")
        request.headers.Authorization = "Bearer " + accessToken
        return request
      } catch (e) {
        throw new Error(e)
      }
    })
  }
  axiosInstance.interceptors.response.use(
    response => {
      return response.data
    },
    error => onError(axiosInstance, error),
  )
  return axiosInstance(options)
}

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

const onError = (axiosInstance, error) => {
  const originalRequest = error.config
  if (!axios.isCancel(error) && error?.response?.status === 401 && !originalRequest?._retry) {
    if (isRefreshing) {
      return new Promise(function (resolve, reject) {
        failedQueue.push({ resolve, reject })
      })
        .then(token => {
          originalRequest.headers.Authorization = "Bearer " + token
          return axiosInstance(originalRequest)
        })
        .catch(err => {
          return Promise.reject(err)
        })
    }
    originalRequest._retry = true
    isRefreshing = true
    return new Promise((resolve, reject) => {
      refreshSession()
        .then(res => {
          originalRequest.headers.Authorization = res.access_token
          processQueue(null, res.access_token)
          resolve(axiosInstance(originalRequest))
        })
        .catch(err => {
          logout()
        })
        .then(() => {
          isRefreshing = false
        })
    })
  } else {
    return Promise.reject(error)
  }
}

const getRefreshedToken = async refreshToken => {
  try {
    const response = await axios({
      method: endpoints.refreshToken.method,
      url: BASE_URL + endpoints.refreshToken.path,
      headers: {
        Accept: "application/json",
      },
      data: {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        scope: "*",
      },
    })
    return {
      access_token: response?.access_token,
      refresh_token: response?.refresh_token,
    }
  } catch (e) {
    throw new Error(e)
  }
}

export const getToken = async() =>{
  try {
    const getToken=await RNSecureStorage.get("access_token")
      return getToken
  } catch (error) {
      throw new Error(error)
  }
}

const refreshSession = async () => {
  try {
    const refreshToken = await RNSecureStorage.get("refresh_token")
    const { access_token, refresh_token } = await getRefreshedToken(refreshToken)
    await storeTokens(access_token, refresh_token)
    return {
      access_token,
      refresh_token,
    }
  } catch (e) {
    throw new Error(e)
  }
}

export const logout = () => {
  removeTokens()
    .then(() => {
      navigation.navigate('Anasayfa')
    })
    .catch(() => {
      // LOGOUT ERROR
    })
}

export const onSessionExpire = () => {
  Toast.show("Oturumunuz sonlanmıştır. Devam etmek için lütfen tekrar giriş yapınız.", Toast.LONG)
  NavigationService.replace("Splashscreen", { signOut: true })
}
export default RequestManager
