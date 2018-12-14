const mongoose =  require('mongoose');

const Schema =  mongoose.Schema

const LikeSchema = new Schema({
    author:{
        type:Schema.Types.ObjectId,
        ref:"users",
        required:true
    }
},{'collection':'likes','timestamps':true})

module.exports = mongoose.model('likes',LikeSchema)