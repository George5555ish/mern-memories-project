import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";
export const getPosts = async (req, res) => {
  try {
    const postMessage = await PostMessage.find();

    // console.log(postMessage);
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const userPost = req.body;

  if (!mongoose.Types.ObjectId.isValid(postId))
    return res.status(404).send("No post with that id");

  const updatedPost = await PostMessage.findByIdAndUpdate(postId, userPost, {
    new: true,
  });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(postId))
    return res.status(404).send("No post with that id");

  await PostMessage.findByIdAndRemove(postId);

  res.json({ message: "Post Deleted" });
};

export const likePost = async (req, res) => {
  const postId = req.params.id;

  if (!req.userId) return res.json({message: 'Unauthenticated'})

  if (!mongoose.Types.ObjectId.isValid(postId))
    return res.status(404).send("No post with that id");

  const post = await PostMessage.findById(postId);
  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    /// like the post
    post.likes.push(req.userId)
  } else {
    //dislike the post
    post.likes = post.likes.filter((id) => id !== String(req.userId))
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(postId, post, {new: true});

  res.json(updatedPost);
};
