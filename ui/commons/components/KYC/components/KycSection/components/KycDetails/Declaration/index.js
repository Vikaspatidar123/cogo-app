import { Button, Checkbox } from '@cogoport/components';

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
		<div style={{ display: 'flex', flexdirection: 'column' }}>
			<div className={styles.layout_container}>
				<Checkbox
					className="primary lg"
					checked={checked}
					onChange={setChecked}
					style={{ marginTop: 2 }}
				/>

				<div className={styles.body}>
					I certify that the information I am about to provided is true and
					complete to the best of my knowledge. I am aware that this self
					declaration statement is subject to review and verification and if
					such information has been falsified I may be prosecuted or other
					actions might be taken to recover funds.
				</div>
			</div>

			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button
					disabled={apiLoading || disableSubmitButton}
					onClick={handleSubmitKyc}
				>
					SAVE AND SUBMIT KYC
				</Button>
			</div>
		</div>
	);
}

export default Declaration;
