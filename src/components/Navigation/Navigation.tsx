import { HomeIcon, BookmarkIcon, UserIcon } from '@heroicons/react/20/solid';
import ROUTES from '../../constants/router';
import NavigationItem from './NavigationItem';

const ICON_SIZE = 'size-6';
const LIST_STYLE = 'py-4';

const Navigation = () => {
  return (
    <div className="fixed bottom-0 top-auto z-10 h-[60px] w-full border bg-white md:top-0 md:h-screen md:w-[100px] xl:w-1/6">
      <nav className="px-6 md:py-6">
        <ul className="flex flex-row justify-between md:flex-col">
          <li className={LIST_STYLE}>
            <NavigationItem title="단어장" link={ROUTES.VOCA} icon={<BookmarkIcon className={ICON_SIZE} />} />
          </li>
          <li className={LIST_STYLE}>
            <NavigationItem title="홈" link={ROUTES.HOME} icon={<HomeIcon className={ICON_SIZE} />} />
          </li>
          <li className={LIST_STYLE}>
            <NavigationItem title="마이페이지" link={ROUTES.USER} icon={<UserIcon className={ICON_SIZE} />} />
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Navigation;
