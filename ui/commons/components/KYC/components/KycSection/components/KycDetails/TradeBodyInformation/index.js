import { Button } from '@cogoport/components';

import styles from './styles.module.css';
import useTradeBodyInformation from './useTradeBodyInformation';

import getField from '@/packages/forms/Controlled';

function TradeBodyInformation({
	channelPartnerDetails = {},
	kycDetails = {},
	setKycDetails = () => {},
}) {
	const {
		control,
		controls,
		handleSubmit = () => {},
		onSubmit = () => {},
		updateOrganizationAPILoading = false,
		formState = {},
	} = useTradeBodyInformation({
		channelPartnerDetails,
		kycDetails,
		setKycDetails,
	});

	const { errors = {} } = formState || {};

	return (
		<div className={styles.flex}>
			<div className={styles.sub_heading}>
				Please confirm the trade bodies, this is for smooth shipment for all
				your future bookings. We will keep in touch with you via phone or email
				if required.
			</div>

			<div className={styles.layout}>
				{controls.map((item) => {
					const Element = getField(item.type);
					return (
						<div className={styles.field}>
							<div className={styles.lable}>{item.label}</div>
							<Element {...item} control={control} />
							{errors && (
								<div className={styles.errors}>
									{errors[item?.name]?.message}
								</div>
							)}
						</div>
					);
				})}
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
