import * as React from "react"
import { CommonActions } from "@react-navigation/native"

export const navigationRef = React.createRef()

function replace(name, params) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: name,
          params: params,
        },
      ],
    }),
  )
}

module.exports = {
  replace: replace,
}
