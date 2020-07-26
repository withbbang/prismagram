import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editPhoto: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { file, key } = args;
      const { user } = request;

      try {
        if (file !== undefined && file !== "" && key !== undefined) {
          await prisma.updateUser({
            where: { id: user.id },
            data: { avatar: file, avatarKey: key },
          });
          return true;
        }
        return false;
      } catch (e) {
        console.log("Error : ", e);
        return false;
      }
    },
  },
};
