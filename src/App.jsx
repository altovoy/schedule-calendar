import './App.css';
import ScheduleCalendar from "./components/ScheduleCalendar/ScheduleCalendar"

function App() {

  const disabledDates = [1655654400000, 1655738100000, 1655748900000];

  return (
    <div className="App">
      <ScheduleCalendar
        onChange={(dateTime) => console.log(dateTime.getTime())}
        customizeTimeItem={(timeItem) => ({
          ...timeItem,
          disabled: disabledDates.includes(timeItem.dateTime.getTime()),
        })}
        daysToView ={5}
        timeInterval={{
          min: { hours: 10, minutes: 15 },
          max: { hours: 13, minutes: 15 },
          period: { hours: 2, minutes: 15 },
          count: 5,
        }}
      />
    </div>
  );
}

export default App;
