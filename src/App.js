import React from "react"
import Dashboard from "./component/Dashboard/"
import GlobalStyle from "./GlobalStyle"
import { Provider } from "react-redux"
import store from "./redux/store/"

export default function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Dashboard />
    </Provider>
  )
}
