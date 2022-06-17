const weekdays = ["dom", "lun", "mar", "mier", "jue", "vier", "sab"];
const months = [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic",
];

const addDays = (date, days) => {
    const dateCopy = new Date(date);
    dateCopy.setDate(date.getDate() + days);
    return dateCopy;
};

export const generateDateItems = (pageIndex, daysToView) => {
    const dateItems = [];
    const currentDate = new Date();
    currentDate.setHours(0)
    currentDate.setMinutes(0)
    currentDate.setSeconds(0)
    currentDate.setMilliseconds(0)
    const baseDate = addDays(currentDate, pageIndex * daysToView);
    for (let dayIndex = 0; dayIndex < daysToView; dayIndex++) {
        const date = addDays(baseDate, dayIndex);
        const dayLabel = weekdays[date.getDay()];
        const monthName = months[date.getMonth()];
        const dateLabel = `${monthName} ${date.getDate()}`;

        dateItems.push({
            dayLabel,
            dateLabel,
            date,
        });
    }
    return dateItems;
};

export const generateTimeItems = ({ min, max, period, count }) => {
    let timeItems = [{...min, timeLabel: timeToMidTimeFormat(min) }];
    if (count) {
        period = minutesToTime(timeMinutesDiff(min, max) / (count - 1))
    }
    let prevTime = min;
    let currentTimeIsLessThanMax = timeMinutesDiff(min, max) >= 0;
    while (currentTimeIsLessThanMax && count ? timeItems.length < count : true) {
        const currentTime = sumTimes(prevTime, period);
        currentTimeIsLessThanMax = timeMinutesDiff(currentTime, max) >= 0;
        if (!currentTimeIsLessThanMax) break;
        let timeLabel = timeToMidTimeFormat(currentTime);
        prevTime = {...currentTime, timeLabel };
        timeItems.push(prevTime);

    }
    return timeItems;
};

export const timeToMinutes = (time) => time.hours * 60 + time.minutes;

export const timeMinutesDiff = (timeOne, timeTwo) =>
    timeToMinutes(timeTwo) - timeToMinutes(timeOne);

export const timeToMidTimeFormat = ({ hours, minutes }) => {
    let hourLabel = hours > 12 ? hours - 12 : hours;
    const am_pm = hours >= 12 ? "p.m." : "a.m.";
    hourLabel = hourLabel < 10 ? "0" + hourLabel : hourLabel;
    hourLabel = `${hourLabel}:${minutes} ${am_pm}`;
    return hourLabel;
};

export const minutesOnInterval = (min, max) =>
    max.hours * 60 + max.minutes - (min.hours * 60 + min.minutes);

export const minutesToTime = (minutes) => {
    const aditionalHours = minutes / 60;
    let hours = Math.trunc(aditionalHours);
    let aditionalMinutes = Math.trunc((aditionalHours - hours) * 60);
    if (aditionalMinutes >= 60) {
        hours += 1;
        aditionalMinutes = 0;
    }
    return { hours, minutes: aditionalMinutes };
};

export const sumTimes = (timeOne, timeTwo) => {
    let hours = timeOne.hours + timeTwo.hours;
    let minutes = timeOne.minutes + timeTwo.minutes;
    const { hours: aditionalHours, minutes: aditionalMinutes } =
    minutesToTime(minutes);

    hours += aditionalHours;
    return { hours, minutes: aditionalMinutes };
};

export const addMinutesToTime = (time, minutes) => {
    const aditionalMinutes = time.minutes + minutes;
    const aditionalTime = minutesToTime(aditionalMinutes);
    const hours = time.hours + aditionalTime.hours;
    return { hours, minutes: aditionalTime.minutes };
};