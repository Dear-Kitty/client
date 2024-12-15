import { useQuery } from '@tanstack/react-query';
import { getUser } from '../apis/auth';
import { firebaseAuth } from '../service/firebase';
import { useAuthStore } from '../store/authStore';

interface IUserData {
  pic_url: string;
  email: string;
  nickname: string;
}

const useUserData = () => {
  const { isloggedIn } = useAuthStore();

  const fetchUserData = async () => {
    if (!isloggedIn) {
      throw new Error('로그인 이력이 없습니다.');
    }

    const user = firebaseAuth.currentUser;
    const result = await getUser();
    return { ...user, ...result.data };
  };

  const {
    data: userData,
    isLoading,
    error,
  } = useQuery<IUserData, Error>({
    queryKey: ['userData'],
    queryFn: () => fetchUserData(),
    enabled: isloggedIn,
  });

  return { userData, isLoading, error };
};

export default useUserData;
