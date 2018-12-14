const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

const mongoose =  require('mongoose')

const Schema =  mongoose.Schema

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    user_name:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
       type:String,
       enum:["Male","Female"] 
    },
    image_url:{
        type:String
    },
    bio:{
        type:String
    },
    posts:[
        {
            type: Schema.Types.ObjectId,
            ref:"posts"
        }
    ],
    is_active:{
        type:Boolean,
        default:true
    }

},{'collection':'users','timestamps':true})

UserSchema.pre('save',function(next){
    let user = this
    if(!user.isModified('password')){return next();}
    bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
        if(err) return next(err)
        bcrypt.hash(user.password,salt,async function(err,hash){
                if (err) return next(err);
                    user.password =  hash;
                next();
        })
    })
});

UserSchema.methods.comparePassword = function (candidate,cb) {
    console.log(this.password)
    bcrypt.compare(candidate,this.password,function(err,isMatch){
        cb(err,isMatch)
    })

}

module.exports = mongoose.model('users',UserSchema)