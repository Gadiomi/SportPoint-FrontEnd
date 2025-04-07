import React, { FC, useState, useEffect } from 'react';
import { Label } from '../Selection/Selection.styled';
import {
  TextArea,
  TextAreaContainer,
  TextAreaSymbol,
} from './EditTextArea.styled';
import { useFormContext } from 'react-hook-form';

interface EditTextAreaProps {
  about: string | undefined;
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  text: string;
  setText: (text: string) => void;
}

const EditTextArea: FC<EditTextAreaProps> = ({
  about,
  handleTextChange,
  text,
  setText,
}) => {
  const { register, setValue } = useFormContext();
  const maxLength = 850;

  useEffect(() => {
    if (about !== undefined) {
      setText(about);
    }
  }, [about]);

  return (
    <div>
      <TextAreaContainer>
        <Label htmlFor="about">Коротко про себе</Label>
        <TextArea
          cols={30}
          rows={10}
          id="about"
          placeholder="Опишіть себе"
          title="Тут ви можете написати короткий опис про себе"
          value={text}
          onChange={handleTextChange}
        />
      </TextAreaContainer>
      <TextAreaSymbol>
        <span>
          {text?.length || 0} / {maxLength} символів
        </span>
      </TextAreaSymbol>
    </div>
  );
};

export default EditTextArea;
