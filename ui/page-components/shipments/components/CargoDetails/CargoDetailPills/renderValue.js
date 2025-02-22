import { Popover } from '@cogoport/components';
import { IcMOpenlink } from '@cogoport/icons-react';
import { startCase, upperCase } from '@cogoport/utils';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

const getFormattedDateTime = ({ date }) => (
	formatDate({
		date,
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
		formatType : 'dateTime',
	})
);

const getFormattedDate = ({ date }) => {
	formatDate({
		date,
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		formatType : 'date',

	});
};

export const renderValue = (label, detail) => {
	const { packages = [] } = detail || {};
	const isAir =		detail?.service_type === 'air_freight_service'
		|| detail?.service_type === 'domestic_air_freight_service';
	const isLTL =		detail?.service_type === 'ltl_freight_service'
		|| detail?.services?.includes('ltl_freight_service');

	const valueForInput = Array.isArray(packages) && packages?.length > 0 ? packages[0] : null;

	const chargableWeight = isLTL
		? detail?.chargable_weight || detail?.weight
		: Math.max((detail?.volume || 0) * 166.67, detail?.weight);

	const dimension = valueForInput?.length
		? `${valueForInput?.length}cm X ${valueForInput?.width}cm X ${valueForInput?.height}cm,`
		: '';

	const inputValue = valueForInput
		? `${valueForInput.packages_count} Pkg, ${dimension} ${startCase(
			valueForInput?.packing_type,
		)}`
		: '';

	const lr_number = detail?.lr_number;
	const eway_bill_number = detail?.eway_bill_number;

	const volume = ` ${detail.volume} ${isLTL ? 'cc' : 'cbm'}`;

	const packageDetails = () => {
		if (packages?.length > 1) {
			return (
				<Popover
					placement="bottom"
					theme="light"
					render={(
						<div style={{ fontSize: '10px' }}>
							{(packages || []).map((item) => {
								const values = item
									? `${item.packages_count} Pkg, (${item?.length}cm X ${
										item?.width
									}cm X ${item?.height}cm), ${startCase(item?.packing_type)}`
									: '';
								return <div>{values}</div>;
							})}
						</div>
					)}
				>
					<div className="cargo-details-info">
						{`Package: ${inputValue} + ${
							(packages?.length || 0) - 1
						} more`}

					</div>
				</Popover>
			);
		}
		return `Package: ${inputValue}`;
	};

	const formatPocData = (pocDetails) => (
		<div>
			<div>{pocDetails?.name}</div>
			<div>
				{pocDetails?.mobile_country_code}
				-
				{pocDetails?.mobile_number}
			</div>
			<div>{pocDetails?.email}</div>
		</div>
	);

	const formatShipperDetails = (shipperDetails) => (
		<div>
			<div>{shipperDetails?.name}</div>
			<div>{shipperDetails?.address}</div>
		</div>
	);

	const formatCertificate = (certificates) => (
		<div className={styles.certificate_container}>
			{(certificates || []).map((item, key) => (
				<a href={item} target="_blank" rel="noreferrer">
					Click to view certificate
					{' '}
					{key + 1}
					{' '}
					<IcMOpenlink />
					<br />
				</a>
			))}
		</div>
	);

	switch (label) {
		case 'container_size':
			if (detail.container_size.includes('HC')) {
				return detail.container_size.replace('HC', 'ft HC');
			}
			return `${detail.container_size || '--'}ft`;
		case 'containers_count':
			if (!detail.containers_count) {
				return null;
			}

			if (detail.containers_count === 1) {
				return '1 Container';
			}

			return `${detail.containers_count} Containers`;
		case 'packages_count':
			if (!detail.packages_count) {
				return null;
			}

			if (detail.packages_count === 1) {
				return '1 Package';
			}

			return `${detail.packages_count} Packages`;
		case 'trucks_count':
			if (!detail.trucks_count) {
				return null;
			}

			if (detail.trucks_count === 1) {
				return '1 Truck';
			}

			return `${detail.trucks_count} Trucks`;
		case 'truck_type':
			return startCase(detail.truck_type || '');
		case 'container_type':
			return startCase(detail.container_type || '');
		case 'trade_type':
			return startCase(detail.trade_type || '');
		case 'commodity':
			return startCase(detail.commodity || '');
		case 'payment_term':
			return startCase(detail.payment_term || '');
		case 'inco_term':
			return `Inco - ${upperCase(detail.inco_term || '')}`;
		case 'packages':
			if (packages?.length === 0) {
				return null;
			}
			return packageDetails();

		case 'volume':
			return ` ${volume} ${
				detail.service_type === 'ftl_freight_service'
				|| detail.service_type === 'haulage_freight_service'
					? ''
					: `, Chargeable Weight: ${chargableWeight.toFixed(2)} kg`
			}`;

		case 'lr_number':
			if (isLTL) {
				return `Docket Number : ${lr_number || ''}`;
			}
			return '';

		case 'master_airway_bill_number':
			if (isAir) {
				return `MAWB Number: ${detail?.master_airway_bill_number || ''}`;
			}
			return '';
		case 'house_airway_bill_number':
			if (isAir) {
				return `HAWB Number: ${detail?.house_airway_bill_number || ''}`;
			}
			return '';
		case 'eway_bill_number':
			if (isLTL) {
				return `Eway Bill Number : ${eway_bill_number || ''}`;
			}
			return '';
		case 'airline':
			if (isAir) {
				return `Airline : ${detail?.airline?.business_name || ''}`;
			}
			return '';
		case 'weight':
			return ` ${detail.weight} kgs`;
		case 'haulage_type':
			return startCase(detail.haulage_type || '');
		case 'transport_mode':
			return startCase(detail.transport_mode || '');
		case 'cargo_weight_per_container':
			return `${detail.cargo_weight_per_container} MT`;
		case 'destination_cargo_handling_type':
			return startCase(detail.destination_cargo_handling_type || '');
		case 'origin_cargo_handling_type':
			return startCase(detail.origin_cargo_handling_type || '');
		case 'container_status':
			return startCase(detail.container_status || '');
		case 'source':
			return detail?.source === 'direct'
				? 'Sell Without Buy'
				: startCase(detail.source || '');
		case 'shipping_line.business_name':
			return detail.shipping_line?.business_name;
		case 'preferred_shipping_line.business_name':
			return detail.preferred_shipping_line?.business_name;
		case 'state':
			return startCase(detail.state || '');
		case 'origin_port.display_name':
			return detail?.origin_port?.display_name || '';
		case 'destination_port.display_name':
			return detail?.destination_port?.display_name || '';
		case 'origin_main_port.display_name':
			return detail?.origin_main_port?.display_name || '';
		case 'destination_main_port.display_name':
			return detail?.destination_main_port?.display_name || '';
		case 'origin_location.display_name':
			return detail.origin_location.display_name || '';
		case 'container_handover_location':
			return detail.container_handover_location.display_name || '';
		case 'container_pickup_location':
			return detail.container_pickup_location.display_name || '';
		case 'destination_location.display_name':
			return detail.destination_location.display_name || '';
		case 'schedule_departure':
			return getFormattedDateTime({ date: detail?.schedule_departure || detail?.selected_schedule_departure });
		case 'schedule_arrival':
			return getFormattedDateTime({ date: detail?.schedule_arrival || detail?.selected_schedule_arrival });
		case 'bn_expiry':
			return getFormattedDateTime({ date: detail?.bn_expiry });
		case 'booking_note_deadline':
			return getFormattedDateTime({ date: detail?.booking_note_deadline });
		case 'si_cutoff':
			return getFormattedDateTime({ date: detail?.si_cutoff });
		case 'vgm_cutoff':
			return getFormattedDateTime({ date: detail?.vgm_cutoff || '' });
		case 'gate_in_cutoff':
			return getFormattedDateTime({ date: detail?.gate_in_cutoff });
		case 'document_cutoff':
			return getFormattedDateTime({ date: detail?.document_cutoff });
		case 'tr_cutoff':
			return getFormattedDateTime({ date: detail?.tr_cutoff });
		case 'iip_certificates':
			return formatCertificate(detail?.iip_certificates || []);
		case 'msds_certificates':
			return formatCertificate(detail?.msds_certificates || []);
		case 'bl_category':
			return upperCase(detail.bl_category);
		case 'bl_type':
			return upperCase(detail.bl_type);
		case 'cargo_readiness_date':
			return getFormattedDate({ date: detail?.cargo_readiness_date });
		case 'supplier_poc':
			return formatPocData(detail?.supplier_poc || {});
		case 'origin_oversea_agent':
			return formatPocData(detail?.origin_oversea_agent || {});
		case 'shipper_details':
			return formatShipperDetails(detail?.shipper_details || {});
		case 'buy_quotation_agreed_rates':
			return `${detail?.buy_quotation_agreed_rates.toFixed(2)} USD`;
		case 'hs_code':
			return `${detail?.hs_code?.hs_code} - ${detail?.hs_code?.name}`;

		case 'delivery_date':
			return getFormattedDate({ date: detail?.delivery_date });

		case 'container_load_type':
			return startCase(detail?.container_load_type);

		default:
			return detail[label] || null;
	}
};
