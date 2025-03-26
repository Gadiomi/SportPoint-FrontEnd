import React from 'react';
import { SocialContainer, SocialLink } from './styles';

export const SocialCards: React.FC = () => {
  return (
    <SocialContainer>
      <SocialLink
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/assets/images/icon_instagram.png" alt="Instagram" />
      </SocialLink>
      <SocialLink
        href="https://www.tiktok.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/public/assets/images/icon_tik_tok.png" alt="Tik_tok" />
      </SocialLink>
      <SocialLink
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/assets/images/icon_facebook.png" alt="Facebook" />
      </SocialLink>
      <SocialLink
        href="https://www.twitter.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/public/assets/images/icon_x.png" alt="Twitter" />
      </SocialLink>
    </SocialContainer>
  );
};
