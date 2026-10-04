/** Use one path helper for both user Pages and /repository/ project Pages. */
export function url(path = '/') {
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

export const formatDate = (date: Date) => new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'long', timeZone: 'UTC',
}).format(date);
