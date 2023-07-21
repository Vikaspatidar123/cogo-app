import TicketComment from './TicketComment';

function InitialMessage({ ticketData, userId }) {
	const {
		Description: description = '',
		CreatedAt: createdAt = '',
		Data: data = {},
	} = ticketData?.Ticket || {};
	const { Attachment: mediaUrls = [], ...restData } = data || {};
	const { SystemUserID: systemUserID = '' } = ticketData?.TicketUser || {};

	return (
		<TicketComment
			type="respond"
			createdAt={createdAt}
			description={description}
			mediaUrls={mediaUrls}
			userId={userId}
			systemUserID={systemUserID}
			restData={restData}
		/>
	);
}

export default InitialMessage;
