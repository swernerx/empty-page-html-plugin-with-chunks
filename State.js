export default {
  /**
   * Returns configuration objects for different areas of the Edge
   * powered application infrastructure.
   */
  getConfig(state, topic) {
    return null
  },

  /**
   * Return map of routes. Match redux actions to urls.
   */
  getRoutes() {
    return {
      HOME: "/",
    }
  },

  /**
   * Return list of Redux store enhancers to use.
   */
  getEnhancers() {
    return []
  },

  /**
   * Create mapping of reducers to use for the Redux store.
   */
  getReducers() {
    return {
    }
  },

  /**
   * Create list of Redux middleware to use.
   */
  getMiddlewares() {
    return []
  }
}
