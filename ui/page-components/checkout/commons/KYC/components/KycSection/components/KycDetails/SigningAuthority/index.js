import Layout from '@cogo/business-modules/form/Layout';
import { Flex, Text } from '@cogoport/front/components';
import { Button, Select } from '@cogoport/front/components/admin';

import {
	LayoutContainer,
	SelectContainer,
	Separator,
	SeparatorText,
} from './styles';
import styles from './styles.module.css';
import useSigningAuthority from './useSigningAuthority';

function SigningAuthority({
	channelPartnerDetails = {},
	kycDetails = {},
	setKycDetails = () => {},
}) {
	const {
		usersList = [],
		handleChangeUser = () => {},
		handleSubmit = () => {},
		onCreate = () => {},
		selectedUser,
		updateUserAPILoading = false,
		selectSigningAuthority = () => {},
		fields = {},
		formState = {},
		inviteUserAPILoading = false,
		controls = [],
	} = useSigningAuthority({ channelPartnerDetails, kycDetails, setKycDetails });

	return (
		<Flex direction="column">
			<Text size={14} color="#333333">
				Please select a key decision maker in the company from the dropdown. If
				the person is not available in the list, send an invite to them.
			</Text>

			<LayoutContainer>
				<SelectContainer>
					<Select
						placeholder="Select User"
						type="select"
						options={usersList}
						themeType="new"
						onChange={handleChangeUser}
						valueKey="user_id"
						labelKey="name"
						size="lg"
						value={selectedUser}
					/>

					<Flex justifyContent="flex-end" margin="16px 0">
						<Button
							disabled={updateUserAPILoading}
							onClick={selectSigningAuthority}
						>
							CHOOSE
						</Button>
					</Flex>
				</SelectContainer>

				<Flex alignItems="center">
					<Separator />
					<SeparatorText>OR</SeparatorText>
					<Separator />
				</Flex>

				<Layout controls={controls} fields={fields} errors={formState.errors} />

				<Flex justifyContent="flex-end" margin="16px 0">
					<Button
						disabled={inviteUserAPILoading}
						onClick={handleSubmit(onCreate)}
					>
						INVITE
					</Button>
				</Flex>
			</LayoutContainer>
		</Flex>
	);
}

export default SigningAuthority;
