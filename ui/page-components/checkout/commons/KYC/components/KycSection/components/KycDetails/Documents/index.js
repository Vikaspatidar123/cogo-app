import Layout from '@cogo/business-modules/form/Layout';
import { Button } from '@cogoport/front/components/admin';

// import { LayoutContainer } from './styles';

import styles from './styles.module.css';
import useDocuments from './useDocuments';

function Documents({
	channelPartnerDetails = {},
	kycDetails = {},
	setKycDetails = () => {},
}) {
	const {
		fields = {},
		handleSubmit = () => {},
		onSubmit = () => {},
		controls = [],
		formState = {},
		createChannelPartnerVerificationDocumentLoading = false,
	} = useDocuments({
		channelPartnerDetails,
		kycDetails,
		setKycDetails,
	});

	return (
		<div style={{ display: 'flex', flexdirection:"column"}}>
			<div style={{ color: '#333333' }}>
				We need these documents to check the legitamacy of your organization
			</div>

			<div className={styles.layout_container}>
				<Layout controls={controls} fields={fields} errors={formState.errors} />
			</div>

			<div style={{ display: 'flex',justifyContent:"flex-end"}}>
				<Button
					disabled={createChannelPartnerVerificationDocumentLoading}
					onClick={handleSubmit(onSubmit)}
				>
					SAVE AND CONTINUE
				</Button>
			</div>
		</div>
	);
}

export default Documents;
