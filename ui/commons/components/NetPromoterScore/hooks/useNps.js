import { useEffect } from 'react';

import { useRequest } from '@/packages/request';

const DEFAULT_NPS = 10;
const NPS_SHOW_TIME = 12000;

const getSubmitNpsPayload = ({ feedback }) => {
	const { score, selectedOptions = [], reason = '' } = feedback || {};

	return ({
		achieved_rating : score || DEFAULT_NPS,
		remarks         : selectedOptions,
		description     : reason,
	});
};

const useNps = ({ setShow, ...rest }) => {
	const [{ data }] = useRequest({
		method : 'get',
		url    : '/get_nps_status',
	}, { manual: false });

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/create_nps_score',
	}, { manual: true });

	const submitNps = () => {
		const payload = getSubmitNpsPayload(rest);
		try {
			trigger({
				data: payload,
			});
		} catch (err) {
			console.error(err);
		}
	};

	const handleSubmitNps = () => {
		submitNps();
		setShow(false);
	};

	const handleDoItLater = () => {
		setShow(false);
		sessionStorage.setItem('npsTimeDecision', 'later');
	};

	useEffect(() => {
		const submitNpsLater = sessionStorage.getItem('npsTimeDecision') === 'later';

		const timeout = setTimeout(() => {
			setShow(data && !submitNpsLater);
		}, NPS_SHOW_TIME);

		return () => clearTimeout(timeout);
	}, [data, setShow]);

	return { data, loading, handleSubmitNps, handleDoItLater };
};
export default useNps;
