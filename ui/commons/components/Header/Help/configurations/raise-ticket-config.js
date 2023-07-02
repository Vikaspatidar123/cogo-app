import {
	asyncFieldsTicketTypes,
} from '@/packages/forms';
import useGetAsyncCogoCareOptions from '@/packages/forms/hooks/useGetAsyncCogoCareOptions';

const useRaiseTicketControls = ({ setSelectedQuery = () => {} }) => {
	const loadOptions = useGetAsyncCogoCareOptions({
		...asyncFieldsTicketTypes(),
	});

	const { onSearch = () => {} } = loadOptions;

	return [
		{
			label       : 'Tell us your query',
			name        : 'ticket_type',
			type        : 'select',
			isClearable : true,
			placeholder : 'Reason',
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
