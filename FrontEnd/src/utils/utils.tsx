import dayjs from "dayjs";

export const capitalize = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export const formatDate = (date: Date) => {
    const newDate = new Date(date);
    return newDate.toUTCString().split(' ').slice(1,4).join(' ')
}