const express = require("express");
const { connectMongoDB } = require("./connection");
const path = require('path');
require('dotenv').config();
const {ApolloServer} = require('@apollo/server');
const {expressMiddleware} = require('@apollo/server/express4')
const bodyParser = require('body-parser');
const cors = require('cors');

// graphQL server
async function startServer()
{
    const app = express();
    const server = new ApolloServer({
        typeDefs:`
        type Posts{
            id: ID!
            title: String

        }
        
        type Query
        {
            getPosts: [Posts]
        }
        `,
        resolvers:{}
    });

    app.use(bodyParser.json());
    app.use(cors());

    await server.start();

    app.use('/graphql', expressMiddleware(server));

    app.listen(8000, ()=> console.log("Server running on port: 8000"));


}

startServer();

// const app = express();
// const PORT = process.env.PORT || 8001;
// const userRouter = require("./routes/blogRoute");
// const authRouter = require("./routes/auth");
// const exp = require("constants");

// // connection
// connectMongoDB(process.env.DATABASE_URL);
// // Apply middleware to parse JSON requests
// app.use(express.json());

// app.use("/auth", authRouter);
// app.use('/api', userRouter);

// // app.use(userRouter);
// // 
// app.listen(PORT, () => {
//     console.log("Server Listening on PORT:", PORT);
// });
