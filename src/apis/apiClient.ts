import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../constants/router';
import { firebaseAuth } from '../service/firebase';
import { setToken } from '../store/authStore';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// 토큰을 가져오는 함수. 회원가입이나 다른 특정 요청에서 필요할 때 사용합니다.
export const getAuthToken = async (): Promise<string | null> => {
  const user = firebaseAuth.currentUser;
  if (user) {
    const token = await user.getIdToken();

    const uid = user.uid;
    setToken(uid); // 토큰을 전역 상태나 스토어에 저장합니다.
    return `Bearer ${token}`;
  }
  return null; // 로그인된 사용자가 없으면 null 반환
};

// Axios 인스턴스를 생성하여 API 호출을 위한 설정을 초기화합니다.
const apiClient = (() => {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // 모든 요청에 인증 토큰을 자동으로 추가하는 인터셉터.
  instance.interceptors.request.use(
    async (config) => {
      const user = firebaseAuth.currentUser;
      const token = await user?.getIdToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // 응답 인터셉터
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        const navigate = useNavigate();
        navigate(ROUTES.LOGIN);
      }
      return Promise.reject(error);
    },
  );

  return instance;
})();

export default apiClient;
