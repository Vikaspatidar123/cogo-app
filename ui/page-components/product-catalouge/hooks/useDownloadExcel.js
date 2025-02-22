/* eslint-disable no-undef */
/* eslint-disable max-len */
import { useSelector } from '@/packages/store';

const useDownloadExcel = ({ refetchProduct = () => {} }) => {
	const { profile } = useSelector((state) => state);
	const { organization } = profile || {};

	const useDownloadProduct = async (isArchive) => {
		const url = `${process.env.BUSINESS_FINANCE_BASE_URL}/saas/product/export?organizationId=${organization?.id}&userId=${profile?.id}&isArchived=${isArchive}`;
		window.location.href = url;
		refetchProduct({ page: 1 });
	};

	return { useDownloadProduct };
};

export default useDownloadExcel;
