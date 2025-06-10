export const formatDate = (
  createdAt?: string,
  updatedAt?: string,
  locale: string = 'en-US',
): string => {
  const dateStr = createdAt ?? updatedAt;
  if (!dateStr) return '';

  const date = new Date(dateStr);
  return date.toLocaleDateString(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};
