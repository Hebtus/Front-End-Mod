import { fetchData } from "../../utils/api";

export async function getEvent(eventId) {
    // TODO: Validate eventId
    let res = await fetchData(`/events/${eventId}`, true);
    if (!res || res.status === "fail") {
        return null;
    }
    let event = res.data;
    console.log(event);
    event.startHour = new Date(event.startDate).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    event.startDay = new Date(event.startDate).toLocaleString('en-US', { day: 'numeric' });
    event.endHour = new Date(event.endDate).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    event.startDate = new Date(event.startDate).toLocaleDateString('en-US');
    event.endDate = new Date(event.endDate).toLocaleDateString('en-US');
    event.startMonthInWords = new Date(event.startDate).toLocaleString('en-US', { month: 'long' });
    event.year = new Date(event.startDate).getFullYear();

    event.ticketPriceRange = await getTicketPriceRange(eventId);
    return event;
}

async function getTicketPriceRange(eventId) {
    // TODO: Validate eventId
    let res = await fetchData(`/events/${eventId}/tickets/`, true);
    if (!res || res.status === "fail") {
        return null;
    }
    if (res.data.ticket.length === 0) {
        return null;
    }
    if (res.data.ticket.length === 1) {
        let isFree = !res.data.ticket[0].price || res.data.ticket[0].price === 0;
        if (isFree) {
            return "Free";
        }
        return "£" + res.data.ticket[0].price;
    }
    let min = res.data.ticket[0].price;
    let max = res.data.ticket[0].price;
    res.data.ticket.forEach((ticket) => {
        if (ticket.price < min) {
            min = ticket.price;
        }
        if (ticket.price > max) {
            max = ticket.price;
        }
    })
    return "£" + min + " - £" + max;
}