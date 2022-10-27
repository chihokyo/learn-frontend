import styled from 'styled-components';

export const Button = styled.button`
  border-radius: 50px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 15px 60px;
  margin: 15px 0;
  /* 这里就用了theme里的变量和解构赋值 */
  background-color: ${({ bg }) => bg || '#fff'};
  color: ${({ color }) => color || '#333'};
  transition: all 0.3s;
  &:hover {
    opacity: 0.9;
    transform: scale(0.98);
  }
`;
