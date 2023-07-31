import { useRequest } from '@/packages/request';

const useSubmitNPS = ({ score = 10, feedback = {} }) => {
	const { selectedOptions = [], reason = '' } = feedback || {};

	const [{ loading }, trigger] = useRequest({
		url    : '/create_nps_score',
		method : 'post',
	}, { autoCancel: false, manual: true });

	const submitNPS = () => {
		try {
			trigger({
				data: {
					achieved_rating : score,
					remarks         : selectedOptions,
					description     : reason,
				},
			});
		} catch (e) {
			console.error(e);
		}
	};

	return { submitNPS, loading };
};

export default useSubmitNPS;
