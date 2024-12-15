import { Link } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/20/solid';
import Logo from '/icons/logo.svg';
import ROUTES from '../../constants/router';

const Header = () => {
  return (
    <header className="fixed left-0 top-0 z-10 w-full md:hidden">
      <div className="flex items-end justify-between border bg-white px-3 pb-2 pt-6"></div>
    </header>
  );
};
export default Header;
