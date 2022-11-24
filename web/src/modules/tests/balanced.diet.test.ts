import BalancedDiet, { IDiet } from '../balanced.diet';
import Profile, { ActivityLevel, Gender } from '../profile';

describe('BalancedDiet Module tests', () => {
  const adultProfile = new Profile(
    175,
    113,
    Gender.male,
    33,
    ActivityLevel.low
  );

  const kidProfile = new Profile(
    120,
    45,
    Gender.female,
    9,
    ActivityLevel.average
  );

  const adultDiet = new BalancedDiet(adultProfile);
  const kidDiet = new BalancedDiet(kidProfile);

  test('getCalorieFacor method return valid calculations', () => {
    expect(adultDiet.getCalorieFactor).toBeDefined();
    expect(adultDiet.getCalorieFactor()).toBe(20);
    expect(kidDiet.getCalorieFactor()).toBe(30);
  });

  test('getTotalCalories method returns valid calculations', () => {
    expect(adultDiet.getTotalCalories).toBeDefined();
    expect(adultDiet.getTotalCalories()).toEqual(1788.8);
    expect(kidDiet.getTotalCalories()).toEqual(840);
  });

  test('getTotalProtein method returns valid calculations', () => {
    expect(adultDiet.getTotalProtein).toBeDefined();
    expect(adultDiet.getTotalProtein()).toEqual(89.44);
    expect(kidDiet.getTotalProtein()).toEqual(42);
  });

  test('getTotalCHO method returns valid calculations', () => {
    expect(adultDiet.getTotalCHO).toBeDefined();
    expect(adultDiet.getTotalCHO()).toEqual(268.32);
    expect(kidDiet.getTotalCHO()).toEqual(126);
  });

  test('getTotalFat method returns valid calculations', () => {
    expect(adultDiet.getTotalFat).toBeDefined();
    expect(adultDiet.getTotalFat()).toEqual(39.75);
    expect(kidDiet.getTotalFat()).toEqual(18.67);
  });

  test('maximumSaturatedFat method returns valid calculations', () => {
    expect(adultDiet.maximumSaturatedFat).toBeDefined();
    expect(adultDiet.maximumSaturatedFat()).toEqual(19.88);
    expect(kidDiet.maximumSaturatedFat()).toEqual(9.33);
  });
});
