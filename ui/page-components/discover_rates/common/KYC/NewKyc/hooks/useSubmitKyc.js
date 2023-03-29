import { toast } from '@cogoport/front/components';
import { useRequest } from '@cogo/commons/hooks';
import showErrorsInToast from '@cogo/utils/showErrorsInToast';

const useSubmitKyc = ({
	scope,
	id,
	mobileNumber,
	mobileCountryCode,
	preferredLanguages,
	countryId,
	onFinalSubmit,
	kyc_submitted_from,
}) => {
	const otpVarifyAPI = useRequest('post', false, scope)('/verify_user_mobile');
	const submitKycAPI = useRequest(
		'post',
		false,
		scope,
	)('/submit_organization_kyc');

	const submitKyc = async (formValues) => {
		try {
			const resSubmit = await submitKycAPI.trigger({
				data: {
					id,
					preferred_languages: preferredLanguages,
					country_id: countryId,
					registration_number: formValues?.registration_number,
					utility_bill_document_url: formValues?.utility_bill_document_url,
					kyc_submitted_from,
				},
			});
			if (!resSubmit.hasError) {
				toast.success('KYC submitted successfully');

				window.location.reload();

				if (onFinalSubmit) {
					onFinalSubmit();
				}
			} else {
				showErrorsInToast(resSubmit?.messages);
			}
		} catch (err) {
			showErrorsInToast(err?.data);
		}
	};
	const submitKycWithMobile = async (formValues, otp) => {
		try {
			const res = await otpVarifyAPI.trigger({
				data: {
					id,
					mobile_number: mobileNumber,
					mobile_country_code: mobileCountryCode,
					mobile_otp: otp,
				},
			});
			if (!res.hasError) {
				submitKyc(formValues);
			} else {
				showErrorsInToast(res?.messages);
			}
		} catch (err) {
			showErrorsInToast(err?.data);
		}
	};
	return { submitKyc, submitKycWithMobile };
};
export default useSubmitKyc;
