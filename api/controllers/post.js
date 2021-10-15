const Post= require('../models/Post');
const User= require('../models/User');

module.exports.addpost= (req,res) => {
    const{userId, imageurl,desc }= req.body;
    let newPost = new Post({userId, imageurl,desc});
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