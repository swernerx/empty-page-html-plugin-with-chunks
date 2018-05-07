import React from "react"
import { requiresIntlPolyfill, ensureIntlSupport, ensureReactIntlSupport, routed } from "edge-core"

import "./Init"
import Styles from "./App.module.css"

/* eslint-disable no-console */

export function prepare(kernel) {
  const intl = kernel.intl

  console.log("CALLED PREPARE!")

  return Promise.resolve()
}

export default function Application() {
  return (
    <div className={Styles.root}>
      <main className={Styles.content}>
        huhu
      </main>
    </div>
  )
}
