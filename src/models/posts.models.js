import { Schema, model } from 'mongoose';

// declear Schema
const { ObjectId } = Schema;

// init schema
const PostSchema = new Schema({
  id: ObjectId,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  state: {
    type: String,
    default: 'draft',
    enum: ['draft', 'published'],
  },
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  userid: { type: String, required: true },
  read_count: { type: Number, default: 0 },
  reading_time: { type: String, default: '1min' },
  body: { type: String },
  tags: Array,
});

const PostModel = model('PostModel', PostSchema);
export { PostModel };
