exports.typeDefs = `
  type Query {
    user(id: String!): User
    company(id: String!): Company
  }

  type Mutation {
    addUser(firstName: String!, age:Int, companyId:String): User!
    updateUser(id: String!, firstName: String, age:Int, companyId:String): User!
    deleteUser(id: String!): Boolean!
  }

  type User {
    id: String!
    firstName: String
    age: Int
    company: Company
  }
  
  type Company {
    id: String!
    name: String
    description: String
    user:[User]
  }
`;
