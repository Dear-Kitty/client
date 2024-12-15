import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '../apis/auth';

const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: {
      nickname?: string;
      myTeam?: number;
      picURL?: string;
    }) => {
      const result = await updateUser(data);
      return result.message;
    },
    onSuccess: (message) => {
      window.alert(message);
      queryClient.invalidateQueries({ queryKey: ['userData'] });
    },
    onError: (error) => {
      console.error(error);
      window.alert('사용자 정보 업데이트에 실패했습니다.');
    },
  });

  return mutation;
};

export default useUpdateUser;
