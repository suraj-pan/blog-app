const Comment = require("../modals/commentModal");
const Post = require("../modals/postModal");

// buyiness logic

exports.createComment = async (req, res) => {
  try {
    const { post, user, body } = req.body;
    /// create a comment
    const comment = new Comment({
      post,
      user,
      body,
    });
    const savedComment = await comment.save();
    //find the post by id and update the comment
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: savedComment._id } },
      { new: true }
    )
      .populate("comments")
      .exec();

    res.json({
      post: updatedPost,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};
