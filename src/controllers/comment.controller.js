import { CommentModel } from '../models/comments.model';

class CommentController {
  /**
   * create comment for a post
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {NextFunction} next - next function
   */
  static async createComment(req, res, next) {
    try {
      const comment = req.body;

      if (req.user) {
        const { _id: userid } = req.user;
        comment.userid = userid;
      }

      const { _id: commentid } = await CommentModel.create(comment);
      res
        .status(201)
        .json({ message: 'comment added successfully', commentid });
    } catch (error) {
      next(error);
    }
  }

  /**
   * get a single comment by id
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {NextFunction} next - next function
   */
  static async getCommentById(req, res, next) {
    try {
      const { commentid } = req.params;

      const comment = await CommentModel.findOne({ _id: commentid });

      if (!comment) {
        res.status(404).json({ error: 'comment not found' });
        return;
      }

      res.status(200).json(comment);
    } catch (error) {
      next(error);
    }
  }

  /**
   * get all the comment for a post
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {NextFunction} next - next function
   */
  static async getAllCommentForPost(req, res, next) {
    try {
      const { postid } = req.params;

      const comment = await CommentModel.find({postid});

      if (!comment || comment.length === 0) {
        res.status(404).json({ error: 'comments not found' });

        return;
      }

      res.status(200).json(comment);
    } catch (error) {
      next(error);
    }
  }

  /**
   * deletes comment from a post
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {NextFunction} next - next function
   */
  static async deleteComment(req, res, next) {
    try {
      const { commentid } = req.params;
      const { _id: userid } = req.user;

      await CommentModel.deleteOne({ commentid, userid });

      res.status(200).json({ error: 'comment deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

export { CommentController };
