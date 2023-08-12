import { PostModel } from '../models/posts.models';

class PostController {
  static async createPost(req, res) {}
  static async getAllPosts(req, res) {}
  static async getPostById(req, res) {}
  static async getPostByUser(req, res) {}
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
