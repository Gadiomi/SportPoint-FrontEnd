import React from 'react';
import styled from 'styled-components';

import { RadioAppearance } from './constants';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  appearance?: RadioAppearance;
}

export const customRadioButton: React.FC<RadioProps> = ({
  label,
  appearance = RadioAppearance.DEFAULT,
  ...props
}) => {
  return (
    <Label>
      <HiddenRadio type="radio" {...props} />
      <CustomRadio appearance={appearance} />
      {label}
    </Label>
  );
};

// Прихований стандартний input
const HiddenRadio = styled.input`
  display: none;
`;

// Кастомна радіо-кнопка (в them потрібно додати кольори)
const CustomRadio = styled.span<{ appearance: RadioAppearance }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
  border: 2px solid
    ${({ appearance, theme }) =>
      appearance === RadioAppearance.PRIMARY
        ? theme.color.inputBar
        : appearance === RadioAppearance.SECONDARY
          ? theme.color.mainOrange
          : theme.color.secWhite};

  position: relative;
  cursor: pointer;

  &:after {
    content: '';
    width: 12px;
    height: 12px;
    background: ${({ appearance, theme }) =>
      appearance === RadioAppearance.PRIMARY
        ? theme.color.inputBar
        : appearance === RadioAppearance.SECONDARY
          ? theme.color.mainOrange
          : theme.color.secWhite};
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }
`;

// Обгортка для радіо-кнопки и тексту
const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;

  input:checked + span {
    &:after {
      opacity: 1;
    }
  }
`;

// export const App = () => {
//   const [selected, setSelected] = useState<string>('option1');

//   return (
//     <div>
//       <customRadioButton
//         label="Опція 1"
//         name="radioGroup"
//         appearance={RadioAppearance.PRIMARY}
//         checked={selected === 'option1'}
//         onChange={() => setSelected('option1')}
//       />

//       <customRadioButton
//         label="Опція 2"
//         name="radioGroup"
//         appearance={RadioAppearance.SECONDARY}
//         checked={selected === 'option2'}
//         onChange={() => setSelected('option2')}
//       />
//     </div>
//   );
// };
