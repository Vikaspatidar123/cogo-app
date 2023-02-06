import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCreateOrganizationUserInvitation = ({ orgId, setTimeForCall }) => {
	const {
		profile,
	} = useSelector((state) => state);

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
			Toast.error(error?.error);
		}
	};

	return {
		onClickCreateOrganizationUserInvitation,
		createOrganizationUserInvitationLoading,
	};
};

export default useCreateOrganizationUserInvitation;
