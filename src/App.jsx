
import LandingPage from "./pages/landing-page/LandingPage"
import EventDashboard from "./pages/event-dashboard/EventDashboard"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CategorizedEvents from "./pages/landing-page/events/CategorizedEvents";
import SignIn from "./pages/sign-in/SignIn"
import SignUpPage from "./pages/sign-up/SignUpPage"
import ForgotPasswordPage from "./pages/forgot-password/ForgotPasswordPage"
import ResetPassordPage from "./pages/reset-password/ResetPassword"
import EventListContainer from "./pages/event-list/EventListContainer"
import CreateEvent from "./pages/create-event/CreateEvent"
import GoogleFacebookToken from "./pages/google-facebook-token/GoogleFacebookToken"
import { PrivateOrPublicEvent } from "./pages/event-page/PrivateOrPublicEvent"
import UpdatePassword from "./pages/update-password/UpdatePassword"
import PublishEvent from "./pages/publish-event/PublishEvent"
import EventDetails from "./pages/event-details/EventDetails";
import BrowseEvents from "./pages/browse-events/BrowseEvents";
import ManageTickets from "./pages/manage-tickets/ManageTickets";

export default function App() {

  let eventId = "642fda172c9619b9850f7102";
  //  let selectedTickets = [{
  //   name: "Regular",
  //   price: 0,
  //   sales: 2,
  //   ticketId: "6439dabdb97119454f22e31f"
  // },
  // {
  //   name: "Gamed",
  //   price: 100,
  //   sales: 1,
  //   ticketId: "6453e3f00a1019f2f1346d55"
  // }
  // ]
  return (
    

    <BrowserRouter>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/event-dashboard/:eventId" element={<EventDashboard />} />
        <Route path="/events/:eventId" element={<PrivateOrPublicEvent />} />
        <Route path="/categorized/:filter/:longitude/:latitude" element={<CategorizedEvents/>} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPassordPage />} />
        <Route path="/events-list/" element={<EventListContainer />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/google-facebook-token/:token" element={<GoogleFacebookToken />} />
        <Route path="/update-password" element={<UpdatePassword/>} />
        <Route path="/event-details" element={<EventDetails/>} />
        <Route path="/publish-event" element={<PublishEvent/>} />
        <Route path="/browse-event" element={<BrowseEvents/>} />
        <Route path="/manage/events/:eventId/tickets" element={<ManageTickets />} />
        
        <Route path="*" element={<h1>Not Found</h1>} />



      </Routes>
    </BrowserRouter>

  )

}

