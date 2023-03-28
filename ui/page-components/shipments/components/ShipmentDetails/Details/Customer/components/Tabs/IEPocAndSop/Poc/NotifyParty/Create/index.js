// import { CheckBox, Button } from '@cogoport/front/components/admin';
import { Checkbox, Button } from '@cogoport/components';
import { useState } from 'react';

import styles from './styles.module.css';

import useCreateAddCompany from '@/ui/page-components/shipments/components/ShipmentDetails/hooks/useCreateAddCompany';

// import useCreateAddCompany from '../../../hooks/useCreateShipAndCons';

// import { Container, CheckoutBoxContainer, ButtonContainer } from './styles';

function Create({
	tradePartnerData = {},
	listShipmentTradePartners = () => {},
}) {
	const [shipper, setShipper] = useState(false);
	const [bookingParty, setBookingParty] = useState(false);
	const [consignee, setConsignee] = useState(false);

	const { handleAddCompany } = useCreateAddCompany({
		roleCheck: 'notify_party',
		listShipmentTradePartners,
	});

	const addBookingParty = tradePartnerData.list?.find(
		(item) => item?.trade_party_type === 'self',
	)?.trade_partner_details?.poc_data;

	const addShipper = tradePartnerData?.list?.find(
		(item) => item?.trade_party_type === 'shipper',
	)?.trade_partner_details?.poc_data;

	const addConsignee = tradePartnerData?.list?.find(
		(item) => item?.trade_party_type === 'consignee',
	)?.trade_partner_details?.poc_data;

	const handleSubmit = () => {
		const dependentTradePartner = [];
		if (shipper) {
			dependentTradePartner.push('shipper');
		}
		if (consignee) {
			dependentTradePartner.push('consignee');
		}
		if (bookingParty) {
			dependentTradePartner.push('self');
		}
		handleAddCompany(dependentTradePartner);
	};

	return (
		<div>
			<div className={styles.checkout_box_container}>
				<Checkbox
					className="primary md"
					checked={bookingParty}
					onChange={setBookingParty}
					disabled={addBookingParty === undefined || !addBookingParty}
				/>
				<span style={{ marginLeft: '8px' }}>Booking Party</span>
			</div>
			<div className={styles.checkout_box_container}>
				<Checkbox
					className="primary md"
					checked={shipper}
					onChange={setShipper}
					disabled={addShipper === undefined || !addShipper}
				/>
				<span style={{ marginLeft: '8px' }}>Shipper</span>
			</div>
			<div className={styles.checkout_box_container}>
				<Checkbox
					className="primary md"
					checked={consignee}
					onChange={setConsignee}
					disabled={addConsignee === undefined || !addConsignee}
				/>
				<span style={{ marginLeft: '8px' }}>Consignee</span>
			</div>
			<div className={styles.button_container}>
				<Button
					style={{ margin: '0px 8px' }}
					className="primary md"
					onClick={handleSubmit}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}

export default Create;
