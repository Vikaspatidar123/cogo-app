import Layout from '@cogo/business-modules/form/Layout';
import { Button } from '@cogoport/front/components/admin';

// import { LayoutContainer } from './styles';
import styles from './styles.module.css';
import useCompanyDetails from './useCompanyDetails';

function CompanyDetails({
	channelPartnerDetails = {},
	kycDetails = {},
	setKycDetails = () => {},
}) {
	const {
		controls = [],
		fields = {},
		handleSubmit = () => {},
		onSubmit = () => {},
		loading = false,
		formState = {},
	} = useCompanyDetails({
		channelPartnerDetails,
		setKycDetails,
		kycDetails,
	});

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<div style={{ color: '#333333' }}>
				Kindly check the details before you proceed
			</div>

			<div className={styles.layout_container}>
				<Layout controls={controls} fields={fields} errors={formState.errors} />
			</div>

			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button disabled={loading} onClick={handleSubmit(onSubmit)}>
					SAVE AND CONTINUE
				</Button>
			</div>
		</div>
	);
}

export default CompanyDetails;
