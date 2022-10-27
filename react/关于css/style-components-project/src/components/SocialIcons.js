import React, { memo } from 'react';
import { FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { StyleSoicalIcons } from './styles/SocialIcons.style';

const SocialIcons = memo(() => {
  return (
    <StyleSoicalIcons>
      <li>
        <a href="twitter.com">
          <FaTwitter />
        </a>
      </li>
      <li>
        <a href="facebook.com">
          <FaFacebook />
        </a>
      </li>
      <li>
        <a href="twitter.com">
          <FaLinkedin />
        </a>
      </li>
    </StyleSoicalIcons>
  );
});

export default SocialIcons;
