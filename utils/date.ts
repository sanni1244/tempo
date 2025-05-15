// utils/date.ts

// Importing the required Date-fns library functions
import { format, parseISO, differenceInDays } from 'date-fns';

// Function to format a date into a readable string
export const formatDate = (date: Date | string, dateFormat: string = 'PP'): string => {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return format(parsedDate, dateFormat);
};

// Function to calculate the difference in days between two dates
export const getDaysBetweenDates = (startDate: Date | string, endDate: Date | string): number => {
    const parsedStartDate = typeof startDate === 'string' ? parseISO(startDate) : startDate;
    const parsedEndDate = typeof endDate === 'string' ? parseISO(endDate) : endDate;
    return differenceInDays(parsedEndDate, parsedStartDate);
};

// Function to get today's date in a specific format
export const getToday = (dateFormat: string = 'PP'): string => {
    return format(new Date(), dateFormat);
};

// Function to add days to a given date
export const addDays = (date: Date | string, days: number): Date => {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return new Date(parsedDate.setDate(parsedDate.getDate() + days));
};
