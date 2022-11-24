import { MouseEventHandler, useEffect, useState } from 'react';
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr';
import { Slider } from '../baseUI';
import { ActivityLevel, Gender } from '../modules/profile';

const useNewProfile = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    weight: 78,
    height: 178,
    age: 0,
    gender: Gender.male,
    activityLevel: ActivityLevel.low
  });
  const [frameTiltles, setFrameTitles] = useState({
    title: 'Every Move Starts With A Step',
    subTitle: ''
  });
  const [frame, setFrame] = useState<JSX.Element>();

  useEffect(() => {
    switch (currentStep) {
      case 1:
        setFrame(<WeightBodyFrame />);
        setFrameTitles({
          title: 'Every Move Starts With A Step',
          subTitle: ''
        });
        break;
      case 2:
        setFrame(<GenderFrame />);
        setFrameTitles({
          title: 'Protien Deitery Differ With Gender',
          subTitle: ''
        });
        break;
      case 3:
        setFrame(<AgeFrame />);
        break;
      case 4:
        setFrame(<ActivityLevelFrame />);
        break;
      default:
        setFrame(<WeightBodyFrame />);
    }
  }, [currentStep]);

  const next = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prev = () => {
    setCurrentStep((prev) => (prev - 1 > 1 ? prev - 1 : 1));
  };

  const ControlButton: React.FC<
    {
      onClick?: MouseEventHandler<HTMLButtonElement>;
      action: 'prev' | 'next';
    } & React.PropsWithChildren
  > = ({ onClick, action, children }) => (
    <button
      type="button"
      className="new-profile_container-option"
      onClick={(e) => {
        onClick && onClick(e);
        action === 'next' ? next() : prev();
      }}
    >
      {children}
    </button>
  );

  const GoBackButton = () => (
    <ControlButton action="prev">
      <GrFormPreviousLink size={20} color="var(--color-orange)" />
      <span>Go Back</span>
    </ControlButton>
  );

  const WeightBodyFrame = () => {
    const [weightHeightForm, setweightHeightForm] = useState({
      weight: form.weight,
      height: form.height
    });
    return (
      <>
        <Slider
          label="Weight"
          min={15}
          max={200}
          value={weightHeightForm.weight}
          onChange={(e) =>
            setweightHeightForm((prev) => ({
              ...prev,
              weight: parseInt(e.target.value) || 15
            }))
          }
        />
        <Slider
          label="Height"
          min={100}
          max={250}
          value={weightHeightForm.height}
          onChange={(e) =>
            setweightHeightForm((prev) => ({
              ...prev,
              height: parseInt(e.target.value) || 100
            }))
          }
        />
        <ControlButton
          action="next"
          onClick={() => setForm((prev) => ({ ...prev, ...weightHeightForm }))}
        >
          <span>Next</span>
          <GrFormNextLink size={20} color="var(--color-orange)" />
        </ControlButton>
      </>
    );
  };

  const GenderFrame = () => {
    const genders = [
      { title: 'Male', value: Gender.male },
      { title: 'Female', value: Gender.female }
    ];

    return (
      <>
        <p>Gender</p>
        {genders.map((gender) => (
          <ControlButton
            key={`gender-${gender.value}`}
            action="next"
            onClick={() =>
              setForm((prev) => ({ ...prev, gender: gender.value }))
            }
          >
            <span>{gender.title}</span>
          </ControlButton>
        ))}
        <GoBackButton />
      </>
    );
  };

  const AgeFrame = () => {
    const ageSets = [
      { title: '4 - 8', value: 8 },
      { title: '8 - 13', value: 13 },
      { title: '13 - 18', value: 17 },
      { title: '19 - 30', value: 30 },
      { title: '30 - 50', value: 50 },
      { title: '50+', value: 51 }
    ];
    return (
      <>
        <p>Age</p>
        {ageSets.map((ageSet) => (
          <ControlButton
            key={`age-set-${ageSet.title}`}
            action="next"
            onClick={() => setForm((prev) => ({ ...prev, age: ageSet.value }))}
          >
            <span>{ageSet.title}</span>
          </ControlButton>
        ))}

        <GoBackButton />
      </>
    );
  };

  const ActivityLevelFrame = () => {
    const activitySet = [
      { title: 'Sedentary ( Not Active )', value: ActivityLevel.low },
      { title: 'Moderately Active', value: ActivityLevel.average },
      { title: 'Active', value: ActivityLevel.high }
    ];

    return (
      <>
        {activitySet.map((activity) => (
          <ControlButton
            key={`activity-${activity.value}`}
            action="next"
            onClick={() =>
              setForm((prev) => ({ ...prev, activityLevel: activity.value }))
            }
          >
            <span>{activity.title}</span>
          </ControlButton>
        ))}

        <GoBackButton />
      </>
    );
  };

  return {
    currentStep,
    form,
    frame,
    frameTiltles
  };
};

export default useNewProfile;
