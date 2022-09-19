const router = require("express").Router();
const commentController = require("../controllers/comment.controller");
const middlewareUser = require("../middlewares/middlewareUser");

router.get('/:commentId/subcommnets', commentController.getSubCommentByCommentId)
router.post("/", middlewareUser.verifyToken, commentController.addComment);
router.post("/subComment", middlewareUser.verifyToken, commentController.addSubComment);

module.exports = router;
