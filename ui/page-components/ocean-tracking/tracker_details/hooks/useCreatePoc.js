// import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

function useCreatePoc() {
	const { profile } = useSelector((s) => s);
	const { general } = useSelector((s) => s);
	const [{ loading }, trigger] = useRequest({
		url    : 'create_saas_shipment_poc',
		method : 'post',
	}, { manual: true });
	const createPoc = async (name, mobile_no, email) => {
		let requestData = {};
		requestData = {
			name,
			mobile_no,
			email,
			organization_id        : profile.organization.id,
			organization_branch_id : general?.query?.branch_id,
		};

		try {
			const res = await trigger({ data: requestData });
			const { hasError } = res || {};
			const message = res?.data?.message;
			if (hasError) throw new Error();
			if (message) throw new Error(message);
			return res?.data?.id;
		} catch (err) {
			console.log(err);
			return null;
		}
	};

	return {
		loading,
		createPoc,
	};
}

export default useCreatePoc;
