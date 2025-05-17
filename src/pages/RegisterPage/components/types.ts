import { Ref } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { RegisterFormData } from '@/types';

export type OptionType = {
  value: string;
  label: string;
};

export interface CitySelectProps {
  field: ControllerRenderProps<any, any>;
  options: {
    value: string;
    label: string;
    profile?: any;
  }[];
  placeholder: string;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  onChange?: (option: any) => void;
  onInputChange?: () => void;
}

export interface IGroupTitleProps {
  handler: () => void;
  isOpen: boolean;
  title: string;
}

export interface IAddressWidget extends IGroupTitleProps {
  height: string;
  contentRef: Ref<HTMLDivElement> | undefined;
  children: React.ReactNode;
  $marginBottom?: string;
}
