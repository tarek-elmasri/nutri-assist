import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import Searchbar from '../../baseUI/Searchbar/Searchbar';
import Loader from '../../components/Loader/Loader';
import { useGetClientsQuery } from '../../redux/services/serverApi';
import { Client } from '../../redux/services/serverApi/endpoints/clients';
import './clients.css';

const ClientCard: React.FC<{ client: Client }> = ({ client }) => (
  <>
    <div className="clients__container_client">
      <div className="clients__container_client-header">
        <h3>
          {client.firstName} {client.lastName ? client.lastName : ''}
        </h3>
        <span>{client.phoneNo}</span>
      </div>
      <div className="clients__container_client-divider" />
      <div className="clients__container_client-body">
        <span>
          {client.profiles.length +
            ' ' +
            (client.profiles.length > 1 ? 'profiles' : 'profile')}
        </span>
        <span>{'Added at: ' + new Date(client.createdAt).toDateString()}</span>
        <span>{'Last Appointed at: Sep 11 2022'}</span>
        <span>{'Next Appointment at: -'}</span>
      </div>
    </div>
  </>
);
const Clients = () => {
  const navigator = useNavigate();
  const { data: clients, isLoading, isError } = useGetClientsQuery(null);
  const [searchBy, setSearchBy] = useState('Name');
  const [searchInput, setSearchInput] = useState('');

  const filterClientsByName = useCallback(
    (filterSearch: string) => {
      return clients?.filter(
        (client) =>
          client.firstName.startsWith(filterSearch) ||
          client.lastName?.startsWith(filterSearch)
      );
    },
    [clients]
  );

  const filterClientsByPhone = useCallback(
    (filterSearch: string) => {
      return clients?.filter((client) =>
        client.phoneNo.startsWith(filterSearch)
      );
    },
    [clients]
  );

  return (
    <div className="clients">
      {isLoading && <Loader text="Loading clients data" />}
      <div className="clients__path">
        <span>Clients \ </span>
        <button
          className="hover-shadow"
          onClick={() => navigator('/dashboard/clients/new')}
        >
          New Client
        </button>
      </div>
      <div className="clients__searchbar">
        <div className="clients__searchbar-input">
          <Searchbar
            value={searchInput}
            placeholder={
              searchBy === 'Name'
                ? 'Search by client name'
                : 'Search by client phone no.'
            }
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="clients__searchbar-options">
          <select
            defaultValue={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
          >
            <option value="Name">Name</option>
            <option value="Phone">Phone No</option>
          </select>
        </div>
      </div>
      <div className="clients__container">
        {isError && <>Something went wrong! please try again later</>}
        {clients?.length === 0 && <>No available clients</>}
        {searchBy === 'Name'
          ? filterClientsByName(searchInput)?.map((client) => (
              <ClientCard key={client.id} client={client} />
            ))
          : filterClientsByPhone(searchInput)?.map((client) => (
              <ClientCard key={client.id} client={client} />
            ))}
      </div>
    </div>
  );
};

export default Clients;
