import Logo from '/icons/logo.svg';
const Loading = () => {
  return (
    <div className="flex min-h-[50vh] flex-row items-center justify-center text-xl font-bold gap-2">
      <img className="w-[50px]" src={Logo} alt="디어키티 아이콘" />
      로딩 중 ...
    </div>
  );
};

export default Loading;
