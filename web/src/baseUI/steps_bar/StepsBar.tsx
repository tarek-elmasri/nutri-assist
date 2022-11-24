import './steps_bar.css';

type StepsBarProps = {
  stepsCount: number;
  currentStep: number;
};

const StepsBar: React.FC<StepsBarProps> = ({ stepsCount, currentStep }) => {
  return (
    <div className="steps-bar">
      {[...Array(stepsCount)].map((_, i) => (
        <div
          key={`step-${i}`}
          className={`steps-bar__step ${currentStep >= i + 1 ? 'active' : ''}`}
        ></div>
      ))}
    </div>
  );
};

export default StepsBar;
