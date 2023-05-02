import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Toaster } from "react-hot-toast";
import { initializeFirebase } from "./firebase"
// import registerServiceWorker from './registerServiceWorker';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../firebase-messaging-sw.js')
    .then(function (registration) {
      console.log('Registration successful, scope is:', registration.scope);
    }).catch(function (err) {
      console.log('Service worker registration failed, error:', err);
    });
}
ReactDOM.render(
  <Provider store={configureStore()}>
    <Toaster
      position="top-centre"
      reverseOrder={false}
      toastOptions={{
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
          fontSize: "17px",
        },
      }}
    />

    <App />
  </Provider>,
  document.getElementById('root')
);
initializeFirebase();
// registerServiceWorker();
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
