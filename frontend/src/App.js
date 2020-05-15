import React, { Component } from 'react';
import {Route, withRouter, BrowserRouter as Router } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Questions from './components/Questions/Questions';
import Question from './components/Question/Question';
import Callback from './components/Callback/Callback';
import NewQuestion from './components/NewQuestion/NewQuestion';
import SecuredRoute from './components/SecuredRoute/SecuredRoute';
import auth0Client from './Auth';
import { UserContext } from './context/CurrentUser'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    }
  }

  async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      this.setState({checkingSession:false});
      return;
    }
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
    this.setState({checkingSession:false});
  }

  render() {
    return (
        <UserContext.Provider value={auth0Client.getProfile()}>
          <NavBar />
          <Route exact path='/' component={Questions}/>
          <Route exact path='/question/:questionId' component={Question}/>
          <Route exact path='/callback' component={Callback}/>
          <SecuredRoute path='/new-question'
          component={NewQuestion}
          checkingSession={this.state.checkingSession} />
        </UserContext.Provider>
    );
  }
}

export default withRouter(App);
// export default App