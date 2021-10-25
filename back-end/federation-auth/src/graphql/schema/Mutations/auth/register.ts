import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { IApolloServerContext } from '@config/apollo/IApolloServerContext';

import { User } from '@prisma/client';
import UserType from '@schema/Models/User/User';

import { jwtSign } from '@schema/Utils/JWTToken';

import { createUser } from '@services/userService';

/**
 *
 * Mutation register
 *
 */
export const registerResolver: GraphQLFieldResolver<
  unknown,
  IApolloServerContext
> = async (_source, { input }, _context, _info): Promise<RegisterPayload> => {
  const user = await createUser(input);
  const token = jwtSign(user.userId);

  return {
    token,
    user,
  };
};

export const registerInput: GraphQLInputObjectType = new GraphQLInputObjectType(
  {
    name: 'registerInput',
    description: 'Register input',
    fields: {
      email: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The user email.',
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The user password.',
      },
      languageId: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'The language id.',
      },
      firstname: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The user first name.',
      },
      lastname: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The user last name.',
      },
    },
  }
);

export type RegisterPayload = {
  token: string;
  user: User;
};

export const registerPayload: GraphQLObjectType = new GraphQLObjectType({
  name: 'registerPayload',
  description: 'Register payload',
  fields: {
    token: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The user token.',
    },
    user: {
      type: new GraphQLNonNull(UserType),
      description: 'The user.',
    },
  },
});

const registerMutation: GraphQLFieldConfig<unknown, IApolloServerContext> = {
  description: 'register',
  type: registerPayload,
  args: {
    input: {
      type: registerInput,
    },
  },
  resolve: registerResolver,
};

export default registerMutation;
