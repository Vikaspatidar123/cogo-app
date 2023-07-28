function getDefaultValues({ query }) {
	const {
		showticketslist = false,
		raiseTicket = false,
		ticketId = '',
	} = query || {};

	if (raiseTicket) {
		return { type: 'raise_a_ticket' };
	}

	if (showticketslist) {
		return { type: 'tickets_list' };
	}

	if (ticketId) {
		return { type: 'ticket_details', ticketId };
	}

	return null;
}

export default getDefaultValues;
