import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';
import showErrorsInToast from '@/ui/commons/utils/showErrorsInToast';

const useCreateOrganizationUserInvitation = ({ org, setTimeForCall }) => {
	const [{ loading: createOrganizationUserInvitationLoading }, createOrganizationUserInvitationtrigger] = useRequest({
		url    : 'organization/create_organization_user_invitation',
		method : 'post',
	}, { manual: true });

	const onClickCreateOrganizationUserInvitation = async (teamMembers) => {
		const teamMembersListPayload = teamMembers?.map((teamMember) => {
			const {
				name = '',
				email = '',
				mobile_number: mobileNumber = {},
				work_scopes = [],
			} = teamMember;
			const {
				country_code: mobile_country_code = undefined,
				number: mobile_number = undefined,
			} = mobileNumber;

			return {
				name,
				email,
				mobile_country_code,
				mobile_number,
				work_scopes            : work_scopes || [],
				organization_branch_id : org?.branches?.[0]?.id,
			};
		});
		console.log(org, 'org');
		try {
			const payload = {
				organization_id           : org?.id,
				source                    : 'user',
				organization_user_details : teamMembersListPayload,

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
