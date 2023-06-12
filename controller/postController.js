const Post = require("../modals/postModal");

exports.createPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const post = new Post({
      title,
      body,
    });
    const savedPost = await post.save();

    res.json({
      post: savedPost,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("likes")
      .populate("comments")
      .exec();

    res.json({ posts });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};
