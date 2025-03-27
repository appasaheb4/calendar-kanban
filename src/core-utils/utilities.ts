import {events} from '../core-services/event.service';

export const getDateToString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`; // Return in YYYY-MM-DD format
};

export const formatDateToKey = (date: string): string => {
  const parsedDate = new Date(date); // Parse the input date string
  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(parsedDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`; // Return in YYYY-MM-DD format
};

export const getServiceData = (date: string) => {
  return events[date] || [];
};
