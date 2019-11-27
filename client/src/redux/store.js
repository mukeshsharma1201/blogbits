import { createStore, applyMiddleware, compose } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducer';
import thunk from 'redux-thunk';
export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // options like actionSanitizer, stateSanitizer
    })
  : compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    routerMiddleware(history), // for dispatching history actions
    thunk,
  ),
  // other store enhancers if any
);

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    enhancer,
  );

  return store;
}

// const store = createStore(reducer,enhancer);
// export default store;
