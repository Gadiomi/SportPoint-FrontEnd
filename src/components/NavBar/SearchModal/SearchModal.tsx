import { FC, useEffect, useState } from 'react';
import { MenuWrapper, Overlay } from '../MobileMenu/styles';
import { NavBox } from '../styles';
import {
  CustomLabel,
  History,
  HistoryBox,
  LabelHistory,
  ModalContent,
  NameHistory,
  Rubbish,
} from './styles';
import { Icon, IconName, Input } from '@/kit';
import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const savedHistory = JSON.parse(
      localStorage.getItem('search-history') || '[]',
    );
    setHistory(savedHistory);
  }, []);

  const handleSearch = () => {
    if (!search.trim()) return;

    const updatedHistory = [
      search,
      ...history.filter(item => item !== search),
    ].slice(0, 5);
    setHistory(updatedHistory);
    localStorage.setItem('search-history', JSON.stringify(updatedHistory));

    navigate(`/result?query=${search}`);
    setSearch('');
    onClose();
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('search-history');
  };

  const handleHistoryClick = (value: string) => {
    setSearch(value);
  };

  if (!isOpen) return null;

  return (
    <NavBox>
      <Overlay onClick={onClose} />
      <MenuWrapper $isOpen={isOpen}>
        <ModalContent onClick={e => e.stopPropagation()}>
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
            }}
            inputStyles={{ color: theme.color.white }}
            labelStyles={{ color: theme.color.white }}
          />

          <LabelHistory>
            <History>{t('nav_bar.history')}</History>
            <Rubbish onClick={clearHistory}>
              <Icon name={IconName.TRASH} size={24} />
            </Rubbish>
          </LabelHistory>

          <HistoryBox>
            {history.map((item, idx) => (
              <NameHistory key={idx} onClick={() => handleHistoryClick(item)}>
                {item}
              </NameHistory>
            ))}
          </HistoryBox>
        </ModalContent>
      </MenuWrapper>
    </NavBox>
  );
};

export default SearchModal;
