import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
// import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';
import Header from './components/layout/Header';
import About from './components/pages/About';
import ReportNavigation from './components/pages/ReportNavigation';

// import Theme from './Theme';
// import SignIn from './components/pages/SignIn';
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
 * @author Christoph Kunz
 */

class App extends React.Component {
  /** Constructor of the app, which initializes firebase  */
  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {};
  }

  /** Renders the whole app */
  render() {
    return (
      <div style={{ backgroundColor: '#f4f4f4' }}>
        <Router basename={process.env.PUBLIC_URL}>
          <Header />
          <Redirect from="/" to="/report" />
          <Route exact path="/report">
            <ReportNavigation />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Router>
      </div>
    );
  }
}
export default App;
