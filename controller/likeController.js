const Post = require("../modals/postModal");
const Like = require("../modals/likeModal");

// like a modal
exports.likePost = async (req, res) => {
  try {
    const { post, user } = req.body;
    const like = new Like({ post, user });

    const savedLike = await like.save();

    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { likes: savedLike._id } },
      { new: true }
    )
      .populate("likes")
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

exports.unlikePost = async (req, res) => {
  try {
    const { post, like } = req.body;
    /// find and delete the like collection
    const deleteLike = await Like.findOneAndDelete({ post: post, _id: like });
    // update the post collection
    const updatePost = await Post.findByIdAndUpdate(
      post,
      {
        $pull: { likes: deleteLike._id },
      },
      { new: true }
    );

    res.json({
      post: updatePost,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};
