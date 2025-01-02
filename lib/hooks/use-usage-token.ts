import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsageTokens, insertUsageTokens } from "../db";

interface InsertUsageToken {
  userId: string;
  userEmail: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  llm: string;
  model: string;
  type: string;
}

export const useUsageToken = ({ userId }: { userId: string }) => {
  const queryClient = useQueryClient();
  const {
    data: usageTokens,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["usageTokens"],
    queryFn: async () => await getUsageTokens({ userId }),
  });

  const insertUsageTokensMutation = useMutation({
    mutationFn: async ({
      userId,
      userEmail,
      promptTokens,
      completionTokens,
      totalTokens,
      llm,
      model,
      type,
    }: InsertUsageToken) =>
      await insertUsageTokens({
        userId,
        userEmail,
        promptTokens,
        completionTokens,
        totalTokens,
        llm,
        model,
        type,
      }),
    onSuccess: async (insertedUsageTokensData) => {
      console.log({ insertedUsageTokensData });
      queryClient.invalidateQueries({ queryKey: ["usageTokens"] });
    },
    onError: (error) => {
      console.error({ error });
    },
  });

  return {
    totalTokens: usageTokens?.totalTokens ?? 0,
    insertUsageTokens: ({
      userId,
      userEmail,
      promptTokens,
      completionTokens,
      totalTokens,
      llm,
      model,
      type,
    }: InsertUsageToken) =>
      insertUsageTokensMutation.mutate({
        userId,
        userEmail,
        promptTokens,
        completionTokens,
        totalTokens,
        llm,
        model,
        type,
      }),
  };
};
