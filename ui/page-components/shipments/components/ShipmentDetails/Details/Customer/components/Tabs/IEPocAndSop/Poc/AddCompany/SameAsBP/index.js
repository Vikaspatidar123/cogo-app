import { Button, Checkbox } from '@cogoport/components';
import { useState } from 'react';

import styles from './styles.module.css';

import useCreateShipper from '@/ui/page-components/shipments/components/ShipmentDetails/hooks/useCreateShipper';

function SameAsBP({
	role = '',
	setUtilities = () => {},
	utilities = {},
	bookingPartyData = {},
	listServiceRefetch = () => {},
	listShipmentTradePartners = () => {},
	onClose,
}) {
	const [self, setSelf] = useState(false);
	const disabled = JSON.stringify(bookingPartyData) === '{}';
	const { handleAddShipper, loading } = useCreateShipper({
		role,
		bookingPartyData,
		setUtilities,
		utilities,
		listServiceRefetch,
		listShipmentTradePartners,
	});

	return (
		<div className={styles.container}>
			<div className={styles.checkout_box_container}>
				<Checkbox
					className="primary md"
					checked={self}
					onChange={setSelf}
					disabled={disabled}
				/>
				<span style={{ marginLeft: '8px' }}>Same as Booking Party</span>
			</div>
			<div className={styles.footer}>
				<div className={styles.line} />
				<div className={styles.button_container}>
					<Button
						onClick={() => onClose()}
						themeType="secondary"
						disabled={loading}
					>
						Cancel
					</Button>
					<Button
						className="primary md"
						onClick={handleAddShipper}
						disabled={disabled || loading}
					>
						Submit
					</Button>
				</div>
			</div>
		</div>
	);
}

export default SameAsBP;
