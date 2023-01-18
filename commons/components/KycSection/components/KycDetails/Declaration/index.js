import Button from '@/commons/components/UI/Button';
import Checkbox from '@cogoport/front/components/admin/CheckBox';
import { Flex } from '@cogoport/front/components';
import { ButtonContainer, LayoutContainer, Body } from './styles';
import useDeclaration from './useDeclaration';

function Declaration({ kycDetails = {}, setKycDetails = () => {} }) {
	const {
		setChecked = () => {},
		checked = false,
		handleSubmitKyc = () => {},
		submitKycAPILoading = false,
		disableSubmitButton = false,
	} = useDeclaration({ kycDetails, setKycDetails });

	return (
		<Flex direction="column">
			<LayoutContainer>
				<Checkbox
					className="primary lg"
					checked={checked}
					onChange={setChecked}
					style={{ marginTop: 2 }}
				/>

				<Body>
					I certify that the information I am about to provided is true and
					complete to the best of my knowledge. I am aware that this self
					declaration statement is subject to review and verification and if
					such information has been falsified I may be prosecuted or other
					actions might be taken to recover funds.
				</Body>
			</LayoutContainer>

			<ButtonContainer>
				<Button
					className="primary md"
					disabled={submitKycAPILoading || disableSubmitButton}
					onClick={handleSubmitKyc}
				>
					Save And Submit Kyc
				</Button>
			</ButtonContainer>
		</Flex>
	);
}

export default Declaration;
