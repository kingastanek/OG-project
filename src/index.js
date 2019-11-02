import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, combineReducers  } from "redux";
import { reducer as formReducer } from 'redux-form'
import { Provider } from "react-redux";
import reducer from "store/reducers";
import middleware from "store/middleware";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const rootReducer = combineReducers({
  reducer,
  form: formReducer
})


const store = createStore(rootReducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);

serviceWorker.unregister();
