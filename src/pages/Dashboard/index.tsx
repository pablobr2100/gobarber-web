import React, { useCallback, useEffect, useState } from 'react';
import 'react-day-picker/lib/style.css';
import { Link, useHistory } from 'react-router-dom';

import { FiCalendar, FiClock, FiPower } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Section,
  Provider,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  const [providers, setProviders] = useState<Provider[]>([]);

  const history = useHistory();

  useEffect(() => {
    api.get<Provider[]>('/providers').then(response => {
      setProviders(response.data);
    });
  }, []);

  const goToCreateAppointment = useCallback(
    (provider: Provider) => {
      history.push({
        pathname: '/create-appointment',
        state: provider,
      });
    },
    [history],
  );

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <h1>Cabeleireiros</h1>
        <Section>
          {providers.map(provider => (
            <Provider
              type="button"
              key={provider.id}
              onClick={() => goToCreateAppointment(provider)}
            >
              <img src={provider.avatar_url} alt={provider.name} />
              <div>
                <strong>{provider.name}</strong>
                <span>
                  <FiCalendar />
                  Segunda à sexta
                </span>
                <span>
                  <FiClock />
                  8h às 18h
                </span>
              </div>
            </Provider>
          ))}
        </Section>
      </Content>
    </Container>
  );
};

export default Dashboard;
