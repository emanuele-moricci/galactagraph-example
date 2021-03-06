import bcrypt from 'bcryptjs';

import { prismaContext } from '@config/prismaConfig';
import { User } from '@prisma/client';

import { PaginationAndSearchArgs } from 'galactagraph-utils';

/**
 * Function that returns all of the Users present in the database.
 *
 * @async
 * @function getAllUsers.
 * @returns {Promise<User[]>} The Users List.
 */
export const getAllUsers = async ({
  take,
  skip,
}: PaginationAndSearchArgs): Promise<User[]> => {
  const users = await prismaContext.prisma.user.findMany({ take, skip });
  return users;
};

/**
 * Function that returns a User by its ID.
 *
 * @param {number} userId The user ID.
 *
 * @async
 * @function getUserById.
 * @returns {Promise<User | null>} The found User.
 */
export const getUserById = async (userId: number): Promise<User | null> => {
  const user = await prismaContext.prisma.user.findUnique({
    where: {
      userId,
    },
  });

  return user;
};

/**
 * Function that returns a User by its unique email.
 *
 * @param {string} email The user email.
 *
 * @async
 * @function getUserByEmail.
 * @returns {Promise<User | null>} The found User.
 */
export const getUserByEmailAndPassword = async (
  email: string,
  password: string
): Promise<User> => {
  const user = await prismaContext.prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) throw new Error('[EMAIL] Error');

  if (!(await bcrypt.compare(password, user.password)))
    throw new Error('[PASSWORD] Error');

  return user;
};

/**
 * Function that returns a list of Users with the same language.
 *
 * @param {number} languageId The language ID.
 *
 * @async
 * @function getUsersByLanguageId.
 * @returns {Promise<User[]>} The Users list.
 */
export const getUsersByLanguageId = async (
  languageId: number
): Promise<User[]> => {
  const users = await prismaContext.prisma.user.findMany({
    where: {
      languageId,
    },
  });

  return users;
};

/**
 * Function that returns a list of Users with the same country.
 *
 * @param {number} countryId The country ID.
 *
 * @async
 * @function getUsersByCountryId.
 * @returns {Promise<User[]>} The Users list.
 */
export const getUsersByCountryId = async (
  countryId: number
): Promise<User[]> => {
  const users = await prismaContext.prisma.user.findMany({
    where: {
      countryId,
    },
  });

  return users;
};

/**
 * Function that returns a User with their profile ID.
 *
 * @param {number} profileId The profile ID.
 *
 * @async
 * @function getUserByProfileId.
 * @returns {Promise<User | null>} The Users list.
 */
export const getUserByProfileId = async (
  profileId: number
): Promise<User | null> => {
  const user = await prismaContext.prisma.user.findFirst({
    where: {
      profileId,
    },
  });

  if (!user) throw new Error('[PROFILE] Error');

  return user;
};

/**
 * Function that created a User with some input data and returns it.
 *
 * @param input The User input data.
 *
 * @async
 * @function createUser.
 * @returns {Promise<User>} The User.
 */
export const createUser = async (input): Promise<User> => {
  // Password
  const salt = await bcrypt.genSalt(
    parseInt(process.env.AUTH_CRYPT_SALT ?? '10')
  );
  const hashedPass = await bcrypt.hash(input.password, salt);

  // True User+Security creation
  const user = await prismaContext.prisma.user.create({
    data: { ...input, password: hashedPass },
  });

  await prismaContext.prisma.security.create({
    data: { userId: user.userId },
  });

  return user;
};
