import FormLayout from '@/temp/form/FormLayout';
import Button from '@/commons/components/UI/Button';
import { Select } from '@cogoport/front/components/admin';
import { Flex } from '@cogoport/front/components';
import {
	LayoutContainer,
	ButtonContainer,
	DivisionContainer,
	SelectContainer,
	SelectLabel,
	Separator,
	SeparatorText,
	SubHeading,
} from './styles';
import useSigningAuthority from './useSigningAuthority';

function SigningAuthority({ kycDetails = {}, setKycDetails = () => {} }) {
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
	} = useSigningAuthority({ kycDetails, setKycDetails });

	return (
		<Flex direction="column">
			<SubHeading>
				Please select a key decision maker in the company from the dropdown. If
				the person is not available in the list, send an invite to them.
			</SubHeading>
			<LayoutContainer>
				<SelectContainer>
					<SelectLabel>Choose Signing Authority</SelectLabel>

					<Select
						placeholder="Select Signing Authority"
						type="select"
						options={usersList}
						themeType="new"
						onChange={handleChangeUser}
						valueKey="user_id"
						labelKey="name"
						size="lg"
						value={selectedUser}
					/>

					<ButtonContainer>
						<Button
							disabled={updateUserAPILoading}
							onClick={selectSigningAuthority}
						>
							CHOOSE
						</Button>
					</ButtonContainer>
				</SelectContainer>

				<DivisionContainer>
					<Separator />
					<SeparatorText>OR</SeparatorText>
					<Separator />
				</DivisionContainer>

				<FormLayout
					controls={controls}
					fields={fields}
					errors={formState.errors}
				/>
				<ButtonContainer>
					<Button
						className="primary md"
						disabled={inviteUserAPILoading}
						onClick={handleSubmit(onCreate)}
					>
						INVITE
					</Button>
				</ButtonContainer>
			</LayoutContainer>{' '}
		</Flex>
	);
}

export default SigningAuthority;
