import { Button } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { useState } from 'react';

import AddExternalPoc from '../../AddExternalPoc';

import PocInfo from './PocInfo';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';
import getGeoConstants from '@/ui/commons/constants/geo';
import useGetPocList from '@/ui/page-components/shipments/components/ShipmentDetails/hooks/useGetPocList';

// const geo = getGeoConstants();

function ExternalPocs({
	setUtilities = () => {},
	utilities = {},
	tradePartyFilters = {},
	listShipmentTradePartners = () => {},
	shipment_data = {},
	tradePartnerData = {},
}) {
	const [openExport, setOpenExport] = useState(false);
	const [openImport, setOpenImport] = useState(false);

	const { handleAddExternalPoc } = useGetPocList({
		setUtilities,
		utilities,
		tradePartyFilters,
	});

	const {
		roleCheck = {},
		businessName = '',
		addExternlPocModal = false,
	} = utilities;
	const { partner } = useSelector(({ profile }) => ({
		partner: (profile || {}).partner || {},
	}));

	const canEditStakeholders = partner?.user_role_ids?.some((ele) => [
		// geo.uuid.super_admin_id,
		// geo.uuid.tech_support_role_id,
		// geo.uuid.prod_process_owner,
		// geo.uuid.admin_id,
	].includes(ele));

	const externalImportPOC = [];
	const externalExportPOC = [];

	(tradePartnerData.external_poc_details?.poc_data || []).forEach((item) => {
		if (item?.trade_type === 'import') {
			externalImportPOC.push(item);
		} else {
			externalExportPOC.push(item);
		}
	});

	return (
		<div className={styles.container}>
			<div className={styles.company_details}>
				<div className={`${styles.poc_container} ${styles.details}`}>
					External: Import
					<div className={styles.wrapper}>
						{canEditStakeholders ? (
							<Button
								className="primary sm"
								onClick={() => handleAddExternalPoc('import')}
							>
								+ Add POC
							</Button>
						) : null}
						{externalImportPOC.length ? (
							<div
								role="presentation"
								className={styles.icon_container}
								onClick={() => setOpenImport(!openImport)}
							>
								{openImport ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
							</div>
						) : null}
					</div>
				</div>
				{openImport ? (
					<div className={styles.poc_detail}>
						<div className={styles.trade_type}>Import</div>
						{(externalImportPOC || []).map((item) => <PocInfo item={item} />)}
					</div>
				) : null}

				<div className={`${styles.poc_container} ${styles.details}`}>
					External: Export
					<div className={styles.wrapper}>
						{canEditStakeholders ? (
							<Button
								className="primary sm"
								onClick={() => handleAddExternalPoc('export')}
							>
								+ Add POC
							</Button>
						) : null}
						{externalExportPOC.length ? (
							<div
								role="presentation"
								className={styles.icon_container}
								onClick={() => setOpenExport(!openExport)}
							>
								{openExport ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
							</div>
						) : null}
					</div>
				</div>
				{openExport ? (
					<div className={styles.poc_detail}>
						<div className={styles.trade_type}>Export</div>
						{(externalExportPOC || []).map((item) => <PocInfo item={item} />)}
					</div>
				) : null}
			</div>

			{addExternlPocModal ? (
				<AddExternalPoc
					businessName={businessName}
					stakeholder={roleCheck}
					setUtilities={setUtilities}
					utilities={utilities}
					listShipmentTradePartners={listShipmentTradePartners}
					shipment_data={shipment_data}
				/>
			) : null}
		</div>
	);
}

export default ExternalPocs;
