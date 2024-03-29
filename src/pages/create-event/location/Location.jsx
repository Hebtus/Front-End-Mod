import styles from "./Location.module.css";
import Panel from "../../../layouts/UI/Panel";
import { LocationIcon } from "../../../layouts/UI/SvgImages";
import HorizontalFlex from "../../../layouts/UI/HorizontalFlex";
import PanelChanger from "../../../layouts/UI/PanelChanger";
import { useState } from "react";

/**
 * Component for the Location of the event creation pages
 * 
 * @component
 * @param {Object} props
 * @param {string} props.width  - Determine the width of the 
 * @param {string} props.onCLick - Triggerd when the user click on the button (save and continue)
 * @name Location

 * @example
 * <Panel
 * image={LocationIcon}
 * title="Location"
 * description="Help people in the area discover your event and let attendees know where to show up."
 * style={{ width: props.width }}>
 */
const Location = (props) => {

  const [choosenPanel, setChoosenPanel] = useState(1);
  const panelChangeHandler = (index) => {
    setChoosenPanel(index)
    
  }
  return (
    <Panel
      image={LocationIcon}
      title="Location"
      description="Help people in the area discover your event and let attendees know where to show up."
      style={{ width: props.width }}

    >
      <HorizontalFlex width="68%" id="location-panel-changers">
        <PanelChanger onClick={()=>panelChangeHandler(1)} className={(choosenPanel==1) && "panel-changer-clicked"} id="venue-panel-changer">Venue</PanelChanger>
        <PanelChanger onClick={()=>panelChangeHandler(2)}  className={(choosenPanel==2) && "panel-changer-clicked"} id="online-panel-changer">Online Event</PanelChanger>
        <PanelChanger onClick={()=>panelChangeHandler(3)}  className={(choosenPanel==3) && "panel-changer-clicked"} id="to-be-announced-panel-changer">To be announced</PanelChanger>
      </HorizontalFlex>
      {(choosenPanel==1)}
      {(choosenPanel==2) && <p>Online events have unique event pages where you can add links to livestreams and more.</p>}
    </Panel>
  );
};

export default Location;
