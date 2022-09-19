const commentService = require("../services/comment.service");

module.exports = {
  getCommentByProductId: async (req, res) => {
    try {
      const productId = req.params.id;
      console.log(productId);
      const { code, data } = await commentService.getCommentByProductId(
        productId
      );
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  },
  getSubCommentByCommentId: async (req, res) => {
    const commentId = req.params.commentId;
    try {
      const { code, data } = await commentService.getSubCommentByCommentId(
        commentId
      );
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  },
  addComment: async (req, res) => {
    const comment = req.body;
    comment.createdAt = new Date();
    comment.updatedAt = new Date();
    comment.creatorId = req.user.id;
    try {
      const { code, data } = await commentService.addComment({ comment });
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  },
  addSubComment: async (req, res) => {
    const subComment = req.body;
    subComment.createdAt = new Date();
    subComment.updatedAt = new Date();
    subComment.creatorId = req.user.id;
    try {
      const { code, data } = await commentService.addSubComment({ subComment });
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  },
};
