import { useNavigate } from 'react-router-dom';
import { join } from '../apis/auth';
import { showToast } from '../components/Common/Toast';
import ROUTES from '../constants/router';
import { User } from '../pages/User/Join';
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const navigate = useNavigate();
  const { storeLogin } = useAuthStore();

  const userLogin = (data: string) => {
    storeLogin(data);
    showToast('로그인이 완료되었습니다.', 'success');
    navigate(ROUTES.HOME);
  };

  const userJoin = async (data: User) => {
    const response = await join(data);
    navigate(ROUTES.LOGIN);
    showToast('회원가입이 완료되었습니다.', 'success');
    return response;
  };

  return {
    userLogin,
    userJoin,
  };
};
