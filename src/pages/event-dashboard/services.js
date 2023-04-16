import { fetchData } from "../../utils/api";

export async function getTicketTypes(eventId) {
    // TODO: Validate eventId
    let data = await fetchData(`/events/${eventId}/tickets/`);
    if (!data || data.status === "fail") {
        return [[]];
    }
    let ticketTypes = [];
    data.data.tickets.forEach((ticket) => {
        ticketTypes.push([ticket.type, ticket.price, `${ticket.currentReservations}/${ticket.capacity}`])
    })
    return ticketTypes;
}

export async function getBookings(eventId) {
    // TODO: Validate eventId
    let data = await fetchData(`/bookings/${eventId}`);
    if (!data || data.status === "fail") {
        return [[]];
    }
    let bookings = [];
    data.data.bookings.forEach((booking) => {
        bookings.push([booking.bookingID, booking.name.firstName + " " + booking.name.lastName, 1, booking.price, "2020-01-01"])
    })
    return bookings;
}

export async function getTicketsSummary(eventId) {
    // TODO: Validate eventId
    let data = await fetchData(`/events/${eventId}/tickets/`);
    if (!data || data.status === "fail") {
        return {};
    }
    let totalSoldTickets = 0;
    let totalTickets = 0;
    let totalSoldFreeTickets = 0;
    let totalSoldPaidTickets = 0;
    data.data.tickets.forEach((ticket) => {
        totalSoldTickets += ticket.currentReservations;
        totalTickets += ticket.capacity;
        if (ticket.price === 0) {
            totalSoldFreeTickets += ticket.currentReservations;
        } else {
            totalSoldPaidTickets += ticket.currentReservations;
        }
    })
    return {
        totalSoldTickets,
        totalTickets,
        totalSoldFreeTickets,
        totalSoldPaidTickets
    };
}

export async function getEventPublishStatus(eventId) {
    // TODO: Validate eventId
    let data = await fetchData(`/creators/events/${eventId}`);
    if (!data || data.status === "fail") {
        return null;
    }
    console.log(data.data.event.draft);
    return !data.data.event.draft;
}