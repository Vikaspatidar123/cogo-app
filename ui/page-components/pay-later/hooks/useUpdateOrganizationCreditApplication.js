import { isEmpty } from '@cogoport/utils';

import { useRequest } from '@/packages/request';

const getAgreementDetails = ({ values, selectedSignatory, method }) => {
	const {
		signatory, signatory_email, signatory_mobile_number,
		mobile_number, upload_proof, email, signatory_name, signature_proof,
	} = values || {};
	const { id = '', designation = '' } = selectedSignatory || {};
	const { country_code = '', number = '' } = signatory_mobile_number || mobile_number || {};

	return !values?.signature_proof ? {
		signing_authority_details: {
			name: signatory || signatory_name,
			designation,
			mobile_number: number,
			email: signatory_email || email,
			signatory_board_resolution: '',
			mobile_country_code: country_code,
			id,
			document_url: upload_proof,
			document_extension: upload_proof?.split('.')?.slice(-1)?.[0],
		},
		preferred_mode: method,
	} : {
		paylater_agreement: {
			agreement_type: 'cogoport',
			document_extension: 'pdf',
			document_url: signature_proof,
		},
		preferred_mode: method,

	};
};

const useUpdateOrganizationCreditApplication = ({
	refetch = () => { }, getCreditRequestResponse = {},
	method = '',
}) => {
	const [{ loading, data }, trigger] = useRequest(
		{
			method: 'post',
			url: 'update_organization_credit_application',
		},
		{ manual: true },
	);

	const updateOrganizationCreditApplication = async ({
		values = {},
		selectedSignatory = {},
		physicalVerificationValues = {},
		submitCreditApplication = () => { },
	}) => {
		try {
			await trigger({
				data: {
					credit_request_id: getCreditRequestResponse?.id,
					section_to_update: 'agreement_execution_details',
					agreement_execution_details: getAgreementDetails({
						values: isEmpty(physicalVerificationValues) ? values : physicalVerificationValues,
						selectedSignatory,
						method,
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
