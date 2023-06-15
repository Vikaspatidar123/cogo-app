import { useRequest } from '@/packages/request';

const useUpdateOrganizationCreditRequirementDetails = () => {
	const [{ data, loading }, trigger] = useRequest({
		method: 'post', url: '/update_organization_credit_requirement_details',
	}, { manual: true, autoCancel: false });

	const updateCreditRequirementDetails = async () => {
		try {
			await trigger({});
		} catch (e) {
			console.log(e);
		}
	};

	return { updateCreditRequirementDetails, data, loading };
};

export default useUpdateOrganizationCreditRequirementDetails;
