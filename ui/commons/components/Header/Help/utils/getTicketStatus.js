import { TICKET_OPEN_STATUS, TICKET_CLOSED_STATUS } from '../constants';

const getTicketStatus = (val) => {
	if (TICKET_OPEN_STATUS.includes(val)) {
		return 'open';
	}
	if (TICKET_CLOSED_STATUS.includes(val)) {
		return 'closed';
	}
	return val;
};

export default getTicketStatus;
