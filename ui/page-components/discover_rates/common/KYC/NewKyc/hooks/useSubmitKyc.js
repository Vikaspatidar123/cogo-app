import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';
import showErrorsInToast from '@/ui/commons/utils/showErrorsInToast';

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

	const [{ loading }, trigger] = useRequest({
		url    : '/verify_user_mobile',
		method : 'post',
	}, { manual: true });

	const submitKyc = async (formValues) => {
		try {
			const resSubmit = await trigger({
				data: {
					id,
					preferred_languages       : preferredLanguages,
					country_id                : countryId,
					registration_number       : formValues?.registration_number,
					utility_bill_document_url : formValues?.utility_bill_document_url,
					kyc_submitted_from,
				},
			});
			if (!resSubmit.hasError) {
				Toast.success('KYC submitted successfully');

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
					mobile_number       : mobileNumber,
					mobile_country_code : mobileCountryCode,
					mobile_otp          : otp,
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
	return { submitKyc, submitKycWithMobile, loading };
};
export default useSubmitKyc;
