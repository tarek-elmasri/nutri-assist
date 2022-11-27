import { Profile } from '../../modules/profile';
import ControlButton, { GoBackButton } from './ControlButton';
import profileHelper from '../../modules/profile';
import dietHelper from '../../modules/balanced.diet';

type SummaryFrameProps = {
  onNext: () => void;
  onPrev: () => void;
  form: Profile;
};

const SummaryFrame: React.FC<SummaryFrameProps> = ({
  form,
  onNext,
  onPrev
}) => {
  const { height, weight, gender } = form;

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
          <span>{`${profileHelper.getIdealZone(height).min} - ${
            profileHelper.getIdealZone(height).max
          } (Kg)`}</span>
          <span>
            {profileHelper.getDesireBodyWeight(height, weight, gender) +
              ' (Kg)'}
          </span>
          <span>{dietHelper.getTotalCalories(form) + ' (Kcal)'}</span>
          <span>{dietHelper.getTotalProtein(form) + ' (gm)'}</span>
          <span>{dietHelper.getTotalCHO(form) + ' (gm)'}</span>
          <span>{dietHelper.getTotalFat(form) + ' (gm)'}</span>
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
