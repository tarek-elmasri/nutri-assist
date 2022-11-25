import { NewProfileForm } from '../../hooks/useNewProfile';
import BalancedDiet from '../../modules/balanced.diet';
import Profile from '../../modules/profile';
import ControlButton, { GoBackButton } from './ControlButton';

type SummaryFrameProps = {
  onNext: () => void;
  onPrev: () => void;
  form: NewProfileForm;
};

const SummaryFrame: React.FC<SummaryFrameProps> = ({
  form,
  onNext,
  onPrev
}) => {
  const { height, weight, age, gender, activityLevel } = form;
  const profile = new Profile(height, weight, gender, age, activityLevel);
  const diet = new BalancedDiet(profile);

  return (
    <>
      <p>Profile Overview</p>
      <div className="new-profile_container_form_summary">
        <div className="new-profile_container_form_summary-headers">
          <span>Ideal Zone: </span>
          <span>Desired Body Weight:</span>
          <span>Daily Total Calories:</span>
          <span>Daily Protein:</span>
          <span>Daily CHO:</span>
          <span>Daily Fat:</span>
        </div>
        <div className="new-profile_container_form_summary-data">
          <span>{`${profile.getIdealZone().min} - ${
            profile.getIdealZone().max
          } (Kg)`}</span>
          <span>{profile.getDesireBodyWeight() + ' (Kg)'}</span>
          <span>{diet.getTotalCalories() + ' (Kcal)'}</span>
          <span>{diet.getTotalProtein() + ' (gm)'}</span>
          <span>{diet.getTotalCHO() + ' (gm)'}</span>
          <span>{diet.getTotalFat() + ' (gm)'}</span>
        </div>
      </div>
      <ControlButton onClick={onNext}>
        <span>Create Profile</span>
      </ControlButton>
      <GoBackButton onClick={onPrev} />
    </>
  );
};

export default SummaryFrame;
