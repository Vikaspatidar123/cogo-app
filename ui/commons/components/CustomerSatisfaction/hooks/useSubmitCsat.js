import { useRequest } from '@/packages/request';

const useSubmitCsat = ({ rating = 5, feedback = {}, serviceName = '', csatInfo = {}, details = {} }) => {
	const { selectedOptions = [], reason = '' } = feedback || {};

	const [{ loading, data }, trigger] = useRequest({
		url    : '/create_csat_score',
		method : 'post',
	}, { manual: true, autoCancel: false });

	const submitCsat = () => {
		try {
			trigger({
				data: {
					achieved_rating : rating,
					service_name    : serviceName,
					reference_id    : details?.id,
					csat_score_id   : csatInfo?.csat_score_id,
					remarks         : selectedOptions,
					description     : reason,
				},
			});
		} catch (e) {
			console.error(e);
		}
	};

	return ({ submitCsat, loading, data });
};

export default useSubmitCsat;
