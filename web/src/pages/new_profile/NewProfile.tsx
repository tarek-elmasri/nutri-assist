import { Navbar } from '../../components';
import './new_profile.css';

const NewProfile = () => {
  return (
    <div className="new-profile">
      <Navbar menu={<></>} />
      <div className="new-profile__container"></div>
    </div>
  );
};

export default NewProfile;
