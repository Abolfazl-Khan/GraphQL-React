const { GraphQLError } = require('graphql');
const axios = require('axios');

exports.resolvers = {
  Query: {
    async user(_, args) {
      try {
        const userData = await axios.get(
          `http://localhost:3000/users/${args.id}`
        );
        return userData.data || new GraphQLError('User ID not found');
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
    async company(_, args) {
      try {
        const company = await axios.get(
          `http://localhost:3000/companies/${args.id}`
        );
        return company.data || new GraphQLError('Company ID not found');
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
  },

  Mutation: {
    addUser: (parent, { firstName, age, companyId }) => {
      return axios
        .post('http://localhost:3000/users', {
          firstName,
          age,
          companyId,
        })
        .then((res) => res.data);
    },

    updateUser: (parent, args) => {
      return axios
        .patch(`http://localhost:3000/users/${args.id}`, args)
        .then((res) => res.data);
    },
    deleteUser: (parent, { id }) => {
      return axios
        .delete(`http://localhost:3000/users/${id}`)
        .then((res) => res.status == 200)
        .catch(() => false);
    },
  },

  User: {
    async company(user) {
      try {
        const userCompany = await axios.get(
          `http://localhost:3000/companies/${user.companyId}`
        );
        return userCompany.data;
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
  },

  Company: {
    async user(company) {
      try {
        const companyUsers = await axios.get(
          `http://localhost:3000/companies/${company.id}/users`
        );
        return companyUsers.data;
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
  },
};
