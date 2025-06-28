import Logo from '../../assets/images/logo.svg';
export const Toolbar = () => {
  return (
    <div className="shadow-shadow align sticky top-0 flex h-14 px-8 py-3">
      <img src={Logo} alt="logo" />
    </div>
  );
};
