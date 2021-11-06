import prismaContext from '@config/prisma/prismaContext';

import { Post } from '@prisma/client';

import { PaginationAndSearchArgs } from 'federation-utils';

/**
 * Function that returns all of the Posts present in the database.
 *
 * @async
 * @function getAllPosts.
 * @returns {Promise<Post[]>} The Post List.
 */
export const getAllPosts = async ({
  take,
  skip,
}: PaginationAndSearchArgs): Promise<Post[]> => {
  return await prismaContext.prisma.post.findMany({ take, skip });
};

/**
 * Function that returns a Post by its ID.
 *
 * @param {number} postId The post ID.
 *
 * @async
 * @function getPostById.
 * @returns {Promise<Post | null>} The found Post.
 */
export const getPostById = async (postId: number): Promise<Post | null> => {
  return await prismaContext.prisma.post.findUnique({ where: { postId } });
};

/**
 * Function that returns a list of Posts by their profile ID.
 *
 * @param {number} profileId The profile ID.
 *
 * @async
 * @function getPostsByProfileId.
 * @returns {Promise<Post[]>} The found Posts.
 */
export const getPostsByProfileId = async (
  profileId: number,
  { take, skip }: PaginationAndSearchArgs
): Promise<Post[]> => {
  return await prismaContext.prisma.post.findMany({
    where: { profileId },
    take,
    skip,
  });
};

/**
 * Function that returns a list of Posts by their group ID.
 *
 * @param {number} groupId The group ID.
 *
 * @async
 * @function getPostsByGroupId.
 * @returns {Promise<Post[]>} The found Posts.
 */
export const getPostsByGroupId = async (
  groupId: number,
  { take, skip }: PaginationAndSearchArgs
): Promise<Post[]> => {
  return await prismaContext.prisma.post.findMany({
    where: { groupId },
    take,
    skip,
  });
};

/**
 * Function that created a Post with some input data and returns it.
 *
 * @param input The Post input data.
 *
 * @async
 * @function createPost.
 * @returns {Promise<Post>} The Post.
 */
export const createPost = async (input): Promise<Post> => {
  return prismaContext.prisma.post.create({
    data: input,
  });
};