import fruitsLine from '../../assets/fruits-line.png';
import { Fruits } from '../../baseUI';

import {
  Features,
  Footer,
  Header,
  Navbar,
  Testemonials,
  Values
} from '../../components';

const Main = () => {
  return (
    <div className="main">
      <div className="bg__gradient">
        <Navbar />
        <Header />
      </div>
      <Features />
      <Fruits />
      <Values />
      <Testemonials />
      <Footer />
    </div>
  );
};

export default Main;
