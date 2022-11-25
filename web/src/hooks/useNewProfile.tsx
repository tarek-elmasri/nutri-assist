import { useEffect, useState } from 'react';
import { ActivityLevel, Gender } from '../modules/profile';
import {
  ActivityLevelFrame,
  AgeFrame,
  GenderFrame,
  WeightBodyFrame
} from '../pages/new_profile';
import SummaryFrame from '../pages/new_profile/SummaryFrame';

export type NewProfileForm = {
  weight: number;
  height: number;
  age: number;
  gender: Gender;
  activityLevel: ActivityLevel;
};

type useNewProfileProps = {
  onSubmit: (form: NewProfileForm) => void;
};
const useNewProfile = ({ onSubmit }: useNewProfileProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<NewProfileForm>({
    weight: 78,
    height: 178,
    age: 0,
    gender: Gender.male,
    activityLevel: ActivityLevel.low
  });

  const [frameTiltles, setFrameTitles] = useState({
    title: 'Every Move Starts With A Step',
    subTitle: 'hola'
  });

  const [frame, setFrame] = useState<JSX.Element>();

  const onNext = (newState: Partial<NewProfileForm>) => {
    if (currentStep > 4) {
      onSubmit({ ...form, ...newState });
    } else {
      setForm((prev) => ({ ...prev, ...newState }));
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
            initialWeight={form.weight}
            initialHeight={form.height}
            onNext={(state) => onNext(state)}
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
          <SummaryFrame onNext={() => onNext({})} onPrev={onPrev} form={form} />
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
            initialWeight={form.weight}
            initialHeight={form.height}
            onNext={(state) => onNext(state)}
          />
        );
        setFrameTitles({
          title: 'Every Move Starts With A Step',
          subTitle: 'A Goal Without A Plan Is Just A Wish'
        });
    }
    // eslint-disable-next-line
  }, [currentStep]);

  return {
    currentStep,
    form,
    frameTiltles,
    frame
  };
};

export default useNewProfile;
