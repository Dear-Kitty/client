import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Button from '../../components/Common/Button';
import InputText from '../../components/Common/InputText';
import { showToast } from '../../components/Common/Toast';
import ROUTES from '../../constants/router';
import { useAuth } from '../../hooks/useAuth';
import { firebaseAuth } from '../../service/firebase';
import Logo from '/icons/logo.svg';

export interface LoginProps {
  email: string;
  password: string;
}

const Login = () => {
  const { userLogin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const onSubmit = async (data: LoginProps) => {
    try {
      if (firebaseAuth) {
        try {
          await signInWithEmailAndPassword(firebaseAuth, data.email, data.password);
        } catch (err) {
          console.log(err);
        }

        const sendToken = await firebaseAuth.currentUser?.getIdToken();
        const userId = firebaseAuth.currentUser?.uid;

        if (sendToken) {
          userLogin(sendToken);
          if (userId) {
            localStorage.setItem('userId', userId);
          }
        } else {
          showToast('로그인에 문제가 발생했습니다', 'error');
        }
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            return showToast('비밀번호 또는 아이디가 틀립니다.', 'error');
        }
      } else {
        showToast('알 수 없는 오류가 발생했습니다.', 'error');
      }
    }
  };

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <div className="flex flex-col items-center md:justify-center mx-auto my-0 max-w-screen-md">
        <Link className="w-[120px]" to="/">
          <img src={Logo} alt="디어키티 로고" />
        </Link>

        <form className="flex flex-col items-center p-5 text-center" onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="py-2">
            <InputText
              placeholder="이메일"
              inputType="email"
              inputSize="small"
              scheme={errors.email ? 'danger' : 'primary'}
              {...register('email', {
                required: true,
              })}
            />
            {errors.email && <p className="error-text">이메일을 입력해주세요.</p>}
          </fieldset>
          <fieldset className="py-2">
            <InputText
              placeholder="비밀번호"
              inputType="password"
              inputSize="small"
              scheme={errors.password ? 'danger' : 'primary'}
              {...register('password', {
                required: true,
              })}
            />
            {errors.password && <p className="error-text">비밀번호를 입력해주세요.</p>}
          </fieldset>
          <div className="flex flex-col items-center py-5 text-center">
            <Button size="medium" scheme="primary">
              로그인
            </Button>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex gap-6">
              <Link to={ROUTES.RESET}>비밀번호 찾기 </Link>
              <Link to={ROUTES.JOIN}>회원가입</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
