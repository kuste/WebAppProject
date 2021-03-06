const mongoose = require("mongoose")
const Post = require("../models/post")
const User = require("../models/user")

exports.posts_get_all = (req, res, next) => {
  Post.find()
    .populate("user", "_id firstName lastName email ")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        posts: docs.map(doc => {
          return {
            _id: doc._id,
            title: doc.title,
            descr: doc.descr,
            qualifications: doc.qualifications,
            startDate: doc.startDate,
            payment: doc.payment,
            endDate: doc.endDate,
            additionalInfo: doc.additionalInfo,
            whatIsOffered: doc.whatIsOffered,
            contactEmail: doc.contactEmail
          }
        })
      }
      if (docs.length >= 0) {
        res.status(200).json(response)
      } else {
        res.status(404).json({
          message: "No entries found"
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}

exports.posts_create_post = (req, res, next) => {
  User.findById(req.body.user)
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: "User not found"
        })
      }
      console.log(req.body)
      const post = new Post({
        _id: mongoose.Types.ObjectId(),
        user: req.body.user,
        title: req.body.title,
        descr: req.body.descr,
        qualifications: req.body.qualifications,
        payment: req.body.payment,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        additionalInfo: req.body.additionalInfo,
        whatIsOffered: req.body.whatIsOffered,
        contactEmail: req.body.contactEmail
      })
      return post.save()
    })
    .then(result => {
      console.log(result)
      res.status(201).json({
        message: "Post stored",
        createdPost: {
          _id: result._id,
          user: result.user
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}

exports.posts_get_byUserId = (req, res, next) => {
  const userId = req.params.userId
  Post.find({ user: userId })
    .populate("user", "_id firstName lastName email ")
    .exec()
    .then(docs => {
      if (docs.length >= 0) {
        const response = {
          count: docs.length,
          posts: docs.map(doc => {
            return {
              _id: doc._id,
              title: doc.title,
              descr: doc.descr,
              qualifications: doc.qualifications,
              startDate: doc.startDate,
              payment: doc.payment,
              endDate: doc.endDate,
              additionalInfo: doc.additionalInfo,
              whatIsOffered: doc.whatIsOffered,
              contactEmail: doc.contactEmail
            }
          })
        }
        res.status(200).json(response)
      } else {
        res.status(404).json({
          message: "No entries found"
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}
exports.posts_get_One = (req, res, next) => {
  const id = req.params.postId
  Post.findById(id)
    .exec()
    .then(doc => {
      const response = {
        _id: doc._id,
        title: doc.title,
        descr: doc.descr,
        qualifications: doc.qualifications,
        startDate: doc.startDate,
        payment: doc.payment,
        endDate: doc.endDate,
        additionalInfo: doc.additionalInfo,
        whatIsOffered: doc.whatIsOffered,
        contactEmail: doc.contactEmail
      }
      if (doc) {
        res.status(200).json(response)
      } else {
        res.status(404).json({
          message: "No entries found"
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}
exports.posts_update_post = (req, res, next) => {
  const id = req.params.postId
  console.log(req.body)

  const response = {
    user: req.body.user,
    title: req.body.title,
    descr: req.body.descr,
    qualifications: req.body.qualifications,
    startDate: req.body.startDate,
    payment: req.body.payment,
    endDate: req.body.endDate,
    additionalInfo: req.body.additionalInfo,
    whatIsOffered: req.body.whatIsOffered,
    contactEmail: req.body.contactEmail
  }

  Post.updateOne({ _id: id }, { $set: response })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Product updated",
        updatedPost: req.body
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}

exports.posts_delete_post = (req, res, next) => {
  const id = req.params.postId

  Post.findById(id)
    .exec()
    .then(result => {
      if (result) {
        Post.deleteOne({ _id: id })
          .exec()
          .then(post => {
            res.status(200).json({
              message: "Post deleted",
              deletedPost: post
            })
          })
          .catch(err => {
            console.log(err)
            res.status(500).json({
              error: err
            })
          })
      } else {
        res.status(404).json({
          message: "No valid entry found for provided ID"
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}
