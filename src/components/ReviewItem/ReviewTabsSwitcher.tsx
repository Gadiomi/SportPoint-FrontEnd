import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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
        const value = tabLabel === 'Тренери' ? 'coach' : 'adminClub';
        return (
          <TabButton
            key={index}
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
