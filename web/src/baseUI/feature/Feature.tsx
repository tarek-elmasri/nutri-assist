import React from 'react';
import './feature.css';

type FeatureProps = {
  title: string;
  text: string;
  img: string;
};
const Feature: React.FC<FeatureProps> = ({ title, text, img }) => {
  return (
    <div className="main__features_feature-container">
      <div className="main__features_feature-container_content">
        <div className="main__features_feature-container_content-image">
          <img src={img} alt={title} />
        </div>
        <div className="main__features_feature-container_content-text">
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Feature;
