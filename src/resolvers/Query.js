const Posts = require("../schemas/Posts");

function prueba(_,args,context,info){
    return "Esto es una prueba en graphql"
}

function posts(_,args,context,info){
    if(!context.user) throw new Error("Authentication is required")
    
    return Posts.find().populate({
        path:'createdBy',
        populate:{
            path:'author',
            model:'users'
        }
    }).populate({
        path:'comments',
        populate:{
            path:'author',
            model:'users'
        }
    }).populate({
        path:'liked_by',
        populate:{
            path:'author',
            model:'users'
        }
    }).then((posts) => {
        return posts;
    }).catch((err) => {
        throw err;
    })
}

module.exports = {
    prueba,
    posts
}