const mongoose =  require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Schema =  mongoose.Schema

const PostSchema = new Schema({
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    description:{
        type:String
    },
    image_url:{
        type:String,
        required:true
    },
    liked_by:[
        { 
            type:Schema.Types.ObjectId,
            ref:"users"
        }
    ],
    comments:[
        {
            type:Schema.Types.ObjectId,
            ref:"comments"
        }
    ]

},{'collection':'posts','timestamps':true})

ObjectId.prototype.valueOf = function() {
    return this.toString();
}

module.exports = mongoose.model('posts',PostSchema)