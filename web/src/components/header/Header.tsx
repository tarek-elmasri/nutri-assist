import './header.css';
import fruitsImg from '../../assets/fruits.png';

const Header = () => {
  return (
    <div className="main__header section__margin">
      <div className="main__header-text">
        <h4>Are you a Nutristioninst ?</h4>
        <h1>
          Nutriti.Assist Provides You With Nessccery Tools To Connect With Your
          Clients.
        </h1>
        <p>
          Nutri.Assist helps in creating customized dietery with automated
          calculations whithin few moments, saving and organizing your data and
          opens the opportunity for your clients to view and interact with their
          plans.
        </p>

        <button type="button">Start Now</button>
      </div>
      <div className="main__header-img">
        <img src={fruitsImg} alt="fruits" />
      </div>
    </div>
  );
};

export default Header;
