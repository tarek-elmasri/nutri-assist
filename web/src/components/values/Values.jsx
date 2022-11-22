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
      <div className="main__values-heading">
        <h1 className="gradient__text">
          Get Rid Of Paperwork & Focus On Patient Needs
        </h1>
      </div>
      <div className="main__values-container">
        {valuesData.map((value) => (
          <Value title={value.title} text={value.text} />
        ))}
      </div>
    </div>
  );
};

export default Values;
