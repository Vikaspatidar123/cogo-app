import { Toast } from '@cogoport/components';
import { useState } from 'react';

import { getApiError } from '@/packages/forms';
import { useTicketsRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCreateTicket = () => {
	const {
		organization: { id: organizationID, country_id = '', cogo_entity_id = '' } = {},
		id = '',
	} = useSelector(({ profile }) => profile);

	const [ticketId, setTicketId] = useState('');

	const [{ loading, data }, trigger] = useTicketsRequest({
		url     : '/ticket',
		authKey : 'post_tickets_ticket',
		method  : 'post',
	}, { manual: false });

	const createTicket = async (val, extraFieldName = '') => {
		try {
			const payload = {
				UserID         : id,
				OrganizationID : organizationID,
				Source         : 'importer_exporter',
				Type           : val?.ticket_type || undefined,
				Description    : val?.description || undefined,
				Data           : {
					Attachment       : val?.file_urls,
					[extraFieldName] : extraFieldName ? val?.[extraFieldName] : undefined,
					Persona          : 'importer_exporter',
					Platform         : 'app',
				},
				CogoEntityId  : cogo_entity_id,
				PerformedByID : id,
				CountryId     : country_id,
			};

			const res = await trigger({
				data: payload,
			});

			Toast.success('Ticket Created Sucessfully');
			setTicketId(res?.data?.ID);
		} catch (e) {
			Toast.error(getApiError(e?.response?.data));
		}
	};

	return {
		createTicket,
		loading,
		data,
		ticketId,
		setTicketId,
	};
};

export default useCreateTicket;
