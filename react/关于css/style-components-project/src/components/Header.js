import React, { memo } from 'react';
import { Button } from './styles/Button.style';
import { Container } from './styles/Container.style';
import { Flex } from './styles/Flex.style';
import { StyleHeader, Nav, Logo, Image } from './styles/Header.style';

const Header = memo(() => {
  return (
    <StyleHeader>
      <Container>
        <Nav>
          <Logo src="./images/logo.svg" alt="logo" />
          <Button>Try it free</Button>
        </Nav>

        <Flex>
          <div>
            <h1>Bulid The community Your fans Will Love</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
              libero, dolorum officia quasi optio eligendi tenetur et provident
              aperiam iste quos s
            </p>
            <Button bg="#ff0099" color="#fff">
              Get start for free
            </Button>
          </div>
          <Image src="./images/illustration-mockups.svg" alt="illuu" />
        </Flex>
      </Container>
    </StyleHeader>
  );
});

export default Header;
