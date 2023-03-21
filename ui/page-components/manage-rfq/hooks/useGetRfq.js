import { Toast } from '@cogoport/components';

import getApiErrorString from '../helpers/getApiErrorString';
import formatDraftFormValues from '../utils/formatDraftFormValues';

import { useRequest } from '@/packages/request';

const useGetRfq = ({
	setImporterExporterDetails = () => {},
	setDraftFormData = () => {},
	setShowForm = () => {},
	setServices = () => {},
	setOriginDetails = () => {},
	setDestinationDetails = () => {},
	rfqId,
}) => {
	const [{ loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_rfq',
	}, { manual: 'true' });

	const getRfq = async (id) => {
		try {
			const res = await trigger({
				params: {
					id,
				},
			});
			setServices({});
			setDraftFormData({});
			setImporterExporterDetails({
				branch_id : res.data.data.importer_exporter_branch_id || '',
				id        : res.data.data.importer_exporter_id || '',
				user_id   : res.data.data.user_id || '',
				rfqName   : res.data.data.name || '',
				rfqType   : res.data.data.rfq_type || '',
			});
			formatDraftFormValues({
				draftListData: res.data.data.drafts,
				setDraftFormData,
				setServices,
				setOriginDetails,
				setDestinationDetails,
				rfqId,
			});
			setShowForm('');
		} catch (err) {
			Toast.error(getApiErrorString(err?.data));
		}
	};

	return {
		loading,
		getRfq,
	};
};

export default useGetRfq;
