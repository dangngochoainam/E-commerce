const db = require("../models");
const _Comment = db.Comment;
const _SubCommnet = db.SubComment;
const _User = db.User;

module.exports = {
  getCommentByProductId: async (productId) => {
    try {
      const comments = await _Comment.findAll({
        include: {
          model: _User,
          attributes: ["firstname", "lastname", "avatar"],
        },
        where: {
          productId: productId,
        },
        order: [
          ["id", "DESC"],
        ],
      });
      if (comments)
        return {
          code: 200,
          data: {
            status: 200,
            data: comments,
          },
        };
      return {
        code: 404,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },
  getSubCommentByCommentId: async (commentId) => {
    try {
      const subComments = await _SubCommnet.findAll({
        include: {
          model: _User,
          attributes: ["firstname", "lastname", "avatar"],
        },
        where: {
          commentId: commentId,
        },
      });
      if (subComments)
        return {
          code: 200,
          data: {
            status: 200,

            data: subComments,
          },
        };
      return {
        code: 404,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },
  addComment: async ({ comment }) => {
    try {
      const newComment = await _Comment.create({ ...comment });
      if (newComment)
        return {
          code: 201,
          data: {
            status: 201,

            data: newComment,
          },
        };
      return {
        code: 400,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },
  addSubComment: async ({ subComment }) => {
    try {
      const newSubComment = await _SubCommnet.create({ ...subComment });
      if (newSubComment)
        return {
          code: 201,
          data: {
            status: 201,

            data: newSubComment,
          },
        };
      return {
        code: 400,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },
};
