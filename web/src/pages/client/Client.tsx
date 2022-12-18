import { Navigate, useNavigate, useParams } from 'react-router';
import Accordion from '../../baseUI/accordion/Accordion';
import Loader from '../../components/Loader/Loader';
import { useGetClientByIdQuery } from '../../redux/services/serverApi';
import profileHelper from '../../modules/profile';
import dietHelper from '../../modules/balanced.diet';
import { toDate } from '../../utils/dates';
import { notifyError } from '../../utils/notifications';
import './client.css';
import { FaTrashAlt } from 'react-icons/fa';

const Client = () => {
  const navigator = useNavigate();
  const { clientId } = useParams();
  const {
    data: client,
    isLoading,
    isError
  } = useGetClientByIdQuery({ clientId: clientId! });

  const profileCounts = client?.profiles.length || 0;
  if (isLoading) return <Loader fullScreen text="Loading client data" />;
  if (isError) {
    notifyError('Ops something went wrong');
    return <Navigate to="/dashboard/clients" />;
  }

  return (
    <div className="client">
      <div className="client__info">
        <div className="client__info-header">
          <h3>Client Info:</h3>
          <FaTrashAlt size={15} />
        </div>
        <div className="client__info-data">
          <p>{'Full Name: ' + client?.firstName + ' ' + client?.lastName}</p>
          <p>{'Phone No: ' + client?.phoneNo}</p>
          <p>{`Created at: ${toDate(client?.createdAt!)}`}</p>
          <p>{`Attached Profiles: ${profileCounts}`}</p>
        </div>
      </div>

      <div className="client__profiles">
        <div className="client__profiles-header">
          <h3>Profiles :</h3>
          <button
            className="hover-shadow"
            onClick={() =>
              navigator(`/dashboard/clients/${clientId}/profiles/new`)
            }
          >
            New
          </button>
        </div>
        {client?.profiles.map((profile) => (
          <div key={profile.id} className="client__profiles-accordion">
            <Accordion title={toDate(profile.createdAt)}>
              <div className="client__profiles-accordion_container">
                <div className="client__profiles-accordion_container-data">
                  <div className="client__profiles-accordion_container-data_inputs">
                    <p>{`Weight : ${profile.weight} Kg`}</p>
                    <p>{`Height : ${profile.height} cm`}</p>
                    <p>{`Gender : ${profile.gender}`}</p>
                    <p>{`Age Group : ${profile.age}`}</p>
                    <p>{`Activity Level : ${profile.activityLevel}`}</p>
                  </div>
                  <div className="client__profiles-accordion_container-data_calculations">
                    <p>{`Weight Category : ${profileHelper.getWeightCategory(
                      profile.height,
                      profile.weight
                    )}`}</p>
                    <p>{`Ideal Zone : ${
                      profileHelper.getIdealZone(profile.height).min
                    } - ${profileHelper.getIdealZone(profile.height).max}`}</p>
                    <p>{`BMI : ${profileHelper.getBMI(
                      profile.height,
                      profile.weight
                    )}`}</p>
                    <p>{`Total Calories : ${dietHelper.getTotalCalories(
                      profile
                    )} KCal`}</p>
                    <p>{`Attached Serve Plans : ${profile.serves.length}`}</p>
                  </div>
                </div>
                <button
                  className="hover-shadow"
                  onClick={() =>
                    navigator(
                      `/dashboard/profiles/${profile.id}?clientId=${clientId}`
                    )
                  }
                >
                  View
                </button>
              </div>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Client;
