const Question = require('../models/Question');

const index = async (req, res) => {
  try {
    const posts = await Post.find().sort({createdAt: -1})
    res.send(posts)
  } catch(err) {
    res.status(404).send(err)
  }
}

const create = async (req, res) => {
  try {
    const { title, content } = req.body
    const newPost = new Post({
      title,
      content
    })
    const savedPost = await newPost.save()
    res.send(savedPost)
  } catch(err) {
    res.status(404).send(err)
  }
}

const update = async (req, res) => {
  try {
    const { id, content } = req.body
    const post = await Post.findOne({_id: id})
    post.content = content
    const updatedPost = await post.save()
    res.send(updatedPost)
  } catch(err) {
    res.status(404).send(err)
  }
}

const destroy = async (req, res) => {
  try {
    const { id } = req.body
    const result = await Post.findByIdAndDelete(id)
    res.send(result)
  } catch(err) {
    res.status(404).send(err)
  }
}

module.exports = {
  index,
  create,
  update,
  destroy
}