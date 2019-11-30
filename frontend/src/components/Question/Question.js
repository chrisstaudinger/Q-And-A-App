import React, { Component, useContext } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import SubmitAnswer from './SubmitAnswer';
import auth0Client from '../../Auth';
import Answer from './Answer'
import { UserContext } from '../../context/CurrentUser';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
    };

    this.submitAnswer = this.submitAnswer.bind(this);
  }

  async componentDidMount() {
    await this.refreshQuestion();
  }

  async refreshQuestion() {
    const { match: { params } } = this.props;
    const question = (await axios.get(`http://localhost:5000/${params.questionId}`)).data;
    this.setState({
      question,
    });
  }

  async submitAnswer(answer) {
    await axios.post(`http://localhost:5000/answer/${this.state.question._id}`, {
      answer,
    }, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    });
    await this.refreshQuestion();
  }

  render() {
    const {question} = this.state;
    if (question === null) return <p>Loading ...</p>;
    // console.log(question)
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="jumbotron col-12">
              <h1 className="display-3">{question.title}</h1>
              <p className="lead">{question.description}</p>
              <hr className="my-4" />
              <SubmitAnswer questionId={question._id} submitAnswer={this.submitAnswer} />
              <p>Answers:</p>
              { question.answers.length === 0 && <p>No answers have been submitted for this question yet</p> }
              {
                question.answers && question.answers.map((answer) => <Answer key={answer._id} answer={answer} refreshQuestion={() => this.refreshQuestion()} />)
              }
            </div>
          </div>
          <Buttons question={question} />
        </div>
      </>
    )
  }
}

const Buttons = ({ question }) => {
  const currentUser = useContext(UserContext);
  const deleteQuestion = async () => {}
  const wasCreatedByCurrentUser = currentUser && currentUser.sub === question.userId

  return (
    <div style={{ display: "flex", justifyContent: "flex-end"}}>
    { wasCreatedByCurrentUser && <button className="btn btn-danger" style={{ marginRight: 20 }}>Delete question</button>}
      <Link to="/" style={{float: "right"}}>
        <button className="btn btn-dark">Back To Forum</button>
      </Link>
    </div>
  )
}

export default Question;