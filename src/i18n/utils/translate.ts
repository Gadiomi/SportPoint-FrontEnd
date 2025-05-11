import i18next, { TOptions } from 'i18next';

export const translate = (key: string, options?: TOptions) => {
  return (i18next as any).t(key, options as any);
};
