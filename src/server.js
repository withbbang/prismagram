import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";
import { uploadMiddleware, uploadController, deletePhoto } from "./upload";
import bodyParser from "body-parser";
import cors from "cors";

const PORT = process.env.PORT || 4000;

// const typeDefs = `
//     type Query{
//         hello : String!
//     }
// `;

// const resolvers = {
//   Query: {
//     hello: () => "Hi",
//   },
// };

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated }),
});
server.express.use(cors());
server.express.use(bodyParser.json());
server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.express.post("/api/upload/", uploadMiddleware, uploadController);
server.express.post("/api/delete/", deletePhoto);

server.start({ port: PORT }, () => console.log(`Server running on ${PORT}`));
