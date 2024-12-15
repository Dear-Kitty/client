import { Link } from 'react-router-dom';
import Button from '../../components/Common/Button';
import Profile from '../../components/User/Profile';
import UserEditForm from '../../components/User/UserEditForm';
import Loading from '../../components/Common/Loading';
import useUserData from '../../hooks/useUserData';
import useUpdateUser from '../../hooks/useUpdateUser';
import ROUTES from '../../constants/router';
import { useAuthStore } from '../../store/authStore';

const User = () => {
  const { userData, isLoading, error } = useUserData();
  const { isloggedIn } = useAuthStore();

  const { mutate: updateUser } = useUpdateUser();

  const handleUpdateUser = (data: { nickname?: string; picURL?: string }) => {
    updateUser({
      nickname: data.nickname || userData?.nickname,
      picURL: data.picURL || userData?.pic_url,
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error || !isloggedIn) {
    return (
      <div className="mx-auto flex h-[calc(100vh-200px)] max-w-md flex-col items-center justify-center">
        <p className="pb-3">유저 정보가 없습니다.</p>
        <Button scheme="primary" size="medium">
          <Link to={ROUTES.LOGIN}>다시 로그인</Link>
        </Button>
      </div>
    );
  }

  if (isloggedIn && userData) {
    return (
      <div className="mx-auto max-w-md">
        <Profile
          profile={userData.pic_url ? userData.pic_url : ''}
          email={userData.email ? userData.email : ''}
          onUpdateUser={handleUpdateUser}
        />
        <UserEditForm nickname={userData.nickname ? userData.nickname : ''} onUpdateUser={handleUpdateUser} />
      </div>
    );
  }

  return null;
};

export default User;
