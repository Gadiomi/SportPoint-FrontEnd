import React from 'react';
import TitleContainer from '../TitleContainer/TitleContainer';
import { StyledSocialLinksCard, ImgContainer } from './styles';

const socialIconsMap: Record<string, string> = {
  facebook: '/assets/images/icon_facebook.png',
  instagram: '/assets/images/icon_instagram.png',
  messenger: '/assets/images/icon_messenger.png',
  tiktok: '/assets/images/icon_tik_tok.png',
};

interface SocialLink {
  name: string;
  url: string;
}

const SocialLinks: React.FC<{ socialLinks: SocialLink[] }> = ({
  socialLinks,
}) => {
  if (!socialLinks || socialLinks.length === 0) {
    return <div>Соціальні мережі не доступні</div>;
  }
  return (
    <StyledSocialLinksCard>
      <TitleContainer titleKey="details_page.contacts_text" />{' '}
      <ImgContainer>
        {socialLinks.map(link => {
          const iconSrc = socialIconsMap[link.name.toLowerCase()];

          return (
            iconSrc && (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  style={{ width: 32, height: 32 }}
                  src={iconSrc}
                  alt={`${link.name} Icon`}
                />
              </a>
            )
          );
        })}
      </ImgContainer>
    </StyledSocialLinksCard>
  );
};

export default SocialLinks;
