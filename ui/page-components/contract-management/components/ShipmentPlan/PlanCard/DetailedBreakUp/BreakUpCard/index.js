import { Pill, Tooltip, cl } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import { SERVICE_UNIT_MAPPING, SERVICE_VISE_KEYS_MAPPING } from '../../../../../constants';
import {generateServiceDisplayName} from '../../../../../utils/getDisplayNames';
import ServiceIcon from '../../../../../utils/getServiceIcon';
import PriceBreakup from '../../../PriceBreakup';

import getValueProps from './getValueProps';
import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

const SERVICE_PRICE_MAPPING = {
	basic_freight             : 'Basic Freight',
	additional_services_price : 'Inc.Additional Services',
};

function BreakUpCard({ service = {}, source = '' }) {
	const {
		shipment_data = {},
		additional_services = [],
		price_breakup,
		service_type,
	} = service || {};

	const [show, setShow] = useState(false);

	const { completed = 0, ongoing = 0 } = shipment_data;

	const valueProps = getValueProps({ service_type, serviceDetails: service });

	return (
		<div className={styles.container}>
			<div
				className={styles.map_container}
				role="presentation"
				onClick={() => {
					setShow((prev) => !prev);
				}}
			>
				<div
					style={{
						flexBasis   : '30%',
						borderRight : '1px dashed #828282',
					}}
				>
					<div className={styles.flex_box}>
						<div className={styles.flex_box}>
							{Object.values(valueProps.details).slice(0, 3)
								.map((value) => (
									<Pill key={value}>{value}</Pill>
								))}

							{Object.values(valueProps.details).length > 3 ? (
								<div className={styles.flex_box}>
									<Tooltip
										interactive
										placement="right"
										content={(
											<div className={styles.add_service}>
												{Object.values(valueProps.details)
													.slice(3)
													.map((value) => (
														<Pill className={styles.in_loop} key={value}>
															{value}
														</Pill>
													))}
											</div>
										)}
									>
										<div
											className={styles.service_tag}
											style={{ background: '#CFEAED' }}
										>
											View More
										</div>
									</Tooltip>
								</div>
							) : null}
						</div>
					</div>

					<div style={{ display: 'flex', marginInline: '4px', marginTop: '4px' }}>
						{!isEmpty(additional_services) && (
							<Pill>
								<ServiceIcon service={additional_services[0]} />
								{generateServiceDisplayName(additional_services[0])}
							</Pill>
						)}

						{additional_services?.length > 1 && (
							<Tooltip
								interactive
								placement="right"
								content={(
									<div className={styles.add_service}>
										{(additional_services.slice(1) || []).map((currService) => (
											<Pill className="in_loop">
												<ServiceIcon service={currService} />
												{generateServiceDisplayName(currService)}
											</Pill>
										))}
									</div>
								)}
							>
								<div className={styles.service_tag} style={{ background: '#CFEAED' }}>
									+
									{(additional_services?.length || 2) - 1}
									{' '}
									More
								</div>
							</Tooltip>
						)}

					</div>
				</div>

				<div className={styles.text_flex_box}>
					<div>
						<p className={cl`${styles.text} ${styles.light}`}>Ongoing </p>
						<p className={cl`${styles.text} ${styles.bold}`}>
							{ongoing}
							{' '}
							Shipments
						</p>
					</div>
					<div>
						<p className={cl`${styles.text} ${styles.light}`}>Completed </p>
						<p className={cl`${styles.text} ${styles.bold}`}>
							{completed}
							{' '}
							Shipments
						</p>
					</div>
					<div>
						<p className={cl`${styles.text} ${styles.light}`}>
							{SERVICE_VISE_KEYS_MAPPING[service_type]?.utilization}
						</p>
						{' '}
						<p className={cl`${styles.text} ${styles.bold}`}>{valueProps.utilization}</p>
					</div>
				</div>

				<div className={styles.service_flex_box}>
					{Object.keys(SERVICE_PRICE_MAPPING).map((info) => (
						<div key={info}>
							<p className={cl`${styles.text} ${styles.light}`}>{SERVICE_PRICE_MAPPING[info]}</p>
							<p className={cl`${styles.text} ${styles.price_bold}`}>
								{formatAmount({
									amount   : service?.[info].price,
									currency : service?.[info].currency,
									options  : {
										style                 : 'currency',
										currencyDisplay       : 'code',
										minimumFractionDigits : 2,
									},
								})}
								<span style={{ fontWeight: '300' }}>
									{SERVICE_UNIT_MAPPING[service_type]}
								</span>
							</p>

						</div>
					))}
				</div>

				{show ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
			</div>

			{show ? (
				<div>
					<PriceBreakup details={price_breakup} source={source} />
				</div>
			) : null}
		</div>
	);
}

export default BreakUpCard;
