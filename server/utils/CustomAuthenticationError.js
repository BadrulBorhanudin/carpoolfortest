const { GraphQLError } = require('graphql');

class CustomAuthenticationError extends GraphQLError {
  constructor(message) {
    super(message, {
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    });
  }
}

module.exports = CustomAuthenticationError;
