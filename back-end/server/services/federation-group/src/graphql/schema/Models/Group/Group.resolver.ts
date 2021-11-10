import { Group } from '@prisma/client';

import { getAllGroups, getGroupById } from '@src/services/groupService';
import { IGroupRef } from '@fed-schema/Utils/refs';

const resolver = {
  Query: {
    Group: async (_source, args): Promise<Group[]> => {
      return await getAllGroups(args);
    },
  },
  Group: {
    __resolveReference: async ({
      groupId,
    }: IGroupRef): Promise<Group | null> => {
      return await getGroupById(parseInt(groupId));
    },
  },
};

export default resolver;