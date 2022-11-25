import React, { MouseEventHandler } from 'react';
import { GrFormPreviousLink } from 'react-icons/gr';

type ControlButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
} & React.PropsWithChildren;

const ControlButton: React.FC<ControlButtonProps> = ({ onClick, children }) => (
  <button
    type="button"
    className="new-profile_container-option"
    onClick={onClick}
  >
    {children}
  </button>
);

export const GoBackButton: React.FC<ControlButtonProps> = ({ onClick }) => (
  <ControlButton onClick={onClick}>
    <GrFormPreviousLink size={20} color="var(--color-orange)" />
    <span>Go Back</span>
  </ControlButton>
);

export default ControlButton;
