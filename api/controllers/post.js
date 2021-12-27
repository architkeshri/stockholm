const Post= require('../models/Post');
const User= require('../models/User');

module.exports.addpost= async (req,res) => {
    const{userId, name, imageurl,desc }= req.body;
    let newPost = await new Post({userId, name, imageurl,desc});
    newPost.save((err,success)=> {
            if(err) {
                console.log("Error in uploading Post: ", err);
                return res.status(400).json({error: err});
            }
            res.status(201).json({newPost});
        })
}

module.exports.timeline= async (req,res) => {
    try{
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({userId: currentUser._id});
        const matchedPosts = await Promise.all(
            currentUser.matches.map((matchId)=> {
                return Post.find({userId: matchId});
            })
        );
        res.json(userPosts.concat(...matchedPosts))
    }catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports.deletepost = async (req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId) {
            await post.deleteOne();
            console.log("deleted");
            res.status(200).json("Post has been deleted");
        } else {
            console.log("deleted123")
            res.status(403).json("You can only delete your post!");
        }
        
     } catch (err) {
        console.log("deletedcatch")
        res.status(500).json(err);
    }
}