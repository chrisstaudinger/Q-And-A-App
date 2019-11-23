import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Questions from './components/Questions/Questions';
import Question from './components/Question/Question';
import Callback from './components/Callback/Callback';
import NewQuestion from './components/NewQuestion/NewQuestion';
import SecuredRoute from './components/SecuredRoute/SecuredRoute';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Questions />
        <Route exact path='/' component={Questions}/>
        <Route exact path='/question/:questionId' component={Question}/>
        <Route exact path='/callback' component={Callback}/>
        <SecuredRoute path='/new-question' component={NewQuestion} />
      </div>
    );
  }
}

export default App;