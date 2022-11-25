import { Gender } from '../../modules/profile';
import ControlButton, { GoBackButton } from './ControlButton';

type GenderFrameProps = {
  onNext: (gender: Gender) => void;
  onPrev: () => void;
};

const GenderFrame: React.FC<GenderFrameProps> = ({ onNext, onPrev }) => {
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
          onClick={() => onNext(gender.value)}
        >
          <span>{gender.title}</span>
        </ControlButton>
      ))}
      <GoBackButton onClick={onPrev} />
    </>
  );
};

export default GenderFrame;
