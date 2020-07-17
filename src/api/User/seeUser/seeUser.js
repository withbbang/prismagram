import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUser: async (_, args) => {
      const { name } = args;
      console.log("name : ", name);
      return prisma.user({ name });
    },
  },
};
