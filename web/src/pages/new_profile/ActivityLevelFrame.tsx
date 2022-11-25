import { ActivityLevel } from '../../modules/profile';
import ControlButton, { GoBackButton } from './ControlButton';

type ActivityLevelFrameProps = {
  onNext: (activityLevel: ActivityLevel) => void;
  onPrev: () => void;
};
const ActivityLevelFrame: React.FC<ActivityLevelFrameProps> = ({
  onNext,
  onPrev
}) => {
  const activitySet = [
    { title: 'Sedentary ( Not Active )', value: ActivityLevel.low },
    { title: 'Moderately Active', value: ActivityLevel.average },
    { title: 'Active', value: ActivityLevel.high }
  ];

  return (
    <>
      <p>Activity Level</p>
      {activitySet.map((activity) => (
        <ControlButton
          key={`activity-${activity.value}`}
          onClick={() => onNext(activity.value)}
        >
          <span>{activity.title}</span>
        </ControlButton>
      ))}

      <GoBackButton onClick={onPrev} />
    </>
  );
};

export default ActivityLevelFrame;
