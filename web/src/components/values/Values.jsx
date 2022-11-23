import { motion } from 'framer-motion';
import { Value } from '../../baseUI';
import './values.css';

const valuesData = [
  {
    title: 'Access Anywhere',
    text: 'All your data are stored on cloud and can be accessed whenever needed.'
  },
  {
    title: 'Spend Less Time',
    text: 'Average time required to create a profile for your client is between 5 to 10 minutes'
  },
  {
    title: 'Avoid Errors',
    text: 'With automated process, there is no need to re-check your calculations.'
  },
  {
    title: 'Focus On Progress',
    text: 'Check how your client are working towards their goals, track their progress and update their dietry meals.'
  }
];
const Values = () => {
  return (
    <div className="main__values section__padding" id="values">
      <motion.div
        className="main__values-heading"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h1 className="gradient__text">
          Get Rid Of Paperwork & Focus On Patient Needs
        </h1>
      </motion.div>
      <div className="main__values-container">
        {valuesData.map((value) => (
          <motion.div
            key={`${value.title}-title`}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Value title={value.title} text={value.text} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Values;
