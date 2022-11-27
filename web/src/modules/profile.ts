import numbers from '../utils/numbers';
import { IServe } from './serves';

export interface Profile {
  id?: string;
  height: number;
  weight: number;
  age: number;
  gender: Gender;
  activityLevel: ActivityLevel;
  serves: { count: number; type: IServe }[];
}

export enum Gender {
  male = 'male',
  female = 'female'
}

export enum ActivityLevel {
  low = 'low',
  average = 'average',
  high = 'high'
}

export type IdealZone = {
  max: number;
  min: number;
};

export enum WeightCategory {
  severlyUnderWeight = 'Severely under wieght',
  underWeight = 'Under weight',
  normal = 'Normal',
  overWeight = 'Over Weight',
  obese = 'Obese',
  criticalObese = 'Critical obese',
  dangerousObese = 'Dangerous obese'
}

const getIdealBodyWeight = (height: number) => height - 100;

const getIdealZone = (height: number): IdealZone => {
  const idealBodyWeight = getIdealBodyWeight(height);
  const maxZone = 0.3 * idealBodyWeight + idealBodyWeight;
  let minZone = 0.3 * idealBodyWeight - idealBodyWeight;
  if (minZone < 0) minZone = -1 * minZone;
  return {
    max: numbers.fixedDecimals(maxZone),
    min: numbers.fixedDecimals(minZone)
  };
};

const getDesireBodyWeight = (
  height: number,
  weight: number,
  gender: Gender
): number => {
  const idealBodyWeight = getIdealBodyWeight(height);
  const idealZone = getIdealZone(height);
  const genderFactor = gender === Gender.male ? 0.38 : 0.32;

  // scenario no.1 -> wight in ideal zone
  if (weight <= idealZone.max && weight >= idealZone.min)
    return numbers.fixedDecimals(idealBodyWeight);

  // scenario no.2 -> outside range
  return numbers.fixedDecimals(
    (weight - idealBodyWeight) * genderFactor + idealBodyWeight
  );
};

const getBMI = (height: number, weight: number) =>
  numbers.fixedDecimals(weight / ((height / 100) * (height / 100)));

const getWeightCategory = (height: number, weight: number): WeightCategory => {
  const BMI = getBMI(height, weight);

  return BMI > 40
    ? WeightCategory.dangerousObese
    : BMI > 35
    ? WeightCategory.criticalObese
    : BMI > 30
    ? WeightCategory.obese
    : BMI > 25
    ? WeightCategory.overWeight
    : BMI > 18.5
    ? WeightCategory.normal
    : BMI > 16.5
    ? WeightCategory.underWeight
    : WeightCategory.severlyUnderWeight;
};

export default {
  getIdealBodyWeight,
  getIdealZone,
  getDesireBodyWeight,
  getBMI,
  getWeightCategory
};
