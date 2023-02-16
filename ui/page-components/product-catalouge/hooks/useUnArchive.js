import { useRequest } from '@cogo/commons/hooks';
import toast from '@cogoport/front/components/admin/Toast';
import { useSaasState } from '../../../common/context';

const useUnArchive = ({ proId, setArchive, refetchProduct }) => {
	const { general } = useSaasState();
	const { scope } = general;

	const putArchive = useRequest('put', false, scope, {
		authkey: 'put_saas_product_unarchive',
	})('saas/product/unarchive');

	const refetchUnArchive = async () => {
		try {
			const response = await putArchive.trigger({
				params: { productId: proId },
			});
			if (response.data.message === 'Success') {
				refetchProduct({});
				setArchive(false);
				toast.success('Product UnArchive Successfully !!');
			}
		} catch (error) {
			toast.error(error.message);
		}
	};
	return {
		refetchUnArchive,
	};
};

export default useUnArchive;
