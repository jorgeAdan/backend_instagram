const {GraphQLServer}  = require('graphql-yoga')
const Query  = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const mongoose =  require('mongoose');
const verifyToken =  require('./utils/verifyToken');

const typeDefs = './src/schema.graphql'


//Connect to MongoDB
mongoose.connect('mongodb://prueba:prueba123@cluster0-shard-00-00-yvw7z.mongodb.net:27017,cluster0-shard-00-01-yvw7z.mongodb.net:27017,cluster0-shard-00-02-yvw7z.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',{ useNewUrlParser: true } )

const db = mongoose.connection

db.on('error',
    (error) =>  console.log("Failed to connect to mongo",error))
    .once('open', () => console.log("Connected to database"))
//End

const resolvers = {
    Query,
    Mutation
}

const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: async context => ({
        ...context,
        user:await verifyToken(context)
    })
})

const options = {
    port:4000,
    endpoint:'/graphql',
    playground:'/playground'
}

server.start(options,
    ({port}) => console.log(`Magic start in port ${port}`))