import { useState } from 'react';
import { AllChats } from './components/AllChats/AllChats';
import { CoachChats } from './components/AllChats/CoachChats';
import { ClubChats } from './components/AllChats/ClubChats';
import { HeaderChats } from './components/HeaderChats/HeaderChats';

const ChatPage = () => {
  const [isChangeActive, setIsChangeActive] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'coach' | 'club'>('all');
  return (
    <>
      <HeaderChats
        setIsChangeActive={setIsChangeActive}
        isChangeActive={isChangeActive}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === 'all' && <AllChats isChangeActive={isChangeActive} />}
      {activeTab === 'coach' && <CoachChats isChangeActive={isChangeActive} />}
      {activeTab === 'club' && <ClubChats isChangeActive={isChangeActive} />}
    </>
  );
};

export default ChatPage;
