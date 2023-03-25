// import Layout from '@cogo/business-modules/form/Layout';

// import { ButtonContainer, LayoutContainer, SubHeading } from './styles';

import { Button } from '@cogoport/components';

import styles from './styles.module.css';
import useTradeBodyInformation from './useTradeBodyInformation';

function TradeBodyInformation({
	channelPartnerDetails = {},
	kycDetails = {},
	setKycDetails = () => {},
}) {
	const {
		controls = [],
		fields = {},
		handleSubmit = () => {},
		onSubmit = () => {},
		updateOrganizationAPILoading = false,
		formState = {},
	} = useTradeBodyInformation({
		channelPartnerDetails,
		kycDetails,
		setKycDetails,
	});

	return (
		<div className={styles.flex}>
			<div className={styles.sub_heading}>
				Please confirm the trade bodies, this is for smooth shipment for all
				your future bookings. We will keep in touch with you via phone or email
				if required.
			</div>

			<div className={styles.layout_container}>
				{/* <Layout controls={controls} fields={fields} errors={formState.errors} /> */}
			</div>

			<div className={styles.button_container}>
				<Button
					className="primary md"
					disabled={updateOrganizationAPILoading}
					onClick={handleSubmit(onSubmit)}
				>
					Save and Continue
				</Button>
			</div>
		</div>
	);
}

export default TradeBodyInformation;
