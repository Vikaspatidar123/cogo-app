import { Toast } from '@cogoport/components';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCreateOrganizationCommunicationDetail = ({ orgId }) => {
	const {
		profile: {
			name = '',
			email = '',
			mobile_country_code: mobileCountryCode = '',
			mobile_number: mobileNumber = '',
		},
	} = useSelector((state) => state);

	const { push } = useRouter();
	const [{ loading: createOrganizationCommunicationDetailLoading },
		createOrganizationCommunicationDetailtrigger] = useRequest({
		url    : 'organization/create_organization_user_invitation',
		method : 'post',
	}, { manual: true });

	const onClickCreateOrganizationCommunicationDetail = async ({ formattedStartDate, formattedEndDate }) => {
		try {
			const payload = {
				organization_id              : orgId,
				communication_type           : 'call',
				user_availability_start_time : formattedStartDate,
				user_availability_end_time   : formattedEndDate,
				organization_user_details    : [
					{
						name,
						email,
						mobile_country_code : mobileCountryCode,
						mobile_number       : mobileNumber,
					},
				],
			};

			const response = await createOrganizationCommunicationDetailtrigger({
				data: payload,
			});

			if (response?.hasError) return;
			if (response?.status === 200) {
				push('/dashboard');
			}
		} catch (error) {
			Toast.error('Something Went Wrong');
		}
	};

	return {
		onClickCreateOrganizationCommunicationDetail,
		createOrganizationCommunicationDetailLoading,
	};
};

export default useCreateOrganizationCommunicationDetail;
