function getTimeLineText({ ticketType = '', type = '' }) {
	const textMapping = {
		reviewer_assigned : 'This ticket has been created.',
		rejected          : 'This ticket has been rejected.',
		mark_as_resolved  : 'This ticket has been resolved.',
		ticket_updated    : `Ticket type has been updated to "${ticketType}".`,
		reopened          : 'This ticket has been reopened.',
	};

	return textMapping?.[type] || '';
}

export default getTimeLineText;
