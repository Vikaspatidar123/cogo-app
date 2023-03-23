import flattenErrorToString from '../helpers/getApiErrorString';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCreateRfqRequestSheet = ({
	watchRequestType,
	setShowResult,
	...rest
}) => {
	const {
		general: {
			query: { org_id = '', branch_id = '' },
		},
		profile: { id: user_id = '' },
	} = useSelector((state) => state);
	const { importerExporterDetails, basicDetails } = rest;

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/create_rfq_request_sheet',
	}, { manual: true });

	const createRfqSheet = async (values) => {
		const { search_type, file_url } = values || {};

		try {
			await trigger({
				data: {
					importer_exporter_id        : org_id,
					importer_exporter_branch_id : branch_id,
					user_id,
					rfq_name                    : basicDetails?.quotation_name,
					rfq_type                    : basicDetails?.reason_type,
					search_type,
					file_url,
					file_type                   : watchRequestType,
				},
			});

			setShowResult({
				showModal : true,
				isSuccess : true,
				errorText : '',
			});
		} catch (err) {
			setShowResult({
				showModal : true,
				isSuccess : false,
				errorText : flattenErrorToString(err?.data),
			});
		}
	};

	return {
		createRfqSheet,
		rfqSheetLoading: loading,
	};
};

export default useCreateRfqRequestSheet;
