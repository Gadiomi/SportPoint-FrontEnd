import { Ref } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { RegisterFormData } from '@/types';

export type OptionType = {
  value: string;
  label: string;
};

export type CitySelectProps = {
  options: OptionType[];
  field: ControllerRenderProps<RegisterFormData>;
  // field: ControllerRenderProps<RegisterFormData, 'address'>;
  placeholder: string;
  onMenuOpen: () => void;
  onMenuClose: () => void;
};

export interface IGroupTitleProps {
  handler: () => void;
  isOpen: boolean;
  title: string;
}

export interface IAddressWidget extends IGroupTitleProps {
  height: string;
  contentRef: Ref<HTMLDivElement> | undefined;
  children: React.ReactNode;
}
