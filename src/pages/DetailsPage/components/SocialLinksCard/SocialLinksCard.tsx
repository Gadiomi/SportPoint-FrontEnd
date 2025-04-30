import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { useLocation } from 'react-router-dom';
import StyledHr from '../../../../components/StyledHr/StyledHr';
import TitleContainer from '../TitleContainer/TitleContainer';
import ButtonGetInTouch from '../ButtonGetInTouch/ButtonGetInTouch';
import ModalGetInTouch from '../ModalGetInTouch/ModalGetInTouch';
import ModalNotAnAuthorizedUser from '../ModalNotAnAuthorizedUser/ModalNotAnAuthorizedUser';
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

const SocialLinks: React.FC<{
  socialLinks: SocialLink[];
  title: string;
  isLogin: boolean;
}> = ({ socialLinks, title, isLogin }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const theme = useTheme();
  const location = useLocation();

  const showButtonGetInTouch = location.pathname.includes('/profile');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
            iconSrc &&
            (isLogin ? (
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
                    opacity: 1,
                    cursor: 'pointer',
                  }}
                  src={iconSrc}
                  alt={`${link.name} Icon`}
                />
              </a>
            ) : (
              <div
                key={link.name}
                style={{
                  width: `${theme.pxs.x8}px`,
                  height: `${theme.pxs.x8}px`,
                  opacity: 0.4,
                  cursor: 'not-allowed',
                }}
                title="Авторизуйтеся, щоб перейти за посиланням"
              >
                <img
                  src={iconSrc}
                  alt={`${link.name} Icon`}
                  style={{
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            ))
          );
        })}
      </ImgContainer>
      {!showButtonGetInTouch && <ButtonGetInTouch onClick={handleOpenModal} />}
      <StyledHr />
      {isLogin ? (
        <ModalGetInTouch
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={title}
        />
      ) : (
        <ModalNotAnAuthorizedUser
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={title}
        />
      )}
    </StyledSocialLinksCard>
  );
};

export default SocialLinks;
