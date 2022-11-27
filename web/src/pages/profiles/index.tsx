import { Navbar } from '../../components';
import './profiles.css';
import logo from '../../assets/logo.png';

const Profiles = () => {
  return (
    <div className="profiles">
      <Navbar menu={<></>} />

      <div className="profiles__container">
        <div className="profiles__container_sidebar">
          <div className="profiles__container_sidebar-tab">
            <p>Sun. 25-11-2022</p>
          </div>
          <div className="profiles__container_sidebar-tab">
            <p>Sun. 25-11-2022</p>
          </div>
        </div>
        <div className="profiles__container_tab">tab</div>
      </div>
    </div>
  );
};

export default Profiles;
