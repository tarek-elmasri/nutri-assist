import { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import './navbar.css';
import logo from '../../assets/logo.png';
import MainNavbarMenu from '../../baseUI/MainNavbarMenu';

const Navbar: React.FC<{ menu?: JSX.Element }> = ({ menu }) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="main__navbar">
      <div className="main__navbar-links">
        <div className="main__navbar-links_logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="main__navbar-links_container">
          {menu || <MainNavbarMenu />}
        </div>
      </div>

      <div className="main__navbar-sign">
        <p>
          <a href="#signin">Sign In</a>
        </p>
        <button className="hover-shadow" type="button">
          Sign Up
        </button>
      </div>

      <div className="main__navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="main__navbar-menu_container scale-up-center">
            <div className="main__navbar-menu_container-links">
              {menu || <MainNavbarMenu />}
            </div>

            <div className="main__navbar-menu_container-sign">
              <p>
                <a href="#signin">Sign In</a>
              </p>
              <button className="hover-shadow" type="button">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
