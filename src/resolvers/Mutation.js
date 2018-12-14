const Users =  require('../schemas/Users')
const Posts =  require('../schemas/Posts')
const Comments =  require('../schemas/Comments')
const Likes =  require('../schemas/Likes')
const createToken  = require('../utils/createToken')
const comparePasswords = require('../utils/comparePasswords')

function signup(_,args,context,info){
    return Users.create(args.data).then((user) => {
        let token = createToken(user)
        return {token}
     }).catch((err) => {
         throw  new Error(err)
     })
 }

 function login(_,args,context,info){
    return comparePasswords(args.email,args.password)
        .then((token) => {return {token}})
        .catch((err) => { throw err })
}

function addPost(_,args,context,info){
    if(!context.user) throw new Error("Authentication is required")
    args.data.createdBy = context.user; 
    return Posts.create(args.data).then((post) => {
        return post.toObject()
    }).catch((err) => {throw err;})
}

async function addComment(_,args,context,info){
    if(!context.user) throw new Error("Authentication is required")
    args.data.author = context.user;
    
    const comment = await Comments.create(args.data)
        return Posts.findByIdAndUpdate(args.id, { $push: { comments: comment }}, { new: true }).populate({
            path:'comments',
            populate:{
                path:'author',
                model:'users'
            }
        }).then((post) => {
            return post.toObject()
        });
}

async function addLike(_,args,context,info){
    
    if(!context.user) throw new Error("Authentication is required")
    
    const comment = await Likes.create(args.data)
        return Posts.findByIdAndUpdate(args.id, { $push: { liked_by: context.user }}, { new: true }).populate({
            path:'liked_by',
            populate:{
                path:'author',
                model:'users'
            }
        }).then((post) => {
            return post.toObject()
        });
}

 module.exports = {
    signup,
    login,
    addPost,
    addComment,
    addLike
 }