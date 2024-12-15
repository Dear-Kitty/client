import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Button from '../../components/Common/Button';
import InputText from '../../components/Common/InputText.tsx';
import { showToast } from '../../components/Common/Toast';
import { DEFAULT_IMAGE } from '../../constants/image';
import ROUTES from '../../constants/router';
import { useAuth } from '../../hooks/useAuth';
import { firebaseAuth } from '../../service/firebase';
import { LoginProps } from './Login';

export interface User {
  nickname: string;
  profileImageUrl: string;
}

export interface SignupProps extends LoginProps {
  passwordConfirm: string;
  nickname: string;
}

const Signup = () => {
  const { userJoin } = useAuth();
  const [, setIsOpen] = useState(false);
  const isNicknameAvailable = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<SignupProps>();

  const onSubmit = async (data: SignupProps) => {
    if (!isNicknameAvailable) {
      showToast('닉네임 중복을 확인해주세요.', 'warning');
      return;
    }
    try {
      await createUserWithEmailAndPassword(firebaseAuth, data.email, data.password);

      if (firebaseAuth.currentUser) {
        const userData: User = {
          nickname: data.nickname,
          profileImageUrl: DEFAULT_IMAGE,
        };

        await userJoin(userData);
      }

      // Firebase 사용자 계정 생성
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            return showToast('이미 사용 중인 이메일입니다.', 'warning');
          case 'auth/weak-password':
            return showToast('비밀번호는 6글자 이상이어야 합니다.', 'warning');
          case 'auth/network-request-failed':
            return showToast('네트워크 연결에 실패 하였습니다.', 'error');
          case 'auth/invalid-email':
            return showToast('잘못된 이메일 형식입니다.', 'warning');
          case 'auth/internal-error':
            return showToast('잘못된 요청입니다.', 'error');
          default:
            return showToast('회원 가입에 실패했습니다.', 'error');
        }
      } else {
        showToast('알 수 없는 오류가 발생했습니다.', 'error');
      }
    }
  };

  const handleValidate = async () => {
    const isValid = await trigger(['email', 'password', 'passwordConfirm']);
    if (isValid) {
      setIsOpen(true);
    } else {
      showToast('정보를 입력하세요', 'warning');
    }
  };

  return (
    <div className="m-5 flex flex-col overflow-hidden bg-white">
      <div className="mx-auto my-0 max-w-screen-md">
        <div className="m:text-center font-title text-3xl font-bold md:block">회원가입</div>
        <div className="flex flex-col"></div>
        <form className="border-t-4 pt-5 text-center" onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="flex flex-col items-center p-3">
            <p className="w-80 text-left">
              이메일<span className="text-blue-600">*</span>
            </p>
            <InputText
              placeholder="이메일"
              inputType="email"
              inputSize="medium"
              scheme={errors.email ? 'danger' : 'primary'}
              {...register('email', {
                required: true,
              })}
            />
            {errors.email && <p className="error-text">이메일을 입력해주세요.</p>}
          </fieldset>
          <fieldset className="flex flex-col items-center p-3">
            <p className="w-80 text-left">
              비밀번호<span className="text-blue-600">*</span>
            </p>
            <InputText
              placeholder="비밀번호"
              inputType="password"
              inputSize="medium"
              scheme={errors.password ? 'danger' : 'primary'}
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
              })}
            />
            {errors.password && <p className="error-text">비밀번호을 입력해주세요.</p>}
          </fieldset>
          <fieldset className="flex flex-col items-center p-3">
            <p className="w-80 text-left">
              비밀번호 확인<span className="text-blue-600">*</span>
            </p>
            <InputText
              placeholder="비밀번호 확인"
              inputType="password"
              inputSize="medium"
              scheme={errors.password ? 'danger' : 'primary'}
              {...register('passwordConfirm', {
                required: '비밀번호 확인을 입력해주세요.',
                validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
              })}
            />
            {errors.passwordConfirm && <p className="error-text">비밀번호 확인을 입력해주세요.</p>}
          </fieldset>
          <fieldset className="flex flex-col items-center p-3">
            <p className="w-80 text-left">
              닉네임<span className="text-blue-600">*</span>
            </p>
            <InputText
              placeholder="닉네임"
              inputType="nickname"
              inputSize="medium"
              scheme={!isNicknameAvailable ? 'danger' : 'primary'}
              {...register('nickname')}
            />
          </fieldset>

          <fieldset className="flex flex-col items-center">
            <div className="flex flex-col items-center py-5 text-center">
              <Button size="medium" scheme="primary" onClick={handleValidate}>
                회원가입
              </Button>
            </div>
            <span className="flex place-content-center">
              <p className="px-2 font-medium font-normal">이미 아이디가 있으신가요?</p>
              <Link className="text-red-800 font-bold" to={ROUTES.LOGIN}>
                로그인
              </Link>
            </span>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Signup;
