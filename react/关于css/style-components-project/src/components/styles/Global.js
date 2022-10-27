import { createGlobalStyle } from 'styled-components';

// 把你想全局设置的就放在这里
const GlobalStyles = createGlobalStyle`

    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background: ${({ theme }) => theme.colors.body};
        color:hsl(192,100%,9%);
        font-family: 'Poppins', sans-serif;
        font-size:1.15em;
    }

    p {
       opacity: 0.6;
       line-height: 1.5;
    }

    img {
        max-width: 100%;
    }
`;

export default GlobalStyles;
