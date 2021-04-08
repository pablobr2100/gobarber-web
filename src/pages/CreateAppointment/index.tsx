import React, {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { isToday, format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Link, useLocation, useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  ProviderProfile,
  ContentDate,
  Calendar,
  ContentHour,
  Section,
  SectionContent,
  Hour,
  CreateAppointmentButton,
} from './styles';

import logoImg from '../../assets/logo.svg';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import api from '../../services/api';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface HourAvailabilityItem {
  hour: number;
  available: boolean;
}

// interface Appointment {
//   id: string;
//   date: string;
//   hourFormatted: string;
//   user: {
//     name: string;
//     avatar_url: string;
//   };
// }

interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();

  const location = useLocation<Provider>();
  const history = useHistory();

  const { addToast } = useToast();

  const provider = location.state;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const [hourAvailability, setHourAvailability] = useState<
    HourAvailabilityItem[]
  >([]);

  // const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleCreateAppointment = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      try {
        // const date = new Date(selectedDate);
        // date.setHours(selectedHour);
        // date.setMinutes(0);

        const year = selectedDate.getFullYear();
        const month = format(selectedDate, 'LL', {
          locale: ptBr,
        });
        const day = selectedDate.getDate();

        const provider_id = provider.id;
        const date = `${year}-${month}-${day} ${selectedHour}:00:00`;

        const data = {
          provider_id,
          date,
        };

        // eslint-disable-next-line
        console.log(date, provider_id);

        // eslint-disable-next-line
        console.log(data);

        await api.post('/appointments', data);

        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Agendamento criado com sucesso!',
          description: 'Seu agendamento foi criado com sucesso!',
        });
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Erro ao criar agendamento',
          description:
            'Ocorreu um erro ao tentar criar o agendamento, tente novamente.',
        });
      }
    },
    [addToast, history, provider.id, selectedDate, selectedHour],
  );

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  useEffect(() => {
    api
      .get(`/providers/${provider.id}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        setHourAvailability(response.data);
      });
  }, [selectedDate, provider.id]);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBr,
    });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', { locale: ptBr });
  }, [selectedDate]);

  const morningAvailability = useMemo(() => {
    return hourAvailability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [hourAvailability]);

  const afternoonAvailability = useMemo(() => {
    return hourAvailability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [hourAvailability]);

  return (
    <Container onSubmit={handleCreateAppointment}>
      <Header>
        <HeaderContent>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>

          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
          </Profile>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Agendamento</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>
        </Schedule>

        <ProviderProfile>
          <img src={provider.avatar_url} alt={provider.name} />
          <p>{provider.name}</p>
        </ProviderProfile>

        <ContentDate>
          <Calendar>
            <h1>Escolha o Dia</h1>
            <DayPicker
              weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
              fromMonth={new Date()}
              disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
              modifiers={{
                available: { daysOfWeek: [1, 2, 3, 4, 5] },
              }}
              onMonthChange={handleMonthChange}
              selectedDays={selectedDate}
              onDayClick={handleDateChange}
              months={[
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro',
              ]}
            />
          </Calendar>

          <ContentHour>
            <h1>Escolha o horário</h1>
            <div>
              <Section>
                <h1>Manhã</h1>

                <SectionContent>
                  {morningAvailability.map(
                    ({ hourFormatted, hour, available }) => (
                      <Hour
                        disabled={!available}
                        selected={selectedHour === hour}
                        type="button"
                        available={available}
                        key={hourFormatted}
                        onClick={() => handleSelectHour(hour)}
                      >
                        <p>{hourFormatted}</p>
                      </Hour>
                    ),
                  )}
                </SectionContent>
              </Section>

              <Section>
                <h1>Tarde</h1>

                <SectionContent>
                  {afternoonAvailability.map(
                    ({ hourFormatted, hour, available }) => (
                      <Hour
                        disabled={!available}
                        selected={selectedHour === hour}
                        type="button"
                        available={available}
                        key={hourFormatted}
                        onClick={() => handleSelectHour(hour)}
                      >
                        <p>{hourFormatted}</p>
                      </Hour>
                    ),
                  )}
                </SectionContent>
              </Section>
            </div>
          </ContentHour>
        </ContentDate>
        <CreateAppointmentButton type="submit">Agendar</CreateAppointmentButton>
      </Content>
    </Container>
  );
};

export default CreateAppointment;
