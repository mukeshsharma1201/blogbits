import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase';
import LandingPage from './screens/LandingPage';
import Editor from './screens/Editor';
import SignInWith from './components/SignIn';
import ArticleView from './screens/ArticleView';

// Configure Firebase.
const config = {
  apiKey: 'AIzaSyDHaBxkob48aPp0LNBF8cEXSDf1-WTWvkk',
  authDomain: 'blog-bits.firebaseapp.com',
};
firebase.initializeApp(config);

function App() {
  return (
    <Router>
      <SignInWith />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/editor' component={Editor} />
        <Route path='/articleview/:id' component={ArticleView} />
        {/* <Route path="**" component={LandingPage} /> */}
      </Switch>
    </Router>
  );
}

export default App;
