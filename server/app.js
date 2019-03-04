const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema.js");

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true // access graphiql tool in browser
  })
);

app.listen(4000, () => {
  console.log("now listening for requests on Port 4000");
  console.log(schema);
});
