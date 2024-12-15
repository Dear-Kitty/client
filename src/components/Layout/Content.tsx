import { Outlet } from 'react-router-dom';

const Content = () => {
  return (
    <div className="w-100 absolute left-0 top-0 w-full px-3 pt-[65px] md:left-[100px] md:w-[calc(100%-100px)] xl:left-1/4 xl:w-2/4">
      <div className="mx-auto my-0 max-w-screen-md">
        <Outlet />
      </div>
    </div>
  );
};
export default Content;
