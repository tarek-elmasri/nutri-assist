import numbers from '../utils/numbers';

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

class Profile {
  height: number; // in cm
  weight: number; // in Kg
  gender: Gender;
  age: number;
  activityLevel: ActivityLevel;
  protected customizedCalorieFactor?: number;

  constructor(
    height: number,
    weight: number,
    gender: Gender,
    age: number,
    activityLevel: ActivityLevel = ActivityLevel.low
  ) {
    this.height = height;
    this.weight = weight;
    this.gender = gender;
    this.age = age;
    this.activityLevel = activityLevel;
  }

  getIdealBodyWeight = (): number => this.height - 100;

  getIdealZone = (): IdealZone => {
    const idealBodyWeight = this.getIdealBodyWeight();
    const maxZone = 0.3 * idealBodyWeight + idealBodyWeight;
    let minZone = 0.3 * idealBodyWeight - idealBodyWeight;
    if (minZone < 0) minZone = -1 * minZone;
    return {
      max: numbers.fixedDecimals(maxZone),
      min: numbers.fixedDecimals(minZone)
    };
  };

  getDesireBodyWeight = (): number => {
    const idealBodyWeight = this.getIdealBodyWeight();
    const idealZone = this.getIdealZone();
    const genderFactor = this.gender === Gender.male ? 0.38 : 0.32;

    // scenario no.1 -> wight in ideal zone
    if (this.weight <= idealZone.max && this.weight >= idealZone.min)
      return numbers.fixedDecimals(idealBodyWeight);

    // scenario no.2 -> outside range
    return (
      numbers.fixedDecimals(this.weight - idealBodyWeight) * genderFactor +
      idealBodyWeight
    );
  };

  getBMI = () =>
    numbers.fixedDecimals(
      this.weight / ((this.height / 100) * (this.height / 100))
    );

  getWeightCategory = (): WeightCategory => {
    const BMI = this.getBMI();

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
}

export default Profile;
