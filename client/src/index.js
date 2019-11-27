import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ConnectedRouter } from 'connected-react-router';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/medium.css';
//REDUX
import { Provider } from 'react-redux';
import configureStore, { history } from './redux/store';
import { getUser } from './redux/actions/actions';

const store = configureStore();

//Already logged in User
if (localStorage.Auth) {
  console.log('Already logged In user');
  console.log(localStorage.Auth);

  //set stored info
  store.dispatch({ type: 'SET_USER', user: JSON.parse(localStorage.Auth) });

  //fetch new info for user
  // var _id = JSON.parse(localStorage.Auth).uid;
  // getUser(_id).then(res => {
  //   console.log('res>>>', JSON.parse(res));
  //   store.dispatch({ type: 'SET_USER', user: res });
  // });
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
