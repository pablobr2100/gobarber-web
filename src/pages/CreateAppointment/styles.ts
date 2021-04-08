import styled from 'styled-components';
import { shade } from 'polished';

interface IHourProps {
  available: boolean;
  selected: boolean;
}

export const Container = styled.form``;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > img {
    height: 80px;
  }

  svg {
    color: #999591;
    width: 25px;
    height: 25px;

    &:hover {
      opacity: 0.7;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
  flex-direction: column;
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: #ff9000;
    display: flex;
    align-items: center;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: #ff9000;
      margin: 0 8px;
    }
  }
`;

export const ProviderProfile = styled.div`
  margin-top: 25px;
  margin-bottom: 25px;

  img {
    width: 72px;
    height: 72px;
    border-radius: 50%;
  }

  p {
    margin-top: 8px;
    color: #fff;
    font-size: 20px;
  }
`;

export const ContentDate = styled.div`
  display: flex;
  padding: 24px 0 16px;
  justify-content: space-between;

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

export const Calendar = styled.aside`
  width: 380px;

  .DayPicker {
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
    background: #3e3b47;
    border-radius: 10px;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-NavButton {
    color: #999591 !important;
  }

  .DayPicker-NavButton--prev {
    right: auto;
    left: 1.5em;
    margin-right: 0;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px 0 0 0;
    padding: 16px;
    background-color: #28262e;
    border-radius: 0 0 10px 10px;
  }

  .DayPicker-Caption {
    margin-bottom: 1em;
    padding: 0 1em;
    color: #f4ede8;

    > div {
      text-align: center;
    }
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;

export const ContentHour = styled.div`
  > div {
    display: flex;
    height: 360px;
    flex-direction: column;
    justify-content: center;
  }
`;

export const Section = styled.div`
  margin-bottom: 24px;

  h1 {
    font-size: 18px;
    color: #999591;
    margin: 0 24px 12px;
  }
`;

export const SectionContent = styled.div`
  display: flex;
`;

export const Hour = styled.button<IHourProps>`
  padding: 12px;
  background: ${props => (props.selected ? '#ff9000' : '#3e3b47')};
  border-radius: 10px;
  margin-right: 8px;
  border: 0;

  opacity: ${props => (props.available ? 1 : 0.3)};

  p {
    color: ${props => (props.selected ? '#232129' : '#f4ede8')};
    font-size: 16px;
  }
`;

export const CreateAppointmentButton = styled.button`
  background: #ff9000;
  height: 56px;
  border-radius: 10px;
  align-self: center;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  width: 50%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;
