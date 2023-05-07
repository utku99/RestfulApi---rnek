const express = require("express")
const { getPost, getDetail, getUpdate, deletePost, createPost, searchPost } = require("../controller/post")
const auth = require("../middleware/auth")

const router = express.Router()


router.get("/getPost", getPost)
router.post("/createPost", auth, createPost)
router.get("/getDetail/:id", getDetail)
router.patch("/getUpdate/:id", auth, getUpdate)
router.delete("/deletePost/:id", auth, deletePost)
router.get("/searchPost", searchPost)



module.exports = router