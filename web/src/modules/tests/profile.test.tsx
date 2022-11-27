import profileHelper, { Profile, ActivityLevel, Gender } from '../profile';

fdescribe('profile module tests', () => {
  let profile: Profile;

  beforeEach(() => {
    profile = {
      height: 178,
      weight: 82,
      gender: Gender.male,
      age: 36,
      activityLevel: ActivityLevel.low,
      serves: []
    };
  });
  test('getIdealBodyWeight method defined and returns valid calculations', () => {
    expect(profileHelper.getIdealBodyWeight).toBeDefined();
    expect(profileHelper.getIdealBodyWeight(profile.height)).toBe(78);
  });

  test('getIdealZone method defined and return valid ranged values', () => {
    expect(profileHelper.getIdealZone).toBeDefined();
    expect(profileHelper.getIdealZone(profile.height)).toEqual({
      min: 54.6,
      max: 101.4
    });
  });

  test('getDesireBodyWeight methid defined and return valid value', () => {
    expect(profileHelper.getDesireBodyWeight).toBeDefined();
    expect(
      profileHelper.getDesireBodyWeight(
        profile.height,
        profile.weight,
        profile.gender
      )
    ).toBe(78);
  });

  test('getBMI to be defined and return valid value', () => {
    expect(profileHelper.getBMI).toBeDefined();
    expect(profileHelper.getBMI(profile.height, profile.weight)).toBe(25.88);
  });

  test('getWeightCategory method defined and returns valid value', () => {
    expect(profileHelper.getWeightCategory).toBeDefined();
    expect(
      profileHelper.getWeightCategory(profile.height, profile.weight)
    ).toBe('Over Weight');
  });
});
