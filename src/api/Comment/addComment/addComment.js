import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    //deleteComment 만들기
    addComment: async (_, args, { request }) => {
      isAuthenticated(request);
      const { text, postId } = args;
      const { user } = request;
      const comment = await prisma.createComment({
        user: {
          connect: {
            id: user.id,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
        text,
      });
      return comment;
    },
  },
};
