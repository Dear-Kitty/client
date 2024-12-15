import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import InputText from '../../components/Common/InputText';
import Button from '../../components/Common/Button';

interface Props {
  nickname: string;
  onUpdateUser: (data: { nickname?: string }) => void;
}

const UserEditForm = ({ nickname, onUpdateUser }: Props) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      nickname,
    },
  });

  const onSubmit: SubmitHandler<Omit<Props, 'onUpdateUser'>> = async (data) => {
    onUpdateUser({
      nickname: data.nickname,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <fieldset className="flex flex-col pb-6">
          <label htmlFor="nickname">닉네임</label>
          <Controller
            name="nickname"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <InputText
                {...field}
                id="nickname"
                inputType="nickname"
                inputSize="large"
                scheme="primary"
                placeholder="닉네임을 입력해주세요."
              />
            )}
          />
        </fieldset>
        <fieldset className="py-10 text-center">
          <Button type="submit" size="medium" scheme="primary">
            정보수정
          </Button>
        </fieldset>
      </form>
    </>
  );
};
export default UserEditForm;
