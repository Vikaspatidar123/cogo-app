/* eslint-disable no-undef */
/* eslint-disable max-len */
import { Toast } from '@cogoport/components';
import { useState } from 'react';

// import { useSaasState } from '../../../common/context';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useUploadDocuments = ({ refetchProduct, setShow }) => {
	const [fileValue, setFileValue] = useState('');
	const [value, setValue] = useState('');
	const { profile } = useSelector((state) => state);
	const { organization } = profile || {};
	const { country } = organization || {};
	const {
		country_code = '',
		country_id = '',
		currency_code = '',
		name = '',
	} = country || {};
	const [{ loading }, trigger] = useRequestBf({
		url     : 'saas/product/bulk-products-upload',
		method  : 'post',
		authKey : 'post_saas_product_bulk_products_upload',
	}, { manual: true });

	const uploadDocuments = async () => {
		try {
			const resp = await trigger({
				data: {
					organizationId : organization?.id,
					userId         : profile?.id,
					countryCode    : country_code,
					countryId      : country_id,
					currencyCode   : currency_code,
					countryName    : name,
					url            : fileValue.url,
				},
			});

			if (resp) {
				if (resp.data?.allValidEntries) {
					refetchProduct({ page: 1 });
					setValue(resp?.data);
					setShow(resp?.data?.allValidEntries);
				} else {
					setValue(resp?.data);
					setShow(resp?.data?.allValidEntries);
				}
			}
		} catch (error) {
			Toast.error(error.error?.message || 'Something Went Wrong');
		}
	};

	const getDownloadExcel = async (generateInvalidRecordsId) => {
		window.open(
			`${process.env.BUSINESS_FINANCE_BASE_URL}/saas/product/error-export?generateInvalidRecordsId=${generateInvalidRecordsId}`,
			'_self',
		);
	};

	return {
		uploadDocuments,
		fileValue,
		setFileValue,
		loading,
		getDownloadExcel,
		value,
	};
};

export default useUploadDocuments;
