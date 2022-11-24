import numbers from '../utils/numbers';
import Profile, { ActivityLevel } from './profile';

export interface IDiet {
  profile: Profile;
  getCalorieFactor: () => number;
  getTotalCalories: () => number;
  getTotalProtein: () => number;
  getTotalCHO: () => number;
  getTotalFat: () => number;
  maximumSaturatedFat: () => number;
  maximumUnsaturatedFat: (consumedSaturatedFat: number) => number;
}

class BalancedDiet implements IDiet {
  protected customizedCalorieFactor?: number;
  protected customizedProtienPercentage?: number;
  protected customizedCHOPercentage?: number;

  profile: Profile;
  constructor(profile: Profile) {
    this.profile = profile;
  }

  setCustomCalorieFactor = (calorieFactor: number): void => {
    this.customizedCalorieFactor = calorieFactor;
  };

  getCalorieFactor = (): number => {
    // return custom factor if been set
    if (this.customizedCalorieFactor) return this.customizedCalorieFactor;

    // else calculate it normally
    const BMI = this.profile.getBMI();
    const activityLevel = this.profile.activityLevel;
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

  getTotalCalories = (): number => {
    return this.getCalorieFactor() * this.profile.getDesireBodyWeight();
  };

  setCustomProteinPercentage = (percentage: number): void => {
    if (percentage < 15 || percentage > 20)
      throw new Error(
        `Invalid percentage value: ${percentage}. Percentage must be in range of 15 to 20.`
      );

    this.customizedProtienPercentage = percentage / 100;
  };

  setCustomCHOPercentage = (percentage: number): void => {
    if (percentage < 40 || percentage > 60)
      throw new Error(
        `Invalid percentage value: ${percentage}. Percentage must be in range of 40 to 60.`
      );

    this.customizedCHOPercentage = percentage / 100;
  };

  getTotalProtein = (): number => {
    const protienPercentage = this.customizedProtienPercentage || 0.2;
    // healty adults
    if (this.profile.age > 18)
      return numbers.fixedDecimals(
        (protienPercentage * this.getTotalCalories()) / 4
      );

    // kids
    return 1.5 * this.profile.getDesireBodyWeight();
  };

  getTotalCHO = (): number => {
    const choPercentage = this.customizedCHOPercentage || 0.6;
    return numbers.fixedDecimals((choPercentage * this.getTotalCalories()) / 4);
  };

  getTotalFat = (): number => {
    const totalCal = this.getTotalCalories();
    const totalProtienInKCAL = this.getTotalProtein() * 4;
    const totalCHOinKCAL = this.getTotalCHO() * 4;
    const totalFatinKCAL = totalCal - totalProtienInKCAL - totalCHOinKCAL;
    return numbers.fixedDecimals(totalFatinKCAL / 9);
  };

  maximumSaturatedFat = (): number =>
    numbers.fixedDecimals((0.1 * this.getTotalCalories()) / 9);

  maximumUnsaturatedFat = (consumedSaturatedFat: number): number =>
    numbers.fixedDecimals(this.getTotalFat() - consumedSaturatedFat);
}

export default BalancedDiet;
