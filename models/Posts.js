import mongoose, { Schema } from "mongoose";

const postsSchema = new Schema(
  { 
  title: String, 
  content: String,
  image: { data: Buffer, contentType: String },
  date: {
    type: Date,
    default: Date.now,
  },
},
  {
  timestamps: true,
  }
);

const Posts = mongoose.models.Posts || mongoose.model('Posts', postsSchema);

export default Posts;