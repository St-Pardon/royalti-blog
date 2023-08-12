import { PostModel } from '../models/posts.models.js';

class PostController {
  /**
   * createPost controller for post creation
   * @param {Request} req - the request object
   * @param {Response} res - the response object
   * @author Onyedikachi Onu
   */
  static async createPost(req, res) {
    try {
      const post = req.body;
      const { _id: userid } = req.user;

      if (!post) {
        res.status(406).json({ error: 'Post body missing' });
        return;
      }

      post.userid = userid;

      await PostModel.create(post);

      res.status(200).json({ message: 'Post created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occured' });
    }
  }

  /**
   * getAllPost controller for getting all published posts from all users
   * @param {Request} req - the request object
   * @param {Response} res - the response object
   * @author Onyedikachi Onu
   */
  static async getAllPosts(req, res) {
    // remember to rewrite and add pagination and filters
    try {
      const posts = await PostModel.find({ state: 'published' });

      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: 'An error occured' });
    }
  }

  /**
   * getPostById controller for getting a single post, published or unpublished post
   * @param {Request} req - the request object
   * @param {Response} res - the response object
   * @author Onyedikachi Onu
   */
  static async getPostById(req, res) {
    try {
      const { postid } = req.params;

      const post = await PostModel.findOneAndUpdate(
        { _id: postid },
        { $inc: { read_count: 1 } },
        { new: true }
      );

      if (!post) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }

      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: 'An error occured' });
    }
  }

  /**
   * getPostByUser controller for getting all post from a single authenticated user
   * @param {Request} req - the request object
   * @param {Response} res - the response object
   * @author Onyedikachi Onu
   */
  static async getPostByUser(req, res) {
    try {
      const { _id: userid } = req.user;

      const posts = await PostModel.find({ userid });

      if (!posts || posts.length === 0) {
        res.status(404).json({ error: 'User have not created any post' });
        return;
      }

      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: 'An error occured' });
    }
  }

  /**
   * publishPost controller for publishing a post for all users
   * @param {Request} req - the request object
   * @param {Response} res - the response object
   * @author Onyedikachi Onu
   */
  static async publishPost(req, res) {
    try {
      const { postid } = req.params;
      const { _id: userid } = req.user;

      if (!postid) {
        res.status(404).json({ error: 'Not Found' });
        return;
      }
      const update = {
        updateAt: new Date(),
        state: 'published',
      };
      const post = await PostModel.findOneAndUpdate(
        { _id: postid, userid },
        update,
        {
          new: true,
        }
      );

      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: 'An error occured' });
    }
  }

  /**
   * unpublishPost controller for unpublishing a post for all users
   * @param {Request} req - the request object
   * @param {Response} res - the response object
   * @author Onyedikachi Onu
   */
  static async unpublishPost(req, res) {
    try {
      const { postid } = req.params;
      const { _id: userid } = req.user;

      if (!postid) {
        res.status(404).json({ error: 'Not Found' });
        return;
      }
      const update = {
        updateAt: new Date(),
        state: 'draft',
      };
      const post = await PostModel.findOneAndUpdate(
        { _id: postid, userid },
        update,
        {
          new: true,
        }
      );

      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: 'An error occured' });
    }
  }

  /**
   * updatedPost controller for editing or updating a post for an authenticated user
   * @param {Request} req - the request object
   * @param {Response} res - the response object
   * @author Onyedikachi Onu
   */
  static async updatePost(req, res) {
    try {
      const update = req.body;
      const { postid } = req.params;
      const { _id: userid } = req.user;

      if (!update) {
        res.status(406).json({ error: 'Update payload missing' });
        return;
      }

      update.updatedAt = new Date();

      await PostModel.findOneAndUpdate({ userid, _id: postid }, update, {
        new: true,
      });

      res.status(200).json({ message: 'Post updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occured' });
    }
  }

  /**
   * deletePost controller for deleting a post for a single user
   * @param {Request} req - the request object
   * @param {Response} res - the response object
   * @author Onyedikachi Onu
   */
  static async deletePost(req, res) {
    try {
      const { postid } = req.params;
      const { _id: userid } = req.user;

      if (!postid) {
        res.status(404).json({ error: 'Not Found' });
        return;
      }

      await PostModel.findOneAndDelete({ _id: postid, userid });
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occured' });
    }
  }
}

export default PostController;
