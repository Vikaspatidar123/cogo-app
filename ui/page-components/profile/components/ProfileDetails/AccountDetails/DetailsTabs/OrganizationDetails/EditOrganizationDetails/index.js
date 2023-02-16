import { Button } from '@cogoport/components';

import useEditOrganizationDetails from '../hooks/useEditOrganizationDetails';

import styles from './styles.module.css';

function EditOrganizationDetails({
	setShowEditOrganizationDetails = () => { },
	organizationType = '',
	getOrganization,
	organizationData = {},
}) {
	const {
		showElements,
		controls,
		fields,
		errors,
		loading,
		handleSubmit,
		onCreate,
		onError,
	} = useEditOrganizationDetails({
		organizationType,
		getOrganization,
		organizationData,
		setShowEditOrganizationDetails,
	});

	return (
		<div className={styles.layout_container}>
			{/* <Layout
				showElements={showElements}
				controls={controls}
				fields={fields}
				errors={errors}
			/> */}

			<div className={styles.button_container}>
				<Button
					themeType="tertiary"
					size="md"
					disabled={loading}
					style={{
						marginRight: 16,
					}}
					onClick={() => setShowEditOrganizationDetails(false)}
				>
					Cancel
				</Button>
				<Button
					themeType="accent"
					size="md"
					disabled={loading}
					onClick={handleSubmit(onCreate, onError)}
				>
					update
				</Button>
			</div>
		</div>
	);
}

export default EditOrganizationDetails;
