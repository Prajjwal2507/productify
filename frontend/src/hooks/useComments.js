import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment, deleteComment } from "../lib/api";

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["product", variables.productId] });
    },
  });
};

export const useDeleteComment = (productId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
    },
  });
};