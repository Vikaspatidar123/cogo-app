import { Button, cl } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp, IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { forwardRef, useState } from 'react';

import AddPoc from '../AddPoc';

import PocInfo from './PocInfo';
import styles from './styles.module.css';

import useGetPocList from '@/ui/page-components/shipments/components/ShipmentDetails/hooks/useGetPocList';

function PocDetails({
	stakeholder,
	isOkam,
	get,
	formRef,
	setUtilities = () => {},
	utilities,
	showAll,
	listShipmentTradePartners = () => {},
	tradePartyFilters,
	not_added_final_stakeholders,
	shipment_data,
}) {
	const [open, setOpen] = useState(false);
	const { roleCheck, businessName, addPocModal } = utilities;
	const { handleEdit, handleAddPoc } = useGetPocList({
		get,
		formRef,
		setUtilities,
		utilities,
		stakeholder,
		tradePartyFilters,
	});

	const stakeholders_display_arr = (not_added_final_stakeholders || []).map(
		(item) => item?.value,
	);

	const stakeholders_display_check = stakeholders_display_arr?.includes(
		stakeholder?.trade_party_type,
	);

	const collection_party_check = isOkam
		? stakeholder?.trade_party_type !== 'collection_party'
		&& stakeholders_display_check
		: stakeholder?.trade_party_type === 'collection_party';

	const condition = showAll || collection_party_check || stakeholders_display_check;
	const showButtons =	shipment_data?.shipment_type === 'ftl_freight'
		? !['consignee'].includes(stakeholder?.trade_party_type)
		: !['shipper', 'consignee'].includes(stakeholder?.trade_party_type);
	const renderAddPocModal = () => {
		if (showButtons) {
			return (
				<Button className="primary sm" onClick={handleAddPoc}>
					+ Add POC
				</Button>
			);
		}
		return null;
	};

	return (
		<>
			{condition ? (
				<div className={cl`${styles.detail_container} ${styles.poc_detail_blocks}`}>
					<div className={cl`${styles.poc_header} ${styles.poc_details_header}`}>
						<div>
							{stakeholder?.trade_party_type === 'self'
								? 'Booking Party'
								: startCase(stakeholder?.trade_party_type)}
						</div>
						{showButtons ? (
							<IcMEdit onClick={handleEdit} style={{ cursor: 'pointer' }} />
						) : null}
					</div>

					<div className={styles.poc_details_container}>
						<div className={styles.company_details}>
							<div className={styles.details}>
								{startCase(stakeholder?.trade_partner_details?.business_name)}
							</div>
							<div className={styles.wrapper}>
								{stakeholder?.trade_partner_details?.poc_data ? (
									<div
										role="presentation"
										className={styles.icon_container}
										onClick={() => setOpen(!open)}
									>
										{open ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
									</div>
								) : (
									renderAddPocModal()
								)}
							</div>
						</div>
						<div className={styles.address_details}>
							Address :
							{' '}
							{stakeholder?.address?.[0]?.address}
						</div>
						{open ? (
							<div className={styles.poc_list_container}>
								<div className={styles.poc_detail}>
									<PocInfo
										item={stakeholder?.trade_partner_details?.poc_data}
										workScopes={tradePartyFilters?.designation}
									/>
								</div>
							</div>
						) : null}
					</div>
				</div>
			) : null}

			{addPocModal ? (
				<AddPoc
					businessName={businessName}
					stakeholder={roleCheck}
					get={get}
					setUtilities={setUtilities}
					utilities={utilities}
					listShipmentTradePartners={listShipmentTradePartners}
				/>
			) : null}
		</>
	);
}

export default forwardRef(PocDetails);
