import { useRouter } from '@/packages/next';
import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

let isTicketNotUtlilized = false;

const useCreateTokenTicket = () => {
	const {
		general: { query = {} },
	} = useSelector((state) => state);

	const { push } = useRouter();
	const { token, type, source } = query || {};

	const [{ data, loading }, trigger] = useRequestBf({
		url     : 'tickets/token_ticket',
		method  : 'post',
		scope   : 'cogocare',
		authKey : 'post_tickets_token_ticket',
		data    : { TicketToken: token, Type: type, Source: source || 'client' },
	}, { manual: false });

	const pushToDetailsPage = () => {
		push('/ticket-details/[token]', `/ticket-details/${token}`, false);
	};

	const createTokenTicket = async () => {
		const res = await trigger({
			data: { TicketToken: token, Type: type, Source: source || 'client' },
		});
		if (res?.data) {
			const { Status = '' } = res?.data || {};
			if (Status === 'utilized' && token) {
				pushToDetailsPage();
			}
			isTicketNotUtlilized = Status !== 'utilized' || false;
		}
	};

	return {
		loading,
		createTokenTicket,
		Status: data?.Status,
		isTicketNotUtlilized,
	};
};

export default useCreateTokenTicket;
