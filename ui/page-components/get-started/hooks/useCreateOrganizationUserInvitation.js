import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';
import showErrorsInToast from '@/ui/commons/utils/showErrorsInToast';

const useCreateOrganizationUserInvitation = ({ orgId, setTimeForCall }) => {
	const [{ loading: createOrganizationUserInvitationLoading }, createOrganizationUserInvitationtrigger] = useRequest({
		url    : 'organization/create_organization_user_invitation',
		method : 'post',
	}, { manual: true });

	const onClickCreateOrganizationUserInvitation = async (teamMembers) => {
		try {
			const payload = {
				organization_id : orgId,
				country_id      : teamMembers,
				source          : 'user',
			};

			const response = await createOrganizationUserInvitationtrigger({
				data: payload,
			});

			if (response?.hasError) return;
			if (response?.status === 200) setTimeForCall(true);

			Toast.success('An invite has been sent to your contacts.');
		} catch (error) {
			showErrorsInToast(error?.response?.data);
		}
	};

	return {
		onClickCreateOrganizationUserInvitation,
		createOrganizationUserInvitationLoading,
	};
};

export default useCreateOrganizationUserInvitation;
