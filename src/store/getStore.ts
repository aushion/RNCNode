import promiseMiddleware from 'redux-promise'

import { createStore, compose, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './reducers'

if (__DEV__) {
  // @ts-ignore
  global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest
}

let store

export default function configureStore() {
  if (store) {
    return store
  }

  const middlewares = [promiseMiddleware]

  store = createStore(
    rootReducer,
    {},
    compose(
      __DEV__
        ? composeWithDevTools({})(applyMiddleware(...middlewares))
        : applyMiddleware(...middlewares)
    )
  )

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./reducers/index').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
