import React, { useContext, useState } from 'react'
import auth0Client from '../../Auth';
import { UserContext } from '../../context/CurrentUser';
import Modal from 'react-responsive-modal';
import axios from 'axios'

const Answer = ({ answer, refreshQuestion }) => {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div>
      { isEditing 
        ? <EditAnswer answer={answer} endEdit={() => setIsEditing(false) } refreshQuestion={refreshQuestion} />
        : <PresentAnswer answer={answer} beginEdit={() => setIsEditing(true) } refreshQuestion={refreshQuestion} /> }
    </div>
  )
}

const PresentAnswer = ({ answer, beginEdit, refreshQuestion }) => {
  const currentUser = useContext(UserContext);
  const [showConfirmModal, toggleShowConfirmModal] = useState(false)
  const wasCreatedByCurrentUser = currentUser && currentUser.sub === answer.userId

  const deleteAnswer = async () => {
    const deletedAnswer = await axios.delete(`http://localhost:5000/answer/${answer._id}`, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    });
    await refreshQuestion();
  }

  return (
    <>
      <p className="lead">{answer.content}</p>
      { wasCreatedByCurrentUser && (
        <div style={{ display: "flex", justifyContent: "flex-end"}}>
          <button className="btn btn-link" onClick={() => toggleShowConfirmModal(true)}>Delete</button>
          <button className="btn btn-link" onClick={beginEdit}>Edit</button>
        </div>
      )}
      <ConfirmDeleteModal deleteAnswer={deleteAnswer} isOpen={showConfirmModal} closeModal={() => toggleShowConfirmModal(false)} />
    </>
  )
}

const EditAnswer = ({ answer, endEdit, refreshQuestion }) => {
  const [newAnswer, setAnswer] = useState(answer.content)

  const editAnswer = (event) => setAnswer(event.target.value)

  const updateAnswer = async () => {
    const updatedAnswer = await axios.put(`http://localhost:5000/answer/${answer._id}`, {
      content: newAnswer
    }, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    });
    await refreshQuestion();
    endEdit()
  }

  return (
    <>
      <textarea className="form-control" rows="5" value={newAnswer} onChange={editAnswer} />
      <div style={{ display: "flex", justifyContent: "flex-end"}}>
        <button className="btn btn-link" onClick={updateAnswer}>Save</button>
        <button className="btn btn-link" onClick={endEdit}>Cancel</button>
      </div>
    </>
  )
}

const ConfirmDeleteModal = ({ deleteAnswer, isOpen, closeModal }) => {
  console.log('delete modal')
  return (
    <Modal open={isOpen} onClose={closeModal} center>
      <div style={{ margin: 25 }}>
        <h4>Deleting answer</h4>
        <p>Are you sure?</p>
        <button className="btn btn-danger" onClick={deleteAnswer}>Yes</button>
        <button className="btn" onClick={closeModal}>Cancel</button>
      </div>
    </Modal>
  )
}

export default Answer