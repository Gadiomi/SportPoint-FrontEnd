import React from 'react';
import { useTheme } from 'styled-components';
import { useLocation } from 'react-router-dom'; 
import TitleContainer from '../TitleContainer/TitleContainer';
import ButtonGetInTouch from '../ButtonGetInTouch/ButtonGetInTouch'
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
  const theme = useTheme();
  const location = useLocation();

  const isCoachOrClubAccount =
    location.pathname.includes('/account-trainer/') ||
    location.pathname.includes('/account-admin-club/');

  if (!socialLinks || socialLinks.length === 0) {
    return <div>Соціальні мережі не доступні</div>;
  }
  return (
    <StyledSocialLinksCard>
      <TitleContainer titleKey="details_page.contacts_text" />
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
                  style={{
                    width: `${theme.pxs.x8}px`,
                    height: `${theme.pxs.x8}px`,
                  }}
                  src={iconSrc}
                  alt={`${link.name} Icon`}
                />
              </a>
            )
          );
        })}
      </ImgContainer>
      {!isCoachOrClubAccount && <ButtonGetInTouch />}
    </StyledSocialLinksCard>
  );
};

export default SocialLinks;
