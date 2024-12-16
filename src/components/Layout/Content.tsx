import { Outlet } from 'react-router-dom';

const Content = () => {
  return (
    <div className="absolute w-full h-full">
      <div className="w-full h-full max-w-[440px] max-h-[956px] px-[40px] py-[40px] justify-self-center">
        <Outlet />
      </div>
    </div>
  );
};
export default Content;
