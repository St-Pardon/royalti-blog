import { Schema, model } from 'mongoose';

// declear Schema
const { ObjectId } = Schema;

// init schema
const PostSchema = new Schema({
  id: ObjectId,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  state: {
    type: String,
    default: 'draft',
    enum: ['draft', 'published'],
  },
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  userid: { type: String, required: true },
  readCount: { type: Number, default: 0 },
  readingTime: { type: String, default: '1min' },
  body: { type: String },
  tags: Array,
});

const PostModel = model('PostModel', PostSchema);
export { PostModel };
