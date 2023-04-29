import {React,useState} from "react";
import Events from "./events/Events"
import NavBar from "../../layouts/navbar/NavBar"
import Categories from "./categories/Categories"
import SignedOutNavBar from "../../layouts/navbar/SignedOutNavBar";

export default function LandingPage() {
    const [activeTab, setActiveTab] = useState('');
    const [location, setLocation] = useState('');
    const [accessToken, setAccessToken]=useState(localStorage.getItem('user'))

    return (
        <div>
            {accessToken? <NavBar setAccessToken={setAccessToken}/> : <SignedOutNavBar setAccessToken={setAccessToken}/> }
            <Categories activeTab={activeTab} setActiveTab={setActiveTab} location={location} setLocation={setLocation}/>
            <Events activeTab={activeTab} location={location} />
        </div>
    )
}