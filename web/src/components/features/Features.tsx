import { motion, AnimatePresence } from 'framer-motion';
import { Feature } from '../../baseUI';
import { calculatorImg, mealImg, paperworkImg } from './imports';
import './features.css';

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
  const animateX = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="main__features section__padding">
      <div className="main__features-container bg__gradient-light" id="about">
        <div className="main__features-heading">
          <h2 className="gradient__text">
            Nutrition Analysis, Meal Planning and
          </h2>
          <h2 className="gradient__text"> Practice Managment In One Place.</h2>
        </div>

        <div className="main__features-div">
          {featuresData.map((feature, i) => (
            <motion.div
              key={`$${feature.title}-title`}
              variants={animateX}
              initial="hidden"
              whileInView="show"
              transition={{ delay: 0.5 }}
            >
              <Feature
                title={feature.title}
                text={feature.text}
                img={feature.img}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
