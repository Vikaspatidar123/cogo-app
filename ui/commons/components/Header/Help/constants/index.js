export const MESSAGE_MAPPING = {
	text    : ['text', 'template', 'interactive'],
	media   : ['image', 'audio', 'video'],
	contact : ['contact'],
};

export const TICKET_OPEN_STATUS = [
	'unresolved',
	'pending',
	'escalated',
	'overdue',
	'reject_requested',
	'resolve_requested',
];

export const TICKET_CLOSED_STATUS = ['closed', 'rejected'];

export const FILTER_KEYS_MAPPING = {
	open   : TICKET_OPEN_STATUS.join(','),
	solved : TICKET_CLOSED_STATUS.join(','),
};

export const STATUS_CHANGE_PAYLOAD = {
	resolve: {
		Type   : 'mark_as_resolved',
		Status : 'resolved',
	},
	notresolved: {
		Type   : 'reopened',
		Status : 'reopened',
	},
};

export const ACTIVITY_STATUS = [
	'reviewer_assigned',
	'rejected',
	'reopened',
	'ticket_updated',
	'mark_as_resolved',
	'respond',
];

export const MESSAGE_COUNT_TO_SHOWN = 10;

export const NO_OF_TICKETS_TO_BE_SHOWED = {
	create  : 2,
	default : 10,
};
