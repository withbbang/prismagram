import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAvatar: async (_, args) => {
      const { id } = args;

      return prisma.createAvatar({ user: { connect: { id } } });
    },
  },
};
