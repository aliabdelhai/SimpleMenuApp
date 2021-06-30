import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'mobx-react'
import RestaurantsStore from './Store/RestaurantsStore';


let restaurantsStore = new RestaurantsStore()
const store = {restaurantsStore}

ReactDOM.render(
  <Provider {...store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
