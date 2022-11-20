import React from 'react';
import {
  Features,
  Footer,
  Header,
  Navbar,
  Testemonials
} from '../../components';

const Main = () => {
  return (
    <div className="main">
      <div className="bg__gradient">
        <Navbar />
        <Header />
      </div>
      <Features />
      <Testemonials />
      <Footer />
    </div>
  );
};

export default Main;
