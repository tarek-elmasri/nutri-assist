import { motion, AnimatePresence } from 'framer-motion';
import { Navbar, StepsBar } from '../../components';
import useNewProfile from '../../hooks/useNewProfile';
import './new_profile.css';

const NewProfile = () => {
  // const [currentStep, setCurrentStep] = useState(1);
  // const [form, setForm] = useState({ weight: 78, height: 178 });
  const { currentStep, frame, frameTiltles } = useNewProfile();

  return (
    <div className="new-profile bg__gradient">
      <Navbar menu={<></>} />

      <div className="new-profile_heading">
        <h1>{frameTiltles.title}</h1>
        <p>{frameTiltles.subTitle}</p>
      </div>
      <div className="new-profile_container">
        <StepsBar stepsCount={4} currentStep={currentStep} />
        <AnimatePresence>
          <motion.div
            className="new-profile_container_form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: 0.5 }}
          >
            {frame}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NewProfile;
