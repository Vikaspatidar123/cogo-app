import { cl } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import PocInfo from '../PocDetails/PocInfo';

import styles from './styles.module.css';

function InvoicingParties({
	tradePartnerData = {},
	tradePartyFilters = {},
}) {
	const [open, setOpen] = useState(false);
	const { invoicing_parties_details } = tradePartnerData || {};

	return (
		<div>
			{(invoicing_parties_details || []).map((item, index) => (
				<div className={styles.detail_container}>
					<div className={cl`${styles.poc_header} ${styles.poc_details_header}`}>
						<div className={styles.details}>
							Invoicing Party
							{' '}
							{invoicing_parties_details?.length === 1 ? '' : index + 1}
						</div>
					</div>

					<div className={styles.poc_detail_container}>
						<div className={styles.company_details}>
							<div className={`${styles.company_name} ${styles.details}`}>
								{item?.business_name}
								{item?.poc_data?.length ? (
									<div
										role="presentation"
										className={styles.icon_container}
										onClick={() => setOpen(!open)}
									>
										{open ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
									</div>
								) : null}
							</div>

							<div style={{ display: 'flex' }}>
								<div className="service-text">Services :</div>

								<div className={styles.service}>
									{(item?.services || []).map((services, indexing) => (
										<div className="services">
											{startCase(services)}
											{indexing + 1 === item?.services?.length ? '' : ', '}
										</div>
									))}
								</div>
							</div>
							{open ? (
								<div className={styles.poc_container}>
									<div className={styles.poc_list}>
										{(item?.poc_data || []).map((poc_details) => (
											<PocInfo
												item={poc_details}
												workScopes={tradePartyFilters?.designation}
											/>
										))}
									</div>
								</div>
							) : null}
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default InvoicingParties;
