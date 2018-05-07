import { createKernel, updateState, renderApp } from "edge-core"

import State from "../State"
import App, { prepare } from "../App"

// eslint-disable-next-line no-console
console.log(`[APP] Build: ${process.env.NODE_ENV}-${process.env.BUILD_TARGET}`)
console.log(`[APP] Supported locales: ${process.env.SUPPORTED_LOCALES}`)

// We do not require a root element to exist in HTML
const root = document.createElement("div")
root.id = "root"
document.body.appendChild(root)

// Dummy data for now
const state = {
  edge: {
    intl: {
      locale: "de-DE",
      language: "de",
      region: "DE"
    }
  }
}

const kernel = createKernel(State, { state, supportedLocales: process.env.SUPPORTED_LOCALES })
prepare(kernel)
  .then(() => renderApp(App, kernel))
  .catch(error => {
    throw new Error(`Unable to rehydrate client App: ${error}!`)
  })

// Hot Loading Support
if (process.env.NODE_ENV === "development" && module.hot) {
  // Accept changes to the Edge-Core API, but don't have any actions to implement.
  module.hot.accept("edge-core")

  // Any changes to our App will cause a hotload re-render.
  module.hot.accept("../App", () => {
    const NextApp = require("../App").default
    renderApp(NextApp, kernel)
  })

  // Any changes to our state machinery will update the reducers.
  module.hot.accept("../State", () => {
    const NextState = require("../State").default
    updateState(NextState, kernel)
  })
}
