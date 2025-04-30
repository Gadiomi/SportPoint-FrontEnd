import React, { useState, useEffect } from 'react';
import { ButtonGroupTab, TabButton } from './styles';

interface TabsSwitcherProps {
  tabs: string[];
  selectedTab: 'coach' | 'adminClub';
  onSelectTab: (tab: 'coach' | 'adminClub') => void;
}

const ReviewTabsSwitcher: React.FC<TabsSwitcherProps> = ({
  tabs,
  selectedTab,
  onSelectTab,
}) => {
  return (
    <ButtonGroupTab>
      {tabs.map((tabLabel, index) => {
        const value = tabLabel === 'Клуби' ? 'adminClub' : 'coach';
        const position = index === 0 ? 'left' : 'right';
        return (
          <TabButton
            key={index}
            position={position}
            active={selectedTab === value}
            onClick={() => onSelectTab(value as 'coach' | 'adminClub')}
          >
            {tabLabel}
          </TabButton>
        );
      })}
    </ButtonGroupTab>
  );
};

export default ReviewTabsSwitcher;
