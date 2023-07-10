import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import { getApiError } from '@/packages/forms';
import { useTicketsRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const translationKey = 'common:components_header_tickets_api';

const useCreateTicket = () => {
	const { t } = useTranslation(['common']);

	const {
		organization: { id: organizationId, country_id = '', cogo_entity_id = '' } = {},
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
				OrganizationID : organizationId,
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

			Toast.success(t(`${translationKey}_create_success`));
			setTicketId(res?.data?.ID);
		} catch (e) {
			Toast.error(getApiError(e?.response?.data) || t(`${translationKey}_error`));
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
