import React, { useState } from 'react';
import { GrFormNextLink } from 'react-icons/gr';
import { Slider } from '../../baseUI';
import ControlButton from './ControlButton';

type WeightBodyFrameProps = {
  initialWeight: number;
  initialHeight: number;
  onNext: (currentState: { weight: number; height: number }) => void;
};
const WeightBodyFrame: React.FC<WeightBodyFrameProps> = ({
  initialWeight,
  initialHeight,
  onNext
}) => {
  const [weightHeightForm, setweightHeightForm] = useState({
    weight: initialWeight,
    height: initialHeight
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
      <ControlButton onClick={() => onNext(weightHeightForm)}>
        <span>Next</span>
        <GrFormNextLink size={20} color="var(--color-orange)" />
      </ControlButton>
    </>
  );
};
export default WeightBodyFrame;
