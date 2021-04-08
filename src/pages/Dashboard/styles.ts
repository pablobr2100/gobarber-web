import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;

      &:hover {
        opacity: 0.7;
      }
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    a {
      text-decoration: none;
      color: #ff9000;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
  flex-direction: column;
`;

export const Section = styled.section`
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  button:nth-child(even) {
    align-self: flex-end;
  }
`;

export const Provider = styled.button`
  display: flex;
  flex: 1;
  width: 60%;
  height: auto;
  align-items: center;
  padding: 16px 24px;
  border-radius: 10px;
  background: #3e3b47;

  & + button {
    margin-top: 16px;
  }

  img {
    width: 72px;
    height: 72px;
    border-radius: 50%;
  }

  div {
    display: flex;
    align-items: center;
    margin-left: auto;

    strong {
      margin-left: auto;
      color: #f4ede8;
      font-size: 20px;
    }

    span {
      margin-left: 24px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      color: #999591;

      svg {
        color: #ff9000;
        margin-right: 8px;
      }
    }
  }
`;
