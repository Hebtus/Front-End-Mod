import { React, useState, useEffect } from "react";
import "./events.css"
import "./events-mock-api"
import useFetch from "../useFetch";

const NAMESPACE = "https://hebtus.me/api/v1/events/";
// const NAMESPACE = "/api/v1/events/";

export default function Events(props) {
  const [events, setEvents] = useState([]);
  
  const url = () => {
    if (props.location.latitude && props.location.longitude) {
      if (props.activeTab === 'today' || props.activeTab === 'thisweekend') {
        let startDate = '';
        let endDate = '';
        const now = new Date();
        if (props.activeTab === 'today') {
          startDate = now.toISOString().slice(0, 10);
          endDate = startDate;
        }
        if (props.activeTab === 'thisweekend') {
          /* If the day is Friday(5) or Sat(6), set difference to 0,
          this means that we need to add 0 days until nearest weekend 
          Otherwise, we subtract the day of the week from 5 to get the number of days until Friday. 
          We then create two new Date objects, 
          one for the first day of the weekend and one for the last day of the weekend, 
          by adding the diff value to the current date and using new Date(). 
          We then format the dates to 'yyyy-mm-dd' format using toISOString() and slice(), 
          and assign them to startDate and endDate variables respectively.
          */
          const dayOfWeek = now.getDay();
          const diff = dayOfWeek === 5 ? 0 : dayOfWeek === 6 ? 0 : 5 - dayOfWeek;
          const firstDayOfWeekend = new Date(now.getFullYear(), now.getMonth(), now.getDate() + diff);
          const lastDayOfWeekend = new Date(now.getFullYear(), now.getMonth(), now.getDate() + diff + 1);
          startDate = firstDayOfWeekend.toISOString().slice(0, 10);
          if (dayOfWeek === 6) {
            endDate = startDate;
          } else {
            endDate = lastDayOfWeekend.toISOString().slice(0, 10);
          }
        }
        // return `${NAMESPACE}?startDate=${startDate}&endDate=${endDate}&location=${props.location.latitude},${props.location.longitude}`;
        return `${NAMESPACE}?startDate=${startDate}&endDate=${endDate}&location=31.2584644,30.0594885`;
      } else {
        // return `${NAMESPACE}?category=${props.activeTab}&location=${props.location.latitude},${props.location.longitude}`;
        return `${NAMESPACE}?category=${props.activeTab}&location=31.2584644,30.0594885`;
      }
    }
    return '';
  };

  const { data, eventsLoading, error } = useFetch(url());
  const initialLoadingMsg = <p className="events-loading-status">Loading...</p> 
  const [eventsLoadingMsg, setEventsLoadingMsg] = useState(initialLoadingMsg);
  useEffect(() => {
    if (data) {
      setEvents(data);
    }
  }, [data]);

  useEffect(() => {
    if (eventsLoading || props.location.loading) {
      setEventsLoadingMsg(initialLoadingMsg);
    }
    else if (!eventsLoading && !props.location.loading && events.length === 0){
      setEventsLoadingMsg(<p className="events-loading-status">
      No Events in {props.location.city}
    </p>)
    }      
    
  }, [eventsLoading, props.location.loading]);

  return (
    <div>
      { props.location.loading? eventsLoadingMsg : (  
      (!eventsLoading && events.length > 0) && (
        <div class="album py-5">
          <div class="container">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
              {events.map((event) => (
                <div class="col">
                  <div class="card event-card">
                    <img
                      src={event.img_url}
                      class="bd-placeholder-img card-img-top"
                      width="100%"
                      height="225"
                      aria-label="Placeholder: Thumbnail"
                      preserveAspectRatio="xMidYMid slice"
                      focusable="false"
                    />
                    <div class="card-body">
                      <h4 class="event-card--name">{event.eventName}</h4>
                      <h6 class="event-card--date">
                        {event.startTime.substring(0, event.startTime.indexOf(" "))}
                      </h6>
                      <h6>{event.locationName}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

}