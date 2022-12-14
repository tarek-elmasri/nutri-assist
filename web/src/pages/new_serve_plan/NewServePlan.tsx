import { Navigate, useNavigate, useParams } from 'react-router';
import Loader from '../../components/Loader/Loader';
import useServeCalculator from '../../hooks/useServeCalculator';
import {
  useCreateServePlanMutation,
  useGetProfileQuery
} from '../../redux/services/serverApi';
import { notifyError } from '../../utils/notifications';
import profileHelper from '../../modules/balanced.diet';
import './new_serve_plan.css';

const NewServePlan = () => {
  const navigator = useNavigate();
  const { profileId, clientId } = useParams();
  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError
  } = useGetProfileQuery(
    { profileId: profileId!, clientId: clientId! },
    { skip: !profileId || !clientId }
  );

  const [submit, { isLoading: isServeLoading }] = useCreateServePlanMutation();

  const { register, serveTypesTotals, totals, form } = useServeCalculator();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const servePlan = await submit({
        clientId: clientId!,
        profileId: profileId!,
        serves: form
      }).unwrap();

      console.log(servePlan);
    } catch (error) {
      notifyError('Ops something went wrong, please try again later');
    }
  };

  if (isProfileError || !profileId || !clientId) {
    notifyError('Ops something went wrong, please try again');
    return <Navigate to="/dashboard/clients" />;
  }

  return (
    <div className="new-serve-plan">
      {isProfileLoading && <Loader fullScreen text="Loading profile data" />}
      {isServeLoading && <Loader fullScreen text="Creating serve plan" />}
      <div className="new-serve-plan__heading">
        <h1>Balance Your Serves</h1>
        <p>
          Maintain healthy and balanced calories helps long term weight loss
          plan
        </p>
      </div>
      <div className="new-serve-plan__calories">
        <div className="new-serve-plan__calories-sum">
          <span>Total Calories:</span>
          <span>{totals.calories}</span>
        </div>
        <div className="new-serve-plan__calories-target">
          <span>
            {profile ? profileHelper.getTotalCalories(profile) : 0} KCal
          </span>
        </div>
      </div>
      <form className="new-serve-plan__table" onSubmit={handleSubmit}>
        <div className="table-responsive">
          <table>
            <thead>
              <tr className="header">
                <th colSpan={2}>Types</th>
                <th>Serves</th>
                <th>Protien</th>
                <th>CHO</th>
                <th>Sat. Fat</th>
                <th>MUFA</th>
                <th>PUFA</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="subheader" colSpan={2}>
                  Starch
                </td>
                <td className="input-cell">
                  <input {...register('starch')} type="number" />
                </td>
                <td>{serveTypesTotals.starch.protien}</td>
                <td>{serveTypesTotals.starch.CHO}</td>
                <td rowSpan={3}></td>
                <td rowSpan={11}></td>
                <td rowSpan={11}></td>
              </tr>
              <tr>
                <td className="subheader" colSpan={2}>
                  Vegtables
                </td>
                <td className="input-cell">
                  <input {...register('vegetable')} type="number" />
                </td>
                <td>{serveTypesTotals.vegetable.protien}</td>
                <td>{serveTypesTotals.vegetable.CHO}</td>
              </tr>
              <tr>
                <td className="subheader" colSpan={2}>
                  Fruits
                </td>
                <td className="input-cell">
                  <input {...register('fruit')} type="number" />
                </td>
                <td>0</td>
                <td>{serveTypesTotals.fruit.CHO}</td>
              </tr>
              <tr>
                <td className="subheader" rowSpan={3}>
                  Meat
                </td>
                <td className="subheader">Lean</td>
                <td className="input-cell">
                  <input {...register('leanMeat')} type="number" />
                </td>
                <td rowSpan={3}>
                  {serveTypesTotals.leanMeat.protien +
                    serveTypesTotals.mediumMeat.protien +
                    serveTypesTotals.highMeat.protien}
                </td>
                <td rowSpan={3}></td>
                <td>{serveTypesTotals.leanMeat.fat}</td>
              </tr>
              <tr>
                <td className="subheader">Medium</td>
                <td className="input-cell">
                  <input {...register('mediumMeat')} type="number" />
                </td>
                <td>{serveTypesTotals.mediumMeat.fat}</td>
              </tr>
              <tr>
                <td className="subheader">High</td>
                <td className="input-cell">
                  <input {...register('highMeat')} type="number" />
                </td>
                <td>{serveTypesTotals.highMeat.fat}</td>
              </tr>
              <tr>
                <td className="subheader" rowSpan={3}>
                  Milk
                </td>
                <td className="subheader">Low Fat</td>
                <td className="input-cell">
                  <input {...register('lowFatMilk')} type="number" />
                </td>
                <td rowSpan={3}>
                  {serveTypesTotals.lowFatMilk.protien +
                    serveTypesTotals.mediumFatMilk.protien +
                    serveTypesTotals.highFatMilk.protien}
                </td>
                <td rowSpan={3}>
                  {serveTypesTotals.lowFatMilk.CHO +
                    serveTypesTotals.mediumFatMilk.CHO +
                    serveTypesTotals.highFatMilk.CHO}
                </td>
                <td>{serveTypesTotals.lowFatMilk.fat}</td>
              </tr>
              <tr>
                <td className="subheader">Medium Fat</td>
                <td className="input-cell">
                  <input {...register('mediumFatMilk')} type="number" />
                </td>
                <td>{serveTypesTotals.mediumFatMilk.fat}</td>
              </tr>
              <tr>
                <td className="subheader">High Fat</td>
                <td className="input-cell">
                  <input {...register('highFatMilk')} type="number" />
                </td>
                <td>{serveTypesTotals.highFatMilk.fat}</td>
              </tr>
              <tr>
                <td className="subheader" colSpan={2}>
                  Legume
                </td>
                <td className="input-cell">
                  <input {...register('legume')} type="number" />
                </td>
                <td>{serveTypesTotals.legume.protien}</td>
                <td>{serveTypesTotals.legume.CHO}</td>
                <td rowSpan={2}></td>
              </tr>
              <tr>
                <td className="subheader" colSpan={2}>
                  Add Sugar
                </td>
                <td className="input-cell">
                  <input {...register('sugar')} type="number" />
                </td>

                <td></td>
                <td>{serveTypesTotals.sugar.CHO}</td>
              </tr>
              <tr>
                <td className="subheader" rowSpan={2}>
                  Oil
                </td>
                <td className="subheader">MUFA</td>
                <td className="input-cell">
                  <input {...register('mufa')} type="number" />
                </td>
                <td colSpan={3}></td>
                <td>{serveTypesTotals.mufa.fat}</td>
                <td></td>
              </tr>
              <tr>
                <td className="subheader">PUFA</td>
                <td className="input-cell">
                  <input {...register('pufa')} type="number" />
                </td>
                <td colSpan={3}></td>
                <td></td>
                <td>{serveTypesTotals.pufa.fat}</td>
              </tr>
              <tr className="subheader">
                <td colSpan={3}>Totals</td>
                <td>
                  <span>{totals.protien}</span> /{' '}
                  {profile ? profileHelper.getTotalProtein(profile) : 0}
                </td>
                <td>
                  <span>{totals.CHO}</span> /{' '}
                  {profile ? profileHelper.getTotalCHO(profile) : 0}
                </td>
                <td>
                  <span>
                    {totals.fat -
                      serveTypesTotals.mufa.fat -
                      serveTypesTotals.pufa.fat}
                  </span>{' '}
                  / {profile ? profileHelper.maximumSaturatedFat(profile) : 0}
                </td>
                <td colSpan={2}>
                  <span>
                    {serveTypesTotals.mufa.fat + serveTypesTotals.pufa.fat}
                  </span>{' '}
                  /{' '}
                  {profile
                    ? profileHelper.maximumUnsaturatedFat(
                        profile,
                        totals.fat -
                          serveTypesTotals.mufa.fat -
                          serveTypesTotals.pufa.fat
                      )
                    : 0}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="new-serve-plan__table-button">
          <button className="hover-shadow" type="submit">
            Create Serve Plan
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewServePlan;
