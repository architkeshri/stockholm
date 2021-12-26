const Event= require('../models/Event');
const User= require('../models/User');

module.exports.createevent = async(req,res) => {
    const {start, end, title, creator, attendee} = req.body;
    let newEvent = await new Event({start, end, title,creator, attendee});
    newEvent.save((err,success)=> {
            if(err) {
                console.log("Error in creating event: ", err);
                return res.status(400).json({error: err});
            }
            res.status(201).json({newEvent});
        })
}

module.exports.getevents = async(req,res) => {
    try{
        const currentUser = await User.findById(req.params.id);
        const userEvents = await Event.find( {$or: [{creator: currentUser._id}, {attendee: currentUser._id}]});
        res.status(200).json(userEvents);
    }catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}