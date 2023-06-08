import { Toast } from '@cogoport/components';

import { useForm } from '@/packages/forms';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCreateContact = ({ setAddContact, fetchContactList }) => {
	const { orgId, branchId } = useSelector((state) => ({
		orgId    : state.profile.organization.id,
		branchId : state.general.query.branch_id,
	}));

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/create_saas_shipment_poc',
	}, { manual: true });

	const formHook = useForm();
	const closeHandler = () => setAddContact(false);

	const createContact = async (data) => {
		const { name, company = '', mobile_no = {}, email } = data;
		const { country_code = '', number = '' } = mobile_no || {};
		try {
			await trigger({
				data: {
					name,
					company,
					email,
					mobile_no              : country_code + number,
					organization_id        : orgId,
					organization_branch_id : branchId,
				},
			});
			Toast.success('Successfully Created Contact');
			await fetchContactList();
			closeHandler();
		} catch (err) {
			console.log(err);
		}
	};

	return {
		createContact,
		closeHandler,
		loading,
		formHook,
	};
};

export default useCreateContact;
