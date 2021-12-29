import { Security, User } from '@prisma/client';

import { getAllUsers, getUserById } from '@src/services/userService';
import { IUserRef } from '../../Utils/refs';

import { PaginationAndSearchArgs } from 'galactagraph-utils';
import { ResolverClass, ModelResolver } from 'galactagraph-utils/lib/classes';
import { getSecurityByUserId } from '@src/services/securityService';

/**
 * `User Resolver`
 *
 * The Class resolver for the `User` model.
 *
 * It uses the @ModelResolver decorator to define the `model` logics for the Class.
 *
 * @interface `ResolverClass<User, IUserRef>`
 * @class `UserResolver`
 *
 * @method `reference` - The method used to resolve the `User` Model reference.
 * @method `get` - The method used to get the list of every `User` Model.
 * @method `password` - The method used to hide the password from every `User` query.
 * @method `security` - The method used to get the list of every `Security` Model connected.
 */
@ModelResolver('User')
class UserResolver implements ResolverClass<User, IUserRef> {
  reference = ({ userId }: IUserRef) => {
    return getUserById(parseInt(userId));
  };

  get = (_source, args: PaginationAndSearchArgs, _context, _info) => {
    return getAllUsers(args);
  };

  password = (): string => '';

  security = ({ userId }: IUserRef): Promise<Security | null> => {
    return getSecurityByUserId(parseInt(userId));
  };
}

export default new UserResolver();
