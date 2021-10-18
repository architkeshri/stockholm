const User= require('../models/User');

module.exports.updateprofile= (req,res)=>{
    const{_id, dob, about,emergency_contact,gender,sexual_preference,location,education,occupation,interests, fb_link,ig_link,imagesurl, latitude, longitude} = req.body;
    User.updateOne( {_id: _id},
        { $set:{dob: dob, 
            about:about,
            emergency_contact: emergency_contact,
            gender: gender,
            sexual_preference: sexual_preference,
            location: {
                type: "Point",
                coordinates: [
                    longitude,
                    latitude
                ],
                address: location
            },
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
                User.findOne({ _id }).exec((err, user) => {
                    if (err) {
                      return res.status(400).json({
                        error: "1. something went wrong!",
                      });
                    } else {
                        res.status(201).json({ user: user });
                    }
                }
                )
            }
        }
    )
}

module.exports.recommendations = (req,res) => {
    const pref = req.body.sexual_preference;
    if(pref==='Male' || pref==='Female' || pref==='Other') {
        User.find({gender: pref}).exec((err, users)=>{
            if(err) {
                return res.status(400).json(err);
            }
            return res.status(201).json(users);
        }
        );
    } else if(pref==='Both') {
        User.find({gender : { $in : ['Male', 'Female']}}).exec((err, users)=>{
            if(err) {
                return res.status(400).json(err);
            }
            return res.status(201).json(users);
        }
        );
    }
}

module.exports.filtersearch = (req,res) => {
    const lat=req.body.latitude;
    const lng=req.body.longitude;
    const maxDistance=req.body.distance;
    //User.createIndex({location:"2dsphere"});
    /*const pref=req.body.sexual_preference;
    const age= req.body.age;
    const interests=req.body.interests;
    var arr;
    if(pref==='Male') arr=['Male']
    else if(pref==='Female') arr=['Female']
    else if(pref==='Other') arr=['Other']
    else if(pref==='Both') arr=['Male', 'Female']*/

    //const results = 
    User.find(
        {
          location:
            {
              $near:
                {
                  $geometry: { type: "Point", coordinates: [lng, lat] },
                  $maxDistance: maxDistance
                }
            }
        }).exec((err, results)=>{
            if(err) {
                console.log(err);
                return res.status(400).json(err);
            }
            return res.status(201).json(results);
        }
        );
}