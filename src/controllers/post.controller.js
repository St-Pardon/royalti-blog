import { PostModel } from '../models/posts.models.js';
import { readTime } from '../utils/readtime.utils.js';

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

      post.readingTime = readTime(req.body.body) + ' min'; // set reading time
      post.userid = userid; // add userid

      const { _id } = await PostModel.create(post);

      res
        .status(201)
        .json({ message: 'Post created successfully', postid: _id });
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
    try {
      const {
        author = /[a-z]+/gi,
        search = '',
        count = 20,
        page_no = 0,
        filter_by = 'published',
        order_by = 'updatedAt',
        sort_by = 'ASC',
        tags = '',
      } = req.query;

      const tagArray = tags ? tags.split(' ') : [];

      // Construct the query object based on the provided query parameters
      const query = {
        author,
        state: filter_by,
      };

      // check if tags are provided
      if (tags) {
        query.tags = { $in: tagArray };
      }

      // check is search param are provided
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { tags: { $in: [search] } },
          { author: { $regex: search, $options: 'i' } },
        ];
      }

      // project data that will be returned and remove uncesssary info
      const project = {
        body: 0,
        createdAt: 0,
        userid: 0,
        state: 0,
        __v: 0,
      };

      // options for sorting and limiting
      const options = {
        limit: parseInt(count),
        skip: page_no * count,
        sort: { [order_by]: sort_by.toLowerCase() },
      };

      const posts = await PostModel.find(query, project, options); // search database with provided infomations

      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ msg: 'An error occurred', err });
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

      // Retrieves data and update read count by 1
      const post = await PostModel.findOneAndUpdate(
        { _id: postid },
        { $inc: { readCount: 1 } },
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
