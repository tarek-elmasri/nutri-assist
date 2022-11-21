import React from 'react';
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
      <Values />
      <Testemonials />
      <Footer />
    </div>
  );
};

export default Main;
