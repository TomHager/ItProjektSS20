import React from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Header from './components/layout/Header';
// import Register from "./components/layout/Register";
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import ReportNavigation from './components/pages/ReportNavigation';
import About from './components/pages/About';
import SignIn from './components/pages/SignIn';

// import Theme from './Theme';
// import UserBO from './api/UserBO';
// import ShoppingAPI from './api/ShoppingAPI';
// import LoadingProgress from './components/dialogs/LoadingProgress';
// import ContextErrorMessage from './components/dialogs/ContextErrorMessage';

/**
 * The main administration app. It uses Googles firebase to log into the backend.
 * For routing the user to the respective pages, react-router-dom ist used.
 *
 * @see See Google [firebase.auth()](https://firebase.google.com/docs/reference/js/firebase.auth.Auth)
 * @see See Google [firebase.auth().signInWithRedirect](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithredirect)
 * @see [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start)
 *
 * @author Tom Hager
 * @author Lukas Rutkauskas
 */

export default class App extends React.Component {
  // Your web app's Firebase configuration
  #firebaseConfig = {
    apiKey: 'AIzaSyD498NU9OvpRyOx3P8BPXFwgZQTUpuI_2M',
    authDomain: 'ikauf-cd279.firebaseapp.com',
    databaseURL: 'https://ikauf-cd279.firebaseio.com',
    projectId: 'ikauf-cd279',
    storageBucket: 'ikauf-cd279.appspot.com',
    messagingSenderId: '27804612844',
    appId: '1:27804612844:web:ca587cb2195fde89c0cdc9',
  };

  /** Constructor of the app, which initializes firebase  */
  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      currentUser: null,
      appError: null,
      authError: null,
      authLoading: false,
    };
  }

  handleAuthStateChange = (user) => {
    if (user) {
      // The user is signed in
      user
        .getIdToken()
        .then((token) => {
          // Add the token to the browser's cookies. The server will then be
          // able to verify the token against the API.
          // SECURITY NOTE: As cookies can easily be modified, only put the
          // token (which is verified server-side) in a cookie; do not add other
          // user information.
          document.cookie = `token=${token};path=/`;

          // Set the user not before the token arrived
          this.setState({
            currentUser: user,
            authError: null,
          });
        })
        .catch((e) => {
          this.setState({
            authError: e,
          });
        });
    } else {
      // User has logged out, so clear the id token
      document.cookie = 'token=;path=/';

      // Set the logged out user to null
      this.setState({
        currentUser: null,
        authLoading: false,
      });
    }
  };

  /**
   * Handles the sign in request of the SignIn component uses the firebase.auth() component to sign in.
   * @see See Google [firebase.auth()](https://firebase.google.com/docs/reference/js/firebase.auth.Auth)
   * @see See Google [firebase.auth().signInWithRedirect](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithredirect)
   */
  handleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };

  /**
   * Lifecycle method, which is called when the component gets inserted into the browsers DOM.
   * Initializes the firebase SDK.
   *
   * @see See Googles [firebase init process](https://firebase.google.com/docs/web/setup)
   */
  componentDidMount() {
    firebase.initializeApp(this.#firebaseConfig);
    firebase.auth().languageCode = 'en';
    firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
  }

  /** Renders the whole app */
  render() {
    return (
      <div style={{ backgroundColor: '#f4f4f4' }}>
        <Router basename={process.env.PUBLIC_URL}>
          {
            // Is a user signed in?
            this.state.currentUser ? (
              <>
                <Header user={this.state.currentUser} />
                <Redirect from="/" to="/report" />
                <Route exact path="/report">
                  <Grid container direction="row">
                    <Grid style={{ margin: '5px auto' }}>
                      <ReportNavigation />
                    </Grid>
                  </Grid>
                </Route>
                <Route path="/about">
                  <About />
                </Route>
              </>
            ) : (
              // else show the sign in page
              <>
                <Redirect to="/index.html" />
                <SignIn onSignIn={this.handleSignIn} />
              </>
            )
          }
        </Router>
      </div>
    );
  }
}
