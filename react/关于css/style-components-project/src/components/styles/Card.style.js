import styled from 'styled-components';

export const StyledCard = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  margin: 40px 0;
  padding: 60px;
  /* 在这里你想是先一个偶数就是reverse的效果*/
  /* flex-direction: ${({ layout }) => (layout ? 'row-reverse' : 'row')}; */
  /* 两种写法 任选其一*/
  flex-direction: ${({ layout }) => layout || 'row'};
  img {
    width: 80%;
  }
  & > div {
    flex: 1;
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
  }
`;
