import React, { useState } from "react";
import "./ScheduleCalendar.styles.css";

import leftArrowIcon from "./assets/left_arrow.svg";
import rightArrowIcon from "./assets/right_arrow.svg";

import { generateDateItems, generateTimeItems } from "./utils";

const ScheduleCalendar = ({
  daysToView = 10,
  timeInterval = {
    min: { hours: 8, minutes: 0 },
    max: { hours: 15, minutes: 0 },
    period: { hours: 2, minutes: 15 },
    count: 10,
  },
  onChange,
  customizeTimeItem
}) => {
  const [_pageIndex, setPageIndex] = useState(0);

  const dateItems = generateDateItems(_pageIndex, daysToView);
  const timeItems = generateTimeItems(timeInterval);
  console.log(timeItems);

  const handleNextPageClick = () => {
    setPageIndex((pageIndex) => pageIndex + 1);
  };

  const handleBackPageClick = () => {
    setPageIndex((pageIndex) => pageIndex - 1);
  };

  const handleTimeClick = (dateTime) => {
    onChange && onChange(dateTime);
  };

  return (
    <div className="schedule-calendar schedule-calendar__container">
      <div className="schedule-calendar__dates__container">
        <img
          className="schedule-calendar__left-arrow__icon"
          src={leftArrowIcon}
          onClick={handleBackPageClick}
          alt=""
        />
        <div
          className="schedule-calendar__date-items__list__container"
          style={{
            gridTemplateColumns: `repeat(${daysToView}, minmax(60px, 80px))`,
          }}
        >
          {dateItems.map((dateItem) => (
            <SheduleCalendarDayItem
              {...dateItem}
              timeItems={timeItems}
              onTimeClick={handleTimeClick}
              customizeTimeItem={customizeTimeItem}
            />
          ))}
        </div>

        <img
          className="schedule-calendar__right-arrow__icon"
          src={rightArrowIcon}
          onClick={handleNextPageClick}
          alt=""
        />
      </div>
    </div>
  );
};

const SheduleCalendarDayItem = ({
  dayLabel = "",
  dateLabel = "",
  date,
  timeItems,
  onTimeClick,
  customizeTimeItem
}) => {
  const customTimeItems = timeItems?.map((timeItem) => {
    const dateTime = new Date(date);
    dateTime.setHours(timeItem.hours);
    dateTime.setMinutes(timeItem.minutes);
    timeItem = { ...timeItem, dateTime }
    let customizedDateTime = customizeTimeItem ? customizeTimeItem(timeItem) : timeItem
  
    return customizedDateTime;
  });

  const handleTimeClick = (dateTime) => {
    onTimeClick && onTimeClick(dateTime);
  };

  return (
    <div className="schedule-calendar__date-item__container">
      <div className="schedule-calendar__date-item">
        <p className="day-name__label">{dayLabel}</p>
        <p className="date__label">{dateLabel}</p>
      </div>

      <div className="schedule-calendar__time-items__list__container">
        {customTimeItems.map((timeItem) => (
          <ScheduleCalendarTimeItem
            {...timeItem}
            onClick={() => handleTimeClick(timeItem.dateTime)}
          />
        ))}
      </div>
    </div>
  );
};

const ScheduleCalendarTimeItem = ({ timeLabel = "", disabled, onClick }) => {
  const handleClick = () => {
    onClick && onClick(timeLabel);
  };
  return (
    <div
      className={`schedule-calendar__time-item ${
        disabled ? "disabled" : "default"
      }`}
      onClick={handleClick}
    >
      <p className="time__label">{timeLabel}</p>
    </div>
  );
};

export default ScheduleCalendar;
