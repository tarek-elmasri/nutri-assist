import './value.css';

const Value = ({ title, text }) => {
  return (
    <div className="main__values_value">
      <div className="main__values_value-heading">
        <div className="main__values_value-heading_line" />
        <h6>{title}</h6>
      </div>
      <div className="main__values_value-text">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Value;
