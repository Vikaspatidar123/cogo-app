import { useRequest } from '@/packages/request';

function useGetQuestion() {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/cogo_academy/get_question',
		method : 'get',
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
