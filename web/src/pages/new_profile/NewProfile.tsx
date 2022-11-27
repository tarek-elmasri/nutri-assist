import { useState, useEffect, PropsWithChildren } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../../components';
import { StepsBar } from '../../baseUI';
import './new_profile.css';
import { ProfileState, updateProfile } from '../../redux/features/profileSlice';
import { GlobalStoreState } from '../../redux/store';
import WeightBodyFrame from './WeightBodyFrame';
import GenderFrame from './GenderFrame';
import AgeFrame from './AgeFrame';
import ActivityLevelFrame from './ActivityLevelFrame';
import SummaryFrame from './SummaryFrame';
import { Profile } from '../../modules/profile';

const NewProfile = () => {
  const dispatch = useDispatch();
  const { data: profileData } = useSelector<GlobalStoreState, ProfileState>(
    (state) => state.profile
  );

  const { activityLevel, gender, age, weight, height } = profileData;
  const [currentStep, setCurrentStep] = useState(1);
  const [frame, setFrame] = useState<JSX.Element>();
  const [frameTiltles, setFrameTitles] = useState({
    title: 'Every Move Starts With A Step',
    subTitle: 'hola'
  });

  const onNext = (newState: Partial<Profile>) => {
    dispatch(updateProfile(newState));

    if (currentStep === 5) {
      console.log({ height, weight, age, activityLevel, gender });
      //onSubmit({ ...form, ...newState });
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const onPrev = () => {
    setCurrentStep((prev) => (prev === 1 ? 1 : prev - 1));
  };

  useEffect(() => {
    switch (currentStep) {
      case 1:
        setFrame(
          <WeightBodyFrame
            initialWeight={weight}
            initialHeight={height}
            onNext={(frameState) => onNext(frameState)}
          />
        );
        setFrameTitles({
          title: 'Every Move Starts With A Step',
          subTitle: 'A Goal Without A Plan Is Just A Wish'
        });
        break;
      case 2:
        setFrame(
          <GenderFrame
            onNext={(gender) => onNext({ gender })}
            onPrev={onPrev}
          />
        );
        setFrameTitles({
          title: 'Eat To Nourish Your Body Not Your Emotions',
          subTitle: "You Dont'n Need To Eat Less, You Just Need To Eat Right"
        });
        break;
      case 3:
        setFrame(
          <AgeFrame onNext={(age) => onNext({ age })} onPrev={onPrev} />
        );
        setFrameTitles({
          title: 'To Change Your Body, You Must Change Your Mind',
          subTitle:
            "It's Not A Short Time Diet, It's A Long Term Lifestyle Change"
        });
        break;
      case 4:
        setFrame(
          <ActivityLevelFrame
            onNext={(activityLevel) => onNext({ activityLevel })}
            onPrev={onPrev}
          />
        );
        setFrameTitles({
          title: 'Slow Progress is Better Than No Progress',
          subTitle:
            "In Two Weeks, You'll Feel It, In Four Weeks You'll See It, In Eight Weeks You'll Hear It"
        });
        break;
      case 5:
        setFrame(
          <SummaryFrame
            onNext={() => onNext({})}
            onPrev={onPrev}
            form={{ weight, height, activityLevel, age, gender }}
          />
        );
        setFrameTitles({
          title: 'Strive For Progress, Not For Perfection',
          subTitle:
            'Looking After Your Health Today Gives You A Better Hope For Tomorrow'
        });
        break;
      default:
        setFrame(
          <WeightBodyFrame
            initialWeight={weight}
            initialHeight={height}
            onNext={(frmaeState) => onNext(frmaeState)}
          />
        );
        setFrameTitles({
          title: 'Every Move Starts With A Step',
          subTitle: 'A Goal Without A Plan Is Just A Wish'
        });
    }
    // eslint-disable-next-line
  }, [currentStep]);

  const variants = {
    hidden: { opacity: 0, x: -20 },
    enter: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.5
      }
    },
    exit: { opacity: 0, x: 20 }
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
