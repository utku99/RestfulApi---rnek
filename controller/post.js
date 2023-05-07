const postModel = require("../models/post")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// CRUD 

const getPost = async (req, res) => {
    try {
        const getPost = await postModel.find() //tüm postları bulur
        res.status(200).json({ getPost })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}
const createPost = async (req, res) => {
    try {
        const newPost = await postModel.create(req.body) 
        res.status(200).json({ newPost })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}
const getDetail = async (req, res) => {
    try {
        const { id } = req.params 
        const detailPost = await postModel.findById(id)
        res.status(200).json({ detailPost })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}
const getUpdate = async (req, res) => {
    try {
        const { id } = req.params
        const updatePost = await postModel.findByIdAndUpdate(id, req.body, { new: true }) // 2. parametre update edilmek istenen veriler
        res.status(200).json({ updatePost })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}
const deletePost = async (req, res) => {
    try {
        const { id } = req.params
        await postModel.findByIdAndRemove(id)
        res.status(200).json({ msg: "post başariyla silindi" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// FİLTERİNG

const searchPost = async (req, res) => {
    const { search, tag } = req.query
    try {
        const title = new RegExp(search, "i") 

        const posts = await postModel.find({ $or: [{ title }], tag: { $in: tag.split(",") } }) 

        res.status(200).json({ posts })

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


module.exports = { getPost, createPost, getDetail, getUpdate, deletePost, searchPost }