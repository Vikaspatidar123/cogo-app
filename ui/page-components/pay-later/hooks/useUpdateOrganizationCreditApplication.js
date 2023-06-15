import { useRequest } from '@/packages/request';

const useUpdateOrganizationCreditApplication = ({ refetch = () => {}, getCreditRequestResponse = {}, method = '' }) => {
	const [{ loading, data }, trigger] = useRequest(
		{
			method : 'post',
			url    : 'update_organization_credit_application',
		},
		{ manual: true },
	);

	const updateOrganizationCreditApplication = async ({ values = {}, selectedSignatory = {} }) => {
		const { signatory, signatory_email, signatory_mobile_number:{ country_code, number } } = values || {};
		try {
			await trigger({
				data: {
					credit_request_id           : getCreditRequestResponse?.id,
					section_to_update           : 'agreement_execution_details',
					agreement_execution_details : {
						preferred_mode            : method,
						signing_authority_details : {
							name                       : signatory,
							designation                : selectedSignatory?.designation,
							mobile_number              : number,
							email                      : signatory_email,
							signatory_board_resolution : '',
							mobile_country_code        : country_code,
							id                         : selectedSignatory?.id,
						},
					},
				},
			});
			refetch();
		} catch (e) {
			console.log(e);
		}
	};

	return { updateOrganizationCreditApplication, loading, data };
};

export default useUpdateOrganizationCreditApplication;
