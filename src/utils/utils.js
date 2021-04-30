import RNSecureStorage, { ACCESSIBLE } from "rn-secure-storage"

const storeTokens = async (access_token, refresh_token) => {
  try {
    await RNSecureStorage.set("access_token", access_token, { accessible: ACCESSIBLE.WHEN_UNLOCKED })
    await RNSecureStorage.set("refresh_token", refresh_token, { accessible: ACCESSIBLE.WHEN_UNLOCKED })
  } catch (e) {
    throw new Error(e)
  }
}

const removeTokens = async () => {
  try {
    await RNSecureStorage.remove("access_token")
    await RNSecureStorage.remove("refresh_token")
  } catch (e) {
    throw new Error(e)
  }
}

export const numberFormat = number => {
  if (number) {
    return new Intl.NumberFormat("tr-TR", {
      maximumSignificantDigits: 10,
    }).format(number)
  } else {
    return "-"
  }
}

module.exports = {
  storeTokens: storeTokens,
  removeTokens: removeTokens,
  numberFormat: numberFormat,
}
