import { Button } from '@cogoport/components';
import { IcMFship, IcMPortArrow } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import ContainerDetails from '../../../common/ContainerDetails';
import { getLocation } from '../../../common/location';
import ServiceTypeIcon from '../ServiceTypeIcon';
import styles from '../styles.module.css';

import { useRouter } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';
import getText from '@/ui/page-components/dashboard/common/getText';

const SINGLE_LOCATION = [
	'fcl_customs',
	'lcl_customs',
	'air_customs',
	'fcl_cfs',
];
function RenderStatus({ ogShipmentData, service }) {
	const { t } = useTranslation(['dashboard']);

	const textObj = getText({ shipment_data: ogShipmentData, services: service, t });

	return (
		<text className={styles.text} style={{ backgroundColor: textObj.color }}>
			{textObj.text}
		</text>
	);
}
function OnGoingShipmentsCard(props) {
	const {
		container_size = '', container_type = '',
		containers_count = '', commodity = '',
		cargo_weight_per_container = '',
		inco_term = '',
		rates_count = '',
		trucks_count = '',
		trade_type = '',
		packages = '',
		volum = '',
		weight = '',
		serial_id = '',
		service_type = '',
		shipment_type = '',
		selected_schedule_departure = '',
		selected_schedule_arrival = '',
		last_updated_at = '',
		services = '',
		id = '',
		pending_tasks_count = '',
		data = {},
	} = props || {};
	const containerInfoData = {
		container_size,
		container_type,
		containers_count,
		commodity,
		cargo_weight_per_container,
		inco_term,
		rates_count,
		trucks_count,
		trade_type,
		packages,
		volum,
		weight,
	};
	const { push } = useRouter();
	const { t } = useTranslation(['dashboard']);

	return (
		<div>

			<div className={styles.second}>
				<div className={styles.inner}>
					<div className={styles.data}>
						<div className={styles.first_data}>
							<div className={styles.id}>
								<p className={styles.sub_id}>
									{t('dashboard:common_serialId_label')}
									:
								</p>
								<div className={styles.sub}>
									{serial_id}
								</div>
							</div>
							<div className={styles.sub_lcl}>
								<ServiceTypeIcon
									freight_type={
                                        service_type
                                        || shipment_type
                                    }
								/>
							</div>
						</div>

						{SINGLE_LOCATION.includes(service_type || shipment_type) ? (
							<div className={styles.second_box}>
								{getLocation(true, props).location}
								<span className={styles.location_span}>
									{getLocation(false, props).country}
								</span>
							</div>
						) : (
							<div className={styles.second_data}>
								<div className={styles.origin}>
									{getLocation(true, props).location}
									<span className={styles.location_span}>
									{getLocation(false, props).country}
								</span>
								</div>
								<div>
									<IcMPortArrow />
								</div>
								<div className={styles.origin}>
									{getLocation(false, props).location}
									<span
									className={styles.location_span}
								>
									{getLocation(false, props).country}
								</span>
								</div>
							</div>
						)}
						<ContainerDetails
							containerInfoData={containerInfoData}
							service_type={service_type || shipment_type}
						/>
						<div className={styles.fouth_data}>
							<div className={styles.first_row}>
								<IcMFship
									className={styles.image}
								/>
								{selected_schedule_departure ? (
									<p
										className={styles.arrive}
									>
										<span className={styles.span}>
										{t('dashboard:onGoingShipments_card_text_1')}
                                            &nbsp;
									</span>
										{formatDate({
                                        	date       : selected_schedule_departure,
                                        	dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
                                        	formatType : 'date',
									})}
									</p>
								) : null}
							</div>
							{selected_schedule_arrival ? (
								<p className={styles.dept}>
									<span className={styles.span}>
										{t('dashboard:onGoingShipments_card_text_2')}
										{' '}
                                        &nbsp;
									</span>
									{formatDate({
                                    	date       : selected_schedule_arrival,
                                    	dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
                                    	formatType : 'date',
									})}
								</p>
							) : null}
							{last_updated_at ? (
								<p className={styles.update}>
									<span
										className={styles.span}
									>
										{t('dashboard:onGoingShipments_card_text_3')}
                                        &nbsp;
									</span>
									{formatDate({
                                    	date       : last_updated_at,
                                    	dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
                                    	formatType : 'date',
									})}
								</p>
							) : null}
						</div>
					</div>

					<div className={styles.details}>
						<RenderStatus
							ogShipmentData={data}
							service={services}
						/>
						<Button
							onClick={() => push('/shipments/[id]', `/shipments/${id}`)}
							size="sm"
							themeType="secondary"
							type="button"
						>
							{t('dashboard:onGoingShipments_card_text_5')}
						</Button>
						{pending_tasks_count ? (
							<div className={styles.dot}>
								<div className={styles.dot2} />
								<p className={styles.tasks}>
									{pending_tasks_count}
									<span className={styles.pending}>
										{t('dashboard:onGoingShipments_card_text_4')}
									</span>
								</p>
							</div>
						) : null}
					</div>
				</div>
			</div>

		</div>
	);
}
export default OnGoingShipmentsCard;
