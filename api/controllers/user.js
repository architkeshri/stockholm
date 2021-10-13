const User= require('../models/User');

module.exports.updateprofile= (req,res)=>{
    const{_id, dob, about,emergency_contact,gender,sexual_preference,location,education,occupation,interests, fb_link,ig_link,imagesurl} = req.body;
    User.updateOne({_id: _id},
        {$set:{dob: dob, 
            about:about,
            emergency_contact: emergency_contact,
            gender: gender,
            sexual_preference: sexual_preference,
            location: location,
            education: education,
            occupation: occupation,
            activated: true,
            interests: interests,
            fb_link: fb_link,
            ig_link: ig_link,
            imagesurl: imagesurl
             }}, (err, result) => {
            if(err) {
                console.log(err);
            }
            else {
                res.status(201).json({_id,result});
            }
        })
}