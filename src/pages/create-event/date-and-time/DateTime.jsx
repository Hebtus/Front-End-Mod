import styles from "./DateTime.module.css";
import Panel from "../../../layouts/UI/Panel";
import { DateandTimeIcon } from "../../../layouts/UI/SvgImages";
import HorizontalFlex from "../../../layouts/UI/HorizontalFlex";
import PanelChanger from "../../../layouts/UI/PanelChanger";
import CheckboxField from "../fields/CheckboxField";
import DatalistField from "../fields/DatalistField";
import LabeledDropdown from "../fields/LabeledDropdown";
import BasicDatePicker from "../fields/BasicDatePicker";
import { useState, useEffect } from "react";
import { TimeSlots, Languages, TimeZones } from  "../Data";
import dayjs from 'dayjs';

/**
 * Component for the Date and Time of the event creation pages
 * 
 * @component
 * @param {Object} props
 * @param {string} props.width  - Determine the width of the 
 * @param {string} props.onCLick - Triggerd when the user click on the button (save and continue)
 * @name DateTime

 * @example
 * if (endDate - startDate < 0){
 * props.onChange(startDate.toUTCString(),endDate.toUTCString(),true);
 * setDateError(true);
 * } 
 * else {
 * props.onChange(startDate.toUTCString(),endDate.toUTCString(),false);
 * setDateError(false)    
 * }
 */

export const PM_24hoursConvert = (time) => {
  let hours = time.slice(0, 2);
  if (hours[1] == ":") hours = hours[0];
  let PM_AM = time.slice(-2, time.length);
  if (PM_AM == "PM" && hours != 12) {
    hours = parseInt(hours) + 12;
  } else if (PM_AM == "AM" && hours == 12) {
    hours = "00";
  } else if (PM_AM == "AM") {
    if (hours.length == 1) hours = "0" + hours;
  }

  let minutes = time.slice(time.indexOf(":") + 1);
  minutes = minutes.slice(0, 2);

  return [hours, minutes];
};

const DateTime = (props) => {
  let [startDate, setStartDate] = useState(new Date());
  let [endDate, setEndDate] = useState(new Date());
  let [startHour, setStartHour] = useState("9");
  let [startMinute, setStartMinute] = useState("0");
  let [endHour, setEndHour] = useState("9");
  let [endMinute, setEndMinute] = useState("00");
  let [dateError, setDateError] = useState(false);

  useEffect(() => {
    props.onChange(startDate.toUTCString(),endDate.toUTCString(),dateError);
  }, []);

  const onStartDateChangeHandler = (date) => {
    startDate = date.$d;
    startDate.setUTCHours(startHour);
    startDate.setUTCMinutes(startMinute);
    startDate.setSeconds(0);
    setStartDate(startDate);

    if (endDate - startDate < 0) {
      props.onChange(startDate.toUTCString(),endDate.toUTCString(),true);

      setDateError(true);
    }
    else{
      props.onChange(startDate.toUTCString(),endDate.toUTCString(),false);

      setDateError(false);
    } 

  };

  const onEndDateChangeHandler = (date) => {
    endDate = date.$d;
    endDate.setUTCHours(endHour);
    endDate.setUTCMinutes(endMinute);
    endDate.setSeconds(0);
    setEndDate(endDate);
    console.log(endDate-startDate);
    if (endDate - startDate < 0){
      props.onChange(startDate.toUTCString(),endDate.toUTCString(),true);
      setDateError(true);
    } 
    else {
      props.onChange(startDate.toUTCString(),endDate.toUTCString(),false);
      setDateError(false)    
    }
  };

  const onStartTimeChangeHandler = (e) => {
    let time = PM_24hoursConvert(e.target.textContent);
    setStartHour(time[0]);
    setStartMinute(time[1]);
    startDate.setUTCHours(time[0]);
    startDate.setUTCMinutes(time[1]);
    startDate.setSeconds(0);
    setStartDate(startDate);
    if (endDate - startDate < 0){
      props.onChange(startDate.toUTCString(),endDate.toUTCString(),true);
      setDateError(true);
    } 
    else {
      props.onChange(startDate.toUTCString(),endDate.toUTCString(),false);
      setDateError(false)    
    }

  };

  const onEndTimeChangeHandler = (e) => {
    let time = PM_24hoursConvert(e.target.textContent);
    setEndHour(time[0]);
    setEndMinute(time[1]);
    endDate.setUTCHours(time[0]);
    endDate.setUTCMinutes(time[1]);
    endDate.setSeconds(0);
    setEndDate(endDate);
    if (endDate - startDate < 0){
      props.onChange(startDate.toUTCString(),endDate.toUTCString(),true);
      setDateError(true);
    } 
    else {
      props.onChange(startDate.toUTCString(),endDate.toUTCString(),false);
      setDateError(false)    
    }

  };

  const onDisplayStartTimeHandler = (e) => {
  };

  const onTimeZoneChangeHandler = (e) => {
  };

  const onEventLangChangeHandler = (e) => {
  };

  const onDisplayEndTimeHandler = (e) => {
  };


  return (
    <Panel
      image={DateandTimeIcon}
      title="Date and Time"
      description="Tell event-goers when your event starts and ends so they can make plans to attend."
      style={{ width: props.width }}
      id="date-time-panel"

    >
      <PanelChanger className="panel-changer-clicked" id="single-event-panel">
        Single Event
      </PanelChanger>
      <p>Single event happens once and can last multiple days.</p>

      <HorizontalFlex width="100%" id="start-date-time-flex">
        <BasicDatePicker
          title="Start Date *"
          width="100%"
          required={1}
          onChange={onStartDateChangeHandler}
          error={dateError}
          id="start-date"
          value={dayjs(new Date())}
        />
        <DatalistField
          options={TimeSlots}
          onChange={onStartTimeChangeHandler}
          title="Start Time"
          defaultValue="7:00 PM"
          id="start-time"
        />
  
      </HorizontalFlex>

      <HorizontalFlex width="100%" id="end-date-time-flex">
        <BasicDatePicker
          title="End Date *"
          width="100%"
          required={1}
          onChange={onEndDateChangeHandler}
          error={dateError}
          minDate={startDate}
          value={startDate}
          id="end-date"
        />
        <DatalistField
          options={TimeSlots}
          onChange={onEndTimeChangeHandler}
          title="End Time"
          defaultValue="10:00 PM"
          id="end-time"
        />
      
      </HorizontalFlex>

      <br />
      <LabeledDropdown options={TimeZones} title="Time Zone" width="50%"
       id="time-zone"
       />
      <LabeledDropdown
        options={Languages}
        title="Event Page Language"
        width="50%"
        id="event-page-lang"
      />

    </Panel>
  );
};

export default DateTime;
