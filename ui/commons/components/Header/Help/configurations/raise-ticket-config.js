import { useTranslation } from 'next-i18next';

import {
	asyncFieldsTicketTypes,
} from '@/packages/forms';
import useGetAsyncCogoCareOptions from '@/packages/forms/hooks/useGetAsyncCogoCareOptions';

const translationKey = 'common:components_header_tickets_create';

const useRaiseTicketControls = ({ setSelectedQuery = () => {} }) => {
	const { t } = useTranslation(['common']);

	const loadOptions = useGetAsyncCogoCareOptions({
		...asyncFieldsTicketTypes(),
	});

	const { onSearch = () => {} } = loadOptions;

	return [
		{
			label       : t(`${translationKey}_query`),
			name        : 'ticket_type',
			type        : 'select',
			isClearable : true,
			placeholder : t(`${translationKey}_query_placeholder`),
			rules       : {
				required: true,
			},
			...(loadOptions || {}),
			onSearch: (query) => {
				setSelectedQuery(query || '');
				onSearch(query);
			},
		},
	];
};

export default useRaiseTicketControls;
