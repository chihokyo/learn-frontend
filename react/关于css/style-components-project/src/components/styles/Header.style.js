import styled from 'styled-components';

export const StyleHeader = styled.header`
  /* background-color: ${(props) => props.bg};  写法1*/
  /* background-color: ${({ bg }) => bg}; 写法2 直接解构 */
  background-color: ${({ theme }) =>
    theme.colors.header}; /*这里其实不算是写法3 是从主题的概念 + 解构赋值写的 */
  padding: 40px 0;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
  }
`;

export const Logo = styled.img`
  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin-bottom: 40px;
  }
`;

export const Image = styled.img`
  width: 375px;
  margin-left: 40px;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin: 40px 0 30px;
  }
`;
