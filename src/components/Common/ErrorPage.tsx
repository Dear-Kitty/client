import { Link } from 'react-router-dom';
import Icon from '/icons/logo.svg';
import ROUTES from '../../constants/router';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

const ErrorPage = () => {
  return (
    <>
      <div className="flex h-[80vh] flex-col items-center justify-center gap-1 font-semibold text-lx">
        <img className="w-[80px]" src={Icon} alt="디어키티 아이콘" />
        <p>문제가 발생했습니다!</p>
        <p>예기치 못한 오류가 발생했습니다.</p>
        <Link to={ROUTES.HOME} className="flex w-full justify-center font-bold text-red-800 py-2">
          홈으로 돌아가기 <ChevronRightIcon className="size-6" />
        </Link>
      </div>
    </>
  );
};
export default ErrorPage;
