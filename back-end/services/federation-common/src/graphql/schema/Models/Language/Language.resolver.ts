import { Language } from "@prisma/client";

import {
  getAllLanguages,
  getLanguageById,
} from "@src/services/languageService";

import { ILanguageRef } from "@src/../../utils/types/refs";

const resolver = {
  Query: {
    Language: async (_source, _args, _context, _info): Promise<Language[]> => {
      return await getAllLanguages();
    },
  },
  Language: {
    __resolveReference: async ({
      languageId,
    }: ILanguageRef): Promise<Language | null> =>
      await getLanguageById(parseInt(languageId)),
  },
};

export default resolver;
