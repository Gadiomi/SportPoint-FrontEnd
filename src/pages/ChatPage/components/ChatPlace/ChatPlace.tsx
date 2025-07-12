import { Icon, IconName } from '@/kit';
import { Header } from './Header/Header';
import {
  ChatWrapper,
  FileInputWrapper,
  HiddenInput,
  ImagePreview,
  InputWrapper,
  MessageItem,
  MessageItemBox,
  MessagesList,
  SendButton,
  StyledInput,
} from './styles';
import React, { useState } from 'react';

const ChatPlace = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Привіт!', isOwn: false },
    { id: 2, text: 'Привіт! Як справи?', isOwn: true },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const sendMessage = () => {
    if (!inputValue.trim() && !selectedFile) return;

    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        text: inputValue || '[Image]',
        isOwn: true,
        image: imagePreview || undefined,
      },
    ]);
    setInputValue('');
    setImagePreview(null);
    setSelectedFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ChatWrapper>
      <Header />
      <MessagesList>
        {messages.map(msg => (
          <MessageItemBox key={msg.id} $own={msg.isOwn}>
            <MessageItem $own={msg.isOwn}>{msg.text}</MessageItem>
          </MessageItemBox>
        ))}
      </MessagesList>

      {imagePreview && (
        <ImagePreview>
          <img src={imagePreview} alt="Preview" />
        </ImagePreview>
      )}
      <InputWrapper>
        <FileInputWrapper>
          <Icon name={IconName.PAPERCLIP} size={24} />
          <HiddenInput type="file" onChange={handleFileChange} />
        </FileInputWrapper>

        <StyledInput
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Повідомлення"
        />
        <SendButton onClick={sendMessage}>
          <Icon name={IconName.Icon_send_01} />
        </SendButton>
      </InputWrapper>
    </ChatWrapper>
  );
};

export default ChatPlace;
