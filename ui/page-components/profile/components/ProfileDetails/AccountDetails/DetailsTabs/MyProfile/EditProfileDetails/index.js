import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import useEditProfileDetails from '../hooks/useEditProfileDetails';

import styles from './styles.module.css';

function EditProfileDetails({
	setShowEditProfileDetails = () => {},
	userDetails = {},
	getChannelPartnerUser,
}) {
	const {
		showElements,
		controls = [],
		fields = {},
		errors = {},
		handleSubmit = () => {},
		onCreate = () => {},
		onError = () => {},
		loading = false,
	} = useEditProfileDetails({
		userDetails,
		getChannelPartnerUser,
		setShowEditProfileDetails,
	});

	const { t } = useTranslation(['profile']);

	return (
		<div className={styles.LayoutContainer}>
			{/* <Layout
				showElements={showElements}
				controls={controls}
				fields={fields}
				errors={errors}
			/> */}
			<div className={styles.button_container}>
				<Button
					disabled={loading}
					onClick={() => setShowEditProfileDetails(false)}
					style={{
						marginRight: 16,
					}}
				>
					profile.edit.buttons.cancel
				</Button>
				<Button
					disabled={loading}
					onClick={handleSubmit(onCreate, onError)}
				>
					s.tabOptions.profile.edit.buttons.update
				</Button>
			</div>
		</div>
	);
}

export default EditProfileDetails;
