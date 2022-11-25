import ControlButton, { GoBackButton } from './ControlButton';

type AgeFrameProps = {
  onNext: (age: number) => void;
  onPrev: () => void;
};
const AgeFrame: React.FC<AgeFrameProps> = ({ onNext, onPrev }) => {
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
          onClick={() => onNext(ageSet.value)}
        >
          <span>{ageSet.title}</span>
        </ControlButton>
      ))}

      <GoBackButton onClick={onPrev} />
    </>
  );
};
export default AgeFrame;
