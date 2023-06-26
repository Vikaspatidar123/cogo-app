import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

function useGetQuestion() {
	const { scope } = useSelector((state) => state.general);

	const [{ loading, data }, trigger] = useRequest({
		url    : '/cogo_academy/get_question',
		method : 'get',
		scope,
	}, { manual: false });

	const getQuestion = async (id) => {
		try {
			await trigger({
				params: {
					id,
				},
			});
		} catch (error) {
			console.error(error);
		}
	};

	return {
		questionData: data || {},
		getQuestion,
		loading,
	};
}

export default useGetQuestion;
