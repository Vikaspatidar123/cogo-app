import { Toast } from '@cogoport/components';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCreateOrganizationCommunicationDetail = ({ orgId, orgBranchId }) => {
	const {
		profile,
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
				user_id                      : profile?.id,
				communication_type           : 'call',
				user_availability_start_time : formattedStartDate,
				user_availability_end_time   : formattedEndDate,
			};

			const response = await createOrganizationCommunicationDetailtrigger({
				data: payload,
			});

			if (response?.hasError) return;
			if (response?.status === 200) {
				push(`/${orgId}/${orgBranchId}/importer-exporter/dashboard`);
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
