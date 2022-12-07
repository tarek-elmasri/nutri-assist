import { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaDharmachakra, FaUsers, FaFileAlt } from 'react-icons/fa';
import './dashboard.css';
import avatarImg from '../assets/avatar.png';
import logo from '../assets/logo.png';
import { IconType } from 'react-icons';

const NavItem: React.FC<{ text: string; icon: IconType; to: string }> = ({
  text,
  to,
  icon: Icon
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `dashboard-layout__sidebar-content_link ${isActive ? 'active' : ''}`
    }
  >
    <Icon size={15} color="var(--color-orange)" />
    <span>{text}</span>
  </NavLink>
);

const DashboardLayout = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (sidebarRef.current && window.innerWidth > 480) {
      setToggleMenu(true);
    }
  }, [setToggleMenu]);

  useEffect(() => {
    if (sidebarRef.current) {
      if (toggleMenu) {
        sidebarRef.current.classList.remove('closed');
      } else {
        sidebarRef.current.classList.add('closed');
      }
    }
  }, [toggleMenu]);

  return (
    <div className="dashboard-layout">
      <div className="dashboard-layout__sidebar">
        <div
          ref={sidebarRef}
          className="dashboard-layout__sidebar-content closed"
        >
          <img src={avatarImg} alt="avatar" />
          <span>Name</span>

          <div className="dashboard-layout__sidebar-content_divider" />

          <NavItem to={`/dashboard/clients`} icon={FaUsers} text="Clients" />
          <NavItem
            to={'/dashboard/profiles'}
            icon={FaFileAlt}
            text="Profiles"
          />
          <NavItem to={'/'} icon={FaDharmachakra} text="Settings" />
        </div>
        <div
          className="dashboard-layout__sidebar-slider"
          onClick={() => setToggleMenu((prev) => !prev)}
        />
      </div>
      <div className="dashboard-layout__wrapper bg__gradient">
        <div className="dashboard-layout__wrapper-logo">
          <img src={logo} alt="logo" />
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
