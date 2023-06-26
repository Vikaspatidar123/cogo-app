import { Toast } from '@cogoport/components';

import { DEFAULT_USER_REMARKS_FOR_FEEDBACK } from '../constants';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const getPayload = ({ answerId, isPositive }) => ({
	faq_answer_id : answerId,
	is_positive   : isPositive,
	status        : 'active',
	remark        : DEFAULT_USER_REMARKS_FOR_FEEDBACK,
});

function useCreateFaqFeedback({ getQuestion = () => {}, query = {} }) {
	const { scope } = useSelector((state) => state.general);

	const [{ loading }, trigger] = useRequest({
		url    : '/cogo_academy/create_faq_feedback',
		method : 'post',
		scope,
	}, { manual: false });

	const { faq_id = '' } = query;

	const submitFaqFeedback = async ({ answerId, isPositive = true }) => {
		try {
			await trigger({
				data: getPayload({
					answerId,
					isPositive,
				}),
			});

			getQuestion(faq_id);
		} catch (error) {
			Toast.error(getApiErrorString(error));
		}
	};

	return {
		submitFaqFeedback,
		feedbackLoading: loading,
	};
}

export default useCreateFaqFeedback;
