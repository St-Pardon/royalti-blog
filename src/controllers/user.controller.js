import { PostModel } from '../models/posts.models.js';
import { UserModel } from '../models/users.model.js';

class UserController {
  /**
   * getUserById controller for getting a single user details
   * @param {Request} req - the request object
   * @param {Response} res - the response object
   * @author Onyedikachi Onu
   */
  static async getUserById(req, res) {
    try {
      const { userid: _id } = req.params;
      const user = await UserModel.findById(_id);

      if (!user) {
        res.status(404).send('User not found');
        return;
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(404).send('User not found');
    }
  }

  /**
   * updateUserInfo controller for updating user information
   * @param {Request} req - the request object
   * @param {Response} res - the response object
   * @author Onyedikachi Onu
   */
  static async updateUserInfo(req, res) {
    try {
      const { _id } = req.user;
      const update = req.body;

      update.updatedAt = new Date(); //update time user information was modified

      const data = await UserModel.findByIdAndUpdate(_id, update, {
        new: true,
      });
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * deleteUser controller for deleting user profile
   * @param {Request} req - the request object
   * @param {Response} res - the response object
   * @author Onyedikachi Onu
   */
  static async deleteUser(req, res) {
    try {
      const { _id } = req.user;

      await PostModel.deleteMany({_id}); // deletes all posts associated with this account
      await UserModel.findByIdAndDelete(_id);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  }
}

export default UserController;
