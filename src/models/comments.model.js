import { Schema, model } from 'mongoose';

const { ObjectId } = Schema;

const CommentSchema = new Schema({
  id: ObjectId,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  postid: { type: String, required: true },
  userid: { type: String, required: true, default: 'Anonymous' },
  comment: { type: String, required: true },
});

const CommentModel = model('CommentModel', CommentSchema);
export { CommentModel };
