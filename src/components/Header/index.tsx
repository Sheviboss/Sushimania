import Logo from './Logo';
import Menu from './Menu';
import './style.scss';
import Telephones from './Telephones';
import Time from './Time';
const Header: React.FC = () => {
  return (
    <header className="header">
      <Logo />
      <Telephones />
      <Time />
      <Menu />
    </header>
  );
};

export default Header;
