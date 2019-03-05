const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

// dummy data
var books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "A Feast of Crows", genre: "Fantasy", id: "2", authorId: "2" },
  { name: "The Long Earth", genre: "Sci-fi", id: "3", authorId: "3" },
  { name: "A Game of Thrones", genre: "Fantasy", id: "4", authorId: "2" },
  {
    name: "A Dance with Dragons Part 1",
    genre: "Fantasy",
    id: "5",
    authorId: "2"
  },
  {
    name: "Harry Potter: The Half-Blood Prince",
    genre: "Fantasy",
    id: "5",
    authorId: "4"
  }
];

// further dummy data
var authors = [
  { name: "Patrick Rothfuss", age: 44, id: "1" },
  { name: "George R.R. Martin", age: 42, id: "2" },
  { name: "Terry Pratchett", age: 66, id: "3" },
  { name: "J K Rowling", age: 53, id: "4" }
];

// wrap in function to prevent undefined error
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id }); // look through the books array, filter those who have same authorID & show them only
      }
    }
  })
});

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from database/other source
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery // how you initially jump into graph
});
