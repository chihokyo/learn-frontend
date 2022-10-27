import React, { memo } from 'react';
import { ThemeProvider } from 'styled-components';
import Card from './components/Card';
import Footer from './components/Footer';
import Header from './components/Header';
import { Container } from './components/styles/Container.style';
import GlobalStyles from './components/styles/Global';
import content from './content';
// 这里就可以定义所有的主题颜色
const theme = {
  colors: {
    header: '#ebfbff',
    body: '#fff',
    footer: '#000333',
  },

  mobile: '769px',
};

const App = memo(() => {
  return (
    // 这里是主题样式 【主要写一些变量和共通的东西】
    <ThemeProvider theme={theme}>
      <>
        {/* 这里是全局样式 比如初始化的字体等等*/}
        {/* 这个Global为什么要写在theme下面 这样的话 global也能用变量了 */}
        <GlobalStyles />
        <Header />
        <Container>
          {content.map((item, index) => (
            <Card key={item.id} item={item} />
          ))}
        </Container>
        <Footer />
      </>
    </ThemeProvider>
  );
});

export default App;
