import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCreateTokenTicket = () => {
	const {
		general: { query = {} },
	} = useSelector((state) => state);

	const { push } = useRouter();
	const { token, type, source } = query || {};

	// const { data, trigger, loading } = useRequest(
	// 	'post',
	// 	false,
	// 	'cogocare',
	// )('/token_ticket');
	const [{ data, loading }, trigger] = useRequest({
		url    : '/token_ticket',
		method : 'post',
	}, { manual: true });

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
		}
	};
	const { Status = '' } = data || {};
	const isTicketNotUtlilized = (Status && Status !== 'utilized') || false;
	return {
		loading,
		createTokenTicket,
		Status,
		isTicketNotUtlilized,
	};
};

export default useCreateTokenTicket;
