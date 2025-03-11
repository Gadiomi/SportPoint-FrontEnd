import React, { useState } from 'react';
import styled from 'styled-components';

interface TabsProps {
  renderTabs: (
    handleTabClick: (index: number) => void,
    activeTab: number,
  ) => React.ReactNode;
  renderContent: (activeTab: number) => React.ReactNode;
}

export function Tabs({ renderTabs, renderContent }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <TabsContainer>
      <TabsHeader>{renderTabs(handleTabClick, activeTab)}</TabsHeader>
      <TabsContent>{renderContent(activeTab)}</TabsContent>
    </TabsContainer>
  );
}

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TabsHeader = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 12px;
`;

const TabsContent = styled.div`
  padding: 12px 12px 20px 12px;
  font-size: 12px;
  color: #b7b7b9;
`;
