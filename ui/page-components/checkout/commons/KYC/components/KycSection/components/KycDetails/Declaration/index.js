import { Flex } from '@cogoport/front/components';
import { Button } from '@cogoport/front/components/admin';
import Checkbox from '@cogoport/front/components/admin/CheckBox';

// import { LayoutContainer, Body } from './styles';
import styles from './styles.module.css';
import useDeclaration from './useDeclaration';

function Declaration({
	source,
	setShow,
	onClose,
	channelPartnerDetails = {},
	kycDetails = {},
	setKycDetails = () => {},
}) {
	const {
		setChecked = () => {},
		checked = false,
		handleSubmitKyc = () => {},
		apiLoading = false,
		disableSubmitButton = false,
	} = useDeclaration({
		channelPartnerDetails,
		kycDetails,
		setKycDetails,
		setShow,
		onClose,
		source,
	});

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

			<Flex justifyContent="flex-end">
				<Button
					disabled={apiLoading || disableSubmitButton}
					onClick={handleSubmitKyc}
				>
					SAVE AND SUBMIT KYC
				</Button>
			</Flex>
		</Flex>
	);
}

export default Declaration;
