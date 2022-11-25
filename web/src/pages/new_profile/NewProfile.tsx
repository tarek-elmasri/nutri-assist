import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../../components';
import { StepsBar } from '../../baseUI';
import './new_profile.css';
import { PropsWithChildren } from 'react';
import useNewProfile, { NewProfileForm } from '../../hooks/useNewProfile';

const NewProfile = () => {
  const onSubmit = (form: NewProfileForm) => {
    console.log('should submit');
    console.log(form);
  };

  const { currentStep, frame, frameTiltles } = useNewProfile({
    onSubmit
  });

  const variants = {
    hidden: {
      opacity: 0,
      x: -20
    },
    enter: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.5
      }
    },
    exit: {
      opacity: 0,
      x: 20
    }
  };

  const FrameAnimator: React.FC<PropsWithChildren> = ({ children }) => (
    <motion.div
      key={`frame-${currentStep}`}
      className="new-profile_container_form"
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.div>
  );

  return (
    <div className="new-profile bg__gradient">
      <Navbar menu={<></>} />

      <div className="new-profile_heading">
        <h1>{frameTiltles.title}</h1>
        <p>{frameTiltles.subTitle}</p>
      </div>
      <div className="new-profile_container">
        <StepsBar stepsCount={5} currentStep={currentStep} />

        <AnimatePresence>
          <FrameAnimator>{frame}</FrameAnimator>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NewProfile;
