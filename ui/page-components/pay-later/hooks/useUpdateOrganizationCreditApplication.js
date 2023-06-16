import { isEmpty } from '@cogoport/utils';

import { useRequest } from '@/packages/request';

const useUpdateOrganizationCreditApplication = ({ refetch = () => {}, getCreditRequestResponse = {}, method = '' }) => {
	const [{ loading, data }, trigger] = useRequest(
		{
			method : 'post',
			url    : 'update_organization_credit_application',
		},
		{ manual: true },
	);

	const getAgreementDetails = ({ values, selectedSignatory }) => {
		const {
			signatory, signatory_email, signatory_mobile_number,
			mobile_number, upload_proof, email, signatory_name,
		} = values || {};

		const { country_code = '', number = '' } = signatory_mobile_number || mobile_number || {};

		return !values?.signature_proof ? {
			signing_authority_details: {
				name                       : signatory || signatory_name,
				designation                : selectedSignatory?.designation,
				mobile_number              : number,
				email                      : signatory_email || email,
				signatory_board_resolution : '',
				mobile_country_code        : country_code,
				id                         : selectedSignatory?.id,
				document_url               : upload_proof,
				document_extension         : upload_proof?.split('.')?.slice(-1)?.[0],
			},
			preferred_mode: method,
		} : {
			paylater_agreement: {
				agreement_type     : 'cogoport',
				document_extension : 'pdf',
				document_url       : values?.signature_proof,
			},
			preferred_mode: method,

		};
	};

	const updateOrganizationCreditApplication = async ({
		values = {},
		selectedSignatory = {},
		physicalVerificationValues = {},
		submitCreditApplication = () => {},
	}) => {
		try {
			await trigger({
				data: {
					credit_request_id           : getCreditRequestResponse?.id,
					section_to_update           : 'agreement_execution_details',
					agreement_execution_details : getAgreementDetails({
						values: isEmpty(physicalVerificationValues) ? values : physicalVerificationValues,
						selectedSignatory,
					}),
				},
			});
			if (physicalVerificationValues?.signature_proof) {
				submitCreditApplication();
			}
			refetch();
		} catch (e) {
			console.log(e);
		}
	};

	return { updateOrganizationCreditApplication, loading, data };
};

export default useUpdateOrganizationCreditApplication;
