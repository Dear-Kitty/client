import { FirebaseError } from 'firebase/app';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../components/Common/Button.tsx';
import InputText from '../../components/Common/InputText.tsx';
import { showToast } from '../../components/Common/Toast.tsx';
import { useAuth } from '../../hooks/useAuth.ts';
import { firebaseAuth } from '../../service/firebase.ts';

export interface UserData {
  nickname: string;
  kittyname: string;
  age: string;
  job: string;
}

const GetInfo = () => {
  const [, setIsOpen] = useState(false);
  const { userJoin } = useAuth();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<UserData>();

  const onSubmit = async (data: UserData) => {
    try {
      if (firebaseAuth.currentUser) {
        await userJoin(data);
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/network-request-failed':
            return showToast('네트워크 연결에 실패하였습니다.', 'error');
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
    const isValid = await trigger(['nickname', 'kittyname', 'age', 'job']);
    if (isValid) {
      setIsOpen(true);
    } else {
      showToast('정보를 입력하세요', 'warning');
    }
  };

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <div className="flex flex-col items-center">
        <div className="w-full ext-left font-bold text-3xl pl-1 pb-2">정보 입력</div>
        <form className="border-t-4 pt-5 w-full" onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="flex flex-col items-center py-3 w-full">
            <p className="w-full font-medium text-left pl-1 pb-1">
              나의 별명<span className="text-blue-600"> *</span>
            </p>
            <InputText
              placeholder="나의 별명"
              inputType="nickname"
              inputSize="medium"
              scheme={errors.nickname ? 'danger' : 'primary'}
              {...register('nickname', {
                required: true,
              })}
            />
            {errors.nickname && (
              <p className="error-text w-full text-left text-sm pt-1 pl-1">나의 별명을 입력해주세요.</p>
            )}
          </fieldset>
          <fieldset className="flex flex-col items-center py-3 w-full">
            <p className="w-full font-medium text-left pl-1 pb-1">
              AI 별명<span className="text-blue-600"> *</span>
            </p>
            <InputText
              placeholder="AI 별명"
              inputType="nickname"
              inputSize="medium"
              scheme={errors.nickname ? 'danger' : 'primary'}
              {...register('nickname', {
                required: 'AI 별명을 입력해주세요.',
              })}
            />
            {errors.nickname && (
              <p className="error-text w-full text-left text-sm pt-1 pl-1">AI의 별명을 입력해주세요.</p>
            )}
          </fieldset>
          <fieldset className="flex flex-col items-center py-3 w-full">
            <p className="w-full font-medium text-left pl-1 pb-1">
              나이<span className="text-blue-600"> *</span>
            </p>
            <InputText
              placeholder="나이"
              inputType="age"
              inputSize="medium"
              scheme={errors.age ? 'danger' : 'primary'}
              {...register('age', {
                required: '나이를 입력해주세요.',
              })}
            />
            {errors.age && <p className="error-text w-full text-left text-sm pt-1 pl-1">나이를 입력해주세요.</p>}
          </fieldset>
          <fieldset className="flex flex-col items-center py-3 w-full">
            <p className="w-full font-medium text-left pl-1 pb-1">
              직업<span className="text-blue-600"> *</span>
            </p>
            <InputText
              placeholder="직업"
              inputType="job"
              inputSize="medium"
              scheme={errors.job ? 'danger' : 'primary'}
              {...register('job', {
                required: '직업을 입력해주세요.',
              })}
            />
            {errors.job && <p className="error-text w-full text-left text-sm pt-1 pl-1">직업을 입력해주세요.</p>}
          </fieldset>
          <fieldset className="flex flex-col items-center w-full">
            <div className="flex flex-col items-center py-5 text-center w-full">
              <Button size="medium" scheme="primary" onClick={handleValidate}>
                계속하기
              </Button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default GetInfo;
