// import { Button } from '@cogoport/front/components/admin';
// import { startCase } from '@cogoport/front/utils';
// import { IcMArrowRotateUp, IcMArrowRotateDown } from '@cogoport/icons-react';
import { Button } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';
import AddPoc from '../AddPoc';
import PocInfo from '../PocDetails/PocInfo';

import styles from './styles.module.css';
// import AddPoc from '../AddPoc';
// import PocInfo from '../PocDetails/PocInfo';

// import {
// 	PocHeader,
// 	PocDetailsContainer,
// 	DetailsContainer,
// 	CompanyDetails,
// 	PocDetail,
// 	IconContainer,
// 	Wrapper,
// 	PocListContainer,
// } from './styles';

function PocServProvDetails({
	workScopes,
	item,
	index,
	setUtilities = () => {},
	utilities,
	listShipmentTradePartners = () => {},
	tradePartnerData,
	service_providers,
}) {
	const [open, setOpen] = useState(false);
	const { businessName } = utilities;

	const handleAddPocModal = () => {
		setUtilities({
			...utilities,
			servProvId   : item?.service_provider_id,
			businessName : item?.service_provider?.business_name,
			addPocModal  : true,
		});
	};

	return (
		<div>
			<div className={styles.details_container}>
				<div className={styles.poc_header}>
					<div>
						Service Provider
						{' '}
						{service_providers?.length > 1 ? index + 1 : ''}
					</div>
				</div>

				<div className={styles.poc_details_container}>
					<div className={styles.company_details}>
						<div className={styles.details}>
							{startCase(item?.service_provider?.business_name)}
						</div>
						<div className={`${styles.wrapper} ${styles.poc_details_header}`}>
							<Button className="primary sm" onClick={handleAddPocModal}>
								+ Add POC
							</Button>

							{tradePartnerData?.service_provider_details?.poc_data?.length ? (
								<div
									role="presentation"
									className={styles.icon_container}
									onClick={() => setOpen(!open)}
								>
									{open ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
								</div>
							) : null}
						</div>
					</div>
					{open ? (
						<div className={styles.poc_list_container}>
							<div className={styles.poc_detail}>
								{(
									tradePartnerData?.service_provider_details?.poc_data || []
								).map((sp) => {
									if (sp?.organization_id !== item?.service_provider_id) {
										return null;
									}
									return <PocInfo item={sp} workScopes={workScopes} />;
								})}
							</div>
						</div>
					) : null}
				</div>
			</div>

			{utilities?.addPocModal ? (
				<AddPoc
					businessName={businessName}
					setUtilities={setUtilities}
					utilities={utilities}
					listShipmentTradePartners={listShipmentTradePartners}
				/>
			) : null}
		</div>
	);
}

export default PocServProvDetails;
