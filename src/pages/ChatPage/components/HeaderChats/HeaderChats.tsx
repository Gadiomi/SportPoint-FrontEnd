import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BoxButtons, BoxHeaderChats, WhoButton } from './styles';
import { Icon, IconName, Input } from '@/kit';
import { CustomLabel } from '@/components/NavBar/SearchModal/styles';
import { useTheme } from 'styled-components';
import { SettingModal } from '../SettingModal/SettingModal';
import { Section } from '@/components/ContainerAndSection';
import { HeaderTop } from './HeaderTop';

interface HeaderChatProps {
  setIsChangeActive: React.Dispatch<React.SetStateAction<boolean>>;
  isChangeActive: boolean;
  activeTab: 'all' | 'coach' | 'club';
  setActiveTab: React.Dispatch<React.SetStateAction<'all' | 'coach' | 'club'>>;
}

export const HeaderChats: FC<HeaderChatProps> = ({
  setIsChangeActive,
  activeTab,
  isChangeActive,
  setActiveTab,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { t } = useTranslation();

  const theme = useTheme();
  const [search, setSearch] = useState('');
  const handleSearch = () => {
    console.log('GoSearchChat');
  };

  return (
    <Section
      styles={{
        backgroundColor: theme.color.inputBar,
        paddingBottom: '0px',
        borderBottom: `1px solid ${theme.color.mainBlue}`,
      }}
    >
      <BoxHeaderChats>
        <HeaderTop
          isChangeActive={isChangeActive}
          setIsChangeActive={setIsChangeActive}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        <Input
          testId="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') handleSearch();
          }}
          label={
            <CustomLabel>
              <Icon name={IconName.SEARCH} size={24} />
              {t('nav_bar.search')}
            </CustomLabel>
          }
          containerStyles={{
            borderColor: theme.color.white,
            color: theme.color.white,
            backgroundColor: theme.color.background,
            borderRadius: theme.pxs.x2,
          }}
          inputStyles={{
            color: theme.color.white,
            paddingTop: theme.pxs.x2_5,
            paddingBottom: theme.pxs.x2_5,
          }}
          labelStyles={{
            backgroundColor: 'transparent',
            color: theme.color.disabled,
          }}
        />
        <BoxButtons>
          <WhoButton
            $isActive={activeTab === 'all'}
            onClick={() => setActiveTab('all')}
          >
            {t('chat_page.allChats')}
          </WhoButton>
          <WhoButton
            $isActive={activeTab === 'coach'}
            onClick={() => setActiveTab('coach')}
          >
            {t('chat_page.fromCoach')}
          </WhoButton>
          <WhoButton
            $isActive={activeTab === 'club'}
            onClick={() => setActiveTab('club')}
          >
            {t('chat_page.fromClub')}
          </WhoButton>
        </BoxButtons>
      </BoxHeaderChats>
      <SettingModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </Section>
  );
};
