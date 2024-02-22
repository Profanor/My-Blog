import mongoose, { Schema } from 'mongoose';

const CommentSchema = new Schema(
  {
  name: String,
  email: String,
  comment: String,
  date: {
    type: Date,
    default: Date.now,
  },
},
  {
    timestamps: true,
  }
);

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;