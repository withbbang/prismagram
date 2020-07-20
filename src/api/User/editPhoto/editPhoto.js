import { prisma } from "../../../../generated/prisma-client";
const sizeof = require("object-sizeof");

export default {
  Mutation: {
    editPhoto: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { file } = await args;
      console.log("size : ", sizeof(file));
      const {
        file: { filename, mimetype, encoding },
        id,
      } = args;
      return prisma.updateAvatar({
        where: { id },
        data: { filename, mimetype, encoding },
      });
    },
  },
};
