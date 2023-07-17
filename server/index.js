const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const schema = require("./schema");
const users = require('./users-mock.js')

const port = 9000;

const app = express();
app.use(cors());

const createUserHandler = (input) => {
  const id = Date.now()
  return {
    id,
    ...input
  }
}

const rootValue = {
  getAllUsers: () => {
    return users;
  },
  getUser: ({ id }) => {
    return users.find(user => user.id === id);
  },
  createUser: ({ input } ) => {
    const user = createUserHandler(input)
    users.push(user)
    return user
  },
};

app.use("/graphql", graphqlHTTP({
    graphiql: true,
    schema,
    rootValue,
  },
));

app.listen(port, () => console.log("running"));