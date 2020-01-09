import React, { Component, useContext, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import SubmitAnswer from './SubmitAnswer';
import auth0Client from '../../Auth';
import Answer from './Answer'
import { UserContext } from '../../context/CurrentUser';
import Modal from 'react-responsive-modal';

class Question extends Component {
  static contextType = UserContext;
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
    const question = (await axios.get(`${process.env.REACT_APP_BACKEND_URL}/${params.questionId}`)).data;
    this.setState({
      question,
    });
  }

  async submitAnswer(answer) {
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/answer/${this.state.question._id}`, {
      answer,
      userId: this.context.sub,
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
  const history = useHistory();
  const currentUser = useContext(UserContext);
  const [showConfirmModal, toggleShowConfirmModal] = useState(false)
  const deleteQuestion = async () => {
    // eslint-disable-next-line
    const deletedAnswer = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/question/${question._id}`, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    });
    history.push('/')
  }

  const wasCreatedByCurrentUser = currentUser && currentUser.sub === question.userId

  return (
    <div style={{ display: "flex", justifyContent: "flex-end"}}>
      { wasCreatedByCurrentUser && <button className="btn btn-danger" style={{ marginRight: 20 }} onClick={() => toggleShowConfirmModal(true)}>Delete Question</button> }
      <Link to="/">
        <button className="btn btn-dark">Back To Forum</button>
      </Link>
      <ConfirmDeleteModal deleteQuestion={deleteQuestion} isOpen={showConfirmModal} closeModal={() => toggleShowConfirmModal(false)} />
    </div>
  )
}

const ConfirmDeleteModal = ({ deleteQuestion, isOpen, closeModal }) => {
  console.log('delete modal')
  return (
    <Modal open={isOpen} onClose={closeModal} center>
      <div style={{ margin: 25 }}>
        <h4>Deleting answer</h4>
        <p>Are you sure?</p>
        <button className="btn btn-danger" onClick={deleteQuestion}>Yes</button>
        <button className="btn" onClick={closeModal}>Cancel</button>
      </div>
    </Modal>
  )
}

export default Question;