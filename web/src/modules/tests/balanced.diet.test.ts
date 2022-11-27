import diets from '../balanced.diet';
import { ActivityLevel, Gender, Profile } from '../profile';

describe('BalancedDiet Module tests', () => {
  const adultProfile: Profile = {
    height: 175,
    weight: 113,
    gender: Gender.male,
    age: 33,
    activityLevel: ActivityLevel.low,
    serves: []
  };

  const kidProfile: Profile = {
    height: 120,
    weight: 45,
    gender: Gender.female,
    age: 9,
    activityLevel: ActivityLevel.average,
    serves: []
  };

  test('getCalorieFacor method return valid calculations', () => {
    expect(diets.getCaloriesFactor).toBeDefined();
    expect(diets.getCaloriesFactor(adultProfile)).toBe(20);
    expect(diets.getCaloriesFactor(kidProfile)).toBe(30);
  });

  test('getTotalCalories method returns valid calculations', () => {
    expect(diets.getTotalCalories).toBeDefined();
    expect(diets.getTotalCalories(adultProfile)).toEqual(1788.8);
    expect(diets.getTotalCalories(kidProfile)).toEqual(840);
  });

  test('getTotalProtein method returns valid calculations', () => {
    expect(diets.getTotalProtein).toBeDefined();
    expect(diets.getTotalProtein(adultProfile)).toEqual(89.44);
    expect(diets.getTotalProtein(kidProfile)).toEqual(42);
  });

  test('getTotalCHO method returns valid calculations', () => {
    expect(diets.getTotalCHO).toBeDefined();
    expect(diets.getTotalCHO(adultProfile)).toEqual(268.32);
    expect(diets.getTotalCHO(kidProfile)).toEqual(126);
  });

  test('getTotalFat method returns valid calculations', () => {
    expect(diets.getTotalFat).toBeDefined();
    expect(diets.getTotalFat(adultProfile)).toEqual(39.75);
    expect(diets.getTotalFat(kidProfile)).toEqual(18.67);
  });

  test('maximumSaturatedFat method returns valid calculations', () => {
    expect(diets.maximumSaturatedFat).toBeDefined();
    expect(diets.maximumSaturatedFat(adultProfile)).toEqual(19.88);
    expect(diets.maximumSaturatedFat(kidProfile)).toEqual(9.33);
  });
});
