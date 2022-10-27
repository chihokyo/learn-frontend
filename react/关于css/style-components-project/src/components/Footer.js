import React, { memo } from 'react';
import SocialIcons from './SocialIcons';
import { Container } from './styles/Container.style';
import { Flex } from './styles/Flex.style';
import { StyledFooter } from './styles/Footer.style';

const Footer = memo(() => {
  return (
    <StyledFooter>
      <Container>
        <img src="./images/logo_white.svg" alt="logo_white" />

        <Flex>
          <ul>
            <li>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis
              odio delectus nostrum sunt
            </li>
            <li>+1828-2u2</li>
            <li>chi@gmail.com</li>
          </ul>
          <ul>
            <li>About Us</li>
            <li>What We Do</li>
            <li>FAQ</li>
          </ul>
          <ul>
            <li>Career</li>
            <li>Blog</li>
            <li>Contant Us</li>
          </ul>

          {/* Social Icons */}
          <SocialIcons />
        </Flex>

        <p>&copy; 2022 Chin All rights reserved</p>
      </Container>
    </StyledFooter>
  );
});

export default Footer;
