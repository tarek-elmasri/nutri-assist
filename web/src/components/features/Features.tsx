import { Feature } from '../../baseUI';
import './features.css';
import { calculatorImg, mealImg, paperworkImg } from './imports';

const featuresData = [
  {
    title: 'Organize Files',
    text: 'Access your clients profiles anywhere and track their current plans and activities',
    img: paperworkImg
  },
  {
    title: 'Automated Calculations',
    text: 'Provides you with automatic calories and serves calculations with easy customization for each client profile.',
    img: calculatorImg
  },
  {
    title: 'Create Daily Meals',
    text: 'A wide range of dietery serves helps you to build ideal meals for each client.',
    img: mealImg
  }
];

const Features = () => {
  return (
    <div className="main__features section__padding">
      <div className="main__features-container bg__gradient-light" id="about">
        <div className="main__features-heading">
          <h2>Nutrition Analysis, Meal Planning and</h2>
          <h2> Practice Managment In One Place.</h2>
        </div>

        <div className="main__features-div">
          {featuresData.map((feature) => (
            <Feature
              title={feature.title}
              text={feature.text}
              img={feature.img}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
