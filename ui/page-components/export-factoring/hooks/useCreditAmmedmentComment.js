import { useRequest } from '@/packages/request';

const useCreditAmmedmemtComment = () => {
	const [{ loading, data }, trigger] = useRequest(
		{
			method : 'post',
			url    : '/create_credit_comment',
		},
		{ manual: true },
	);

	const requestAmmedment = async (payload) => {
		try {
			const resp = await trigger({ data: payload });
			if (resp) {
				return true;
			}
			return false;
		} catch (e) {
			console.log(e);
			return false;
		}
	};

	return { requestAmmedment, loading, data };
};
export default useCreditAmmedmemtComment;
