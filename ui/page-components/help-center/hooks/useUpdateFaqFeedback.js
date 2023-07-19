import { Toast } from '@cogoport/components';

import { DEFAULT_USER_REMARKS_FOR_FEEDBACK } from '../constants';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';

const getPayload = ({ answerId = '', isPositive = true, feedbackID = '' }) => ({
	faq_answer_id : answerId,
	is_positive   : isPositive,
	status        : 'active',
	remark        : DEFAULT_USER_REMARKS_FOR_FEEDBACK,
	id            : feedbackID,
});

function useUpdateFaqFeedback({ getQuestion = () => {}, query = {} }) {
	const { faq_id = '' } = query;

	const [{ loading }, trigger] = useRequest({
		url    : '/cogo_academy/update_faq_feedback',
		method : 'post',
	}, { manual: false });

	const updateFaqFeedback = async ({
		answerId,
		isPositive = true,
		feedbackID,
	}) => {
		try {
			await trigger({
				data: getPayload({
					answerId,
					isPositive,
					feedbackID,
				}),
			});

			getQuestion(faq_id);
		} catch (error) {
			Toast.error(getApiErrorString(error));
		}
	};

	return {
		updateFaqFeedback,
		updateLoading: loading,
	};
}

export default useUpdateFaqFeedback;
