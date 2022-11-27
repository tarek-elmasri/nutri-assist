import numbers from '../utils/numbers';
import profileHelper, { ActivityLevel, Profile } from './profile';

const getCaloriesFactor = ({ height, weight, activityLevel }: Profile) => {
  const BMI = profileHelper.getBMI(height, weight);
  switch (activityLevel) {
    case ActivityLevel.low:
      return BMI > 25 ? 20 : BMI > 18.5 ? 30 : 35;

    case ActivityLevel.average:
      return BMI > 25 ? 30 : BMI > 18.5 ? 35 : 40;

    case ActivityLevel.high:
      return BMI > 25 ? 35 : BMI > 18.5 ? 40 : 45;

    default:
      return 0;
  }
};

const getTotalCalories = (profile: Profile, custumCalorieFactor?: number) => {
  const calorieFactor = custumCalorieFactor || getCaloriesFactor(profile);
  return numbers.fixedDecimals(
    calorieFactor *
      profileHelper.getDesireBodyWeight(
        profile.height,
        profile.weight,
        profile.gender
      )
  );
};

const getTotalProtein = (
  profile: Profile,
  customProtienPercentage?: number,
  customizedCalorieFactor?: number
) => {
  if (
    customProtienPercentage &&
    (customProtienPercentage < 15 || customProtienPercentage > 20)
  )
    throw new Error(
      `Invalid percentage value: ${customProtienPercentage}. Percentage must be in range of 15 to 20.`
    );

  const protienPercentage = customProtienPercentage
    ? customProtienPercentage / 100
    : 0.2;

  // healthy adults
  if (profile.age > 18)
    return numbers.fixedDecimals(
      (protienPercentage * getTotalCalories(profile, customizedCalorieFactor)) /
        4
    );

  // kids
  return numbers.fixedDecimals(
    1.5 *
      profileHelper.getDesireBodyWeight(
        profile.height,
        profile.weight,
        profile.gender
      )
  );
};

const getTotalCHO = (
  profile: Profile,
  customCHOPercentage?: number,
  customCalorieFactor?: number
) => {
  if (
    customCHOPercentage &&
    (customCHOPercentage < 40 || customCHOPercentage > 60)
  )
    throw new Error(
      `Invalid percentage value: ${customCHOPercentage}. Percentage must be in range of 40 to 60.`
    );

  const percentage = customCHOPercentage ? customCHOPercentage / 100 : 0.6;

  return numbers.fixedDecimals(
    (percentage * getTotalCalories(profile, customCalorieFactor)) / 4
  );
};

const getTotalFat = (
  profile: Profile,
  customs?: {
    customCalorieFactor?: number;
    customCHOPercentage?: number;
    customProteinPercentage?: number;
  }
) => {
  const totalCal = getTotalCalories(profile, customs?.customCalorieFactor);
  const totalProtienInKCAL =
    getTotalProtein(profile, customs?.customProteinPercentage) * 4;
  const totalCHOinKCAL = getTotalCHO(profile, customs?.customCHOPercentage) * 4;
  const totalFatinKCAL = totalCal - totalProtienInKCAL - totalCHOinKCAL;
  return numbers.fixedDecimals(totalFatinKCAL / 9);
};

const maximumSaturatedFat = (profile: Profile, customCalorieFactor?: number) =>
  numbers.fixedDecimals(
    (0.1 * getTotalCalories(profile, customCalorieFactor)) / 9
  );

const maximumUnsaturatedFat = (
  profile: Profile,
  consumedSaturatedFat: number,
  customs?: {
    customCalorieFactor?: number;
    customCHOPercentage?: number;
    customProteinPercentage?: number;
  }
) =>
  numbers.fixedDecimals(getTotalFat(profile, customs) - consumedSaturatedFat);

export default {
  getCaloriesFactor,
  getTotalCalories,
  getTotalCHO,
  getTotalFat,
  getTotalProtein,
  maximumSaturatedFat,
  maximumUnsaturatedFat
};
