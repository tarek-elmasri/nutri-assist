import Profile, { ActivityLevel, Gender } from '../profile';

fdescribe('profile module tests', () => {
  let profile: Profile;

  beforeEach(() => {
    profile = new Profile(178, 82, Gender.male, 36, ActivityLevel.low);
  });
  test('getIdealBodyWeight method defined and returns valid calculations', () => {
    expect(profile.getIdealBodyWeight).toBeDefined();
    expect(profile.getIdealBodyWeight()).toBe(78);
  });

  test('getIdealZone method defined and return valid ranged values', () => {
    expect(profile.getIdealZone).toBeDefined();
    expect(profile.getIdealZone()).toEqual({
      min: 54.6,
      max: 101.4
    });
  });

  test('getDesireBodyWeight methid defined and return valid value', () => {
    expect(profile.getDesireBodyWeight).toBeDefined();
    expect(profile.getDesireBodyWeight()).toBe(78);
  });

  test('getBMI to be defined and return valid value', () => {
    expect(profile.getBMI).toBeDefined();
    expect(profile.getBMI()).toBe(25.88);
  });

  test('getWeightCategory method defined and returns valid value', () => {
    expect(profile.getWeightCategory).toBeDefined();
    expect(profile.getWeightCategory()).toBe('Over Weight');
  });
});
