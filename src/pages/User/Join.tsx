import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Button from '../../components/Common/Button';
import InputText from '../../components/Common/InputText.tsx';
import { showToast } from '../../components/Common/Toast';
import ROUTES from '../../constants/router';
import { useAuth } from '../../hooks/useAuth.ts';
import { firebaseAuth } from '../../service/firebase';
import { LoginProps } from './Login';

export interface User {
  nickname: string;
  kittyname: string;
  age: string;
  job: string;
}

export interface SignupProps extends LoginProps {
  passwordConfirm: string;
}

const Signup = () => {
  const [, setIsOpen] = useState(false);
  const { userGetInfo } = useAuth();
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
        await userGetInfo();
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            return showToast('이미 사용 중인 이메일입니다.', 'warning');
          case 'auth/weak-password':
            return showToast('비밀번호는 6글자 이상이어야 합니다.', 'warning');
          case 'auth/network-request-failed':
            return showToast('네트워크 연결에 실패하였습니다.', 'error');
          case 'auth/invalid-email':
            return showToast('잘못된 이메일 형식입니다.', 'warning');
          case 'auth/internal-error':
            return showToast('잘못된 요청입니다.', 'error');
          default:
            return showToast('회원 가입에 실패했습니다.', 'error');
        }
      } else {
        showToast('알 수 없는 오류가 발생했습니다.', 'error');
        console.log(error);
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
    <div className="flex flex-col overflow-hidden bg-white">
      <div className="flex flex-col items-center">
        <div className="w-full ext-left font-bold text-3xl pl-1 pb-2">회원가입</div>
        <form className="border-t-4 pt-5 w-full" onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="flex flex-col items-center py-3 w-full">
            <p className="w-full font-medium text-left pl-1 pb-1">
              이메일<span className="text-blue-600"> *</span>
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
            {errors.email && <p className="error-text w-full text-left text-sm pt-1 pl-1">이메일을 입력해주세요.</p>}
          </fieldset>
          <fieldset className="flex flex-col items-center py-3 w-full">
            <p className="w-full font-medium text-left pl-1 pb-1">
              비밀번호<span className="text-blue-600"> *</span>
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
            {errors.password && (
              <p className="error-text w-full text-left text-sm pt-1 pl-1">비밀번호를 입력해주세요.</p>
            )}
          </fieldset>
          <fieldset className="flex flex-col items-center py-3 w-full">
            <p className="w-full font-medium text-left pl-1 pb-1">
              비밀번호 확인<span className="text-blue-600"> *</span>
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
            {errors.passwordConfirm && (
              <p className="error-text w-full text-left text-sm pt-1 pl-1">비밀번호를 확인해주세요.</p>
            )}
          </fieldset>
          <fieldset className="flex flex-col items-center w-full">
            <div className="flex flex-col items-center py-5 text-center w-full">
              <Button size="medium" scheme="primary" onClick={handleValidate}>
                계속하기
              </Button>
            </div>
            <span className="flex place-content-center">
              <p className="font-medium font-normal pr-1">이미 아이디가 있으신가요?</p>
              <Link className="text-red-800 font-bold pl-1" to={ROUTES.LOGIN}>
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
