import './slider.css';

type SliderProps = {
  min: number;
  max: number;
  label: string;
  value: number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};
const Slider: React.FC<SliderProps> = ({
  min,
  max,
  label,
  value,
  onChange
}) => {
  return (
    <div className="slider">
      <div className="slider__container">
        <label htmlFor="d">{label}</label>
        <input
          type="range"
          min={min}
          max={max}
          className="slider__container-bar"
          value={value}
          onChange={onChange}
        />
      </div>
      <input
        type="number"
        className="slider__input"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Slider;
