import { Tooltip } from '@cogoport/components';
import { isEmpty, startCase, upperCase } from '@cogoport/utils';

import { getUnit } from '../../../../utils/getUnit';

import styles from './styles.module.css';

function Commodities({ itemData }) {
	const {
		container_type = '',
		commodity,
		commodities = [],
		service_type = '',
		container_size = [],
		cargo_weight_per_container = '',
		inco_term = '',
		volume = '',
		weight = '',
		payment_type = '',
		max_containers_count = '',
		max_volume = '',
		max_weight = '',
		trade_type = '',
		additional_services = [],
	} = itemData || {};

	const count = max_containers_count || max_volume || max_weight;

	let commo;
	if (service_type === 'fcl_freight') {
		commo = commodity?.[0] || [];
	} else if (service_type === 'lcl_freight') {
		commo = commodity || '';
	}
	return (
		<div className={styles.container}>
			<div className={styles.card}>
				{count && (
					<div className={styles.tag}>
						{count}
						{' '}
						{getUnit(service_type)}
					</div>
				)}
				{(container_size || []).map((c) => (
					<div className={styles.tag}>
						{c}
						FT
					</div>
				))}
				{cargo_weight_per_container && (
					<div className={styles.tag}>
						{cargo_weight_per_container}
						MT
					</div>
				)}
				{weight && (
					<div className={styles.tag}>
						WT.
						{weight}
						KGS
					</div>
				)}
				{volume && (
					<div className={styles.tag}>
						VOL:
						{volume}
						CBM
					</div>
				)}
				{container_type && <div className={styles.tag}>{startCase(container_type)}</div>}
				{(commodities || [])?.map((c) => (
					<div className={styles.tag}>{startCase(c?.commodity_type)}</div>
				))}
				{commo && <div className={styles.tag}>{startCase(commo)}</div>}
				{inco_term && <div className={styles.tag}>{upperCase(inco_term)}</div>}
				{payment_type && <div className={styles.tag}>{startCase(payment_type)}</div>}
				{trade_type && <div className={styles.tag}>{startCase(trade_type)}</div>}
			</div>
			<div className={`${styles.card} ${styles.service_card}`}>
				<div className={styles.service_tag}>{startCase(service_type)}</div>
				{!isEmpty(additional_services) && (
					<div className={styles.service_tag}>{startCase(additional_services?.[0])}</div>
				)}
				{additional_services?.length > 1 && (
					<Tooltip
						theme="light-border"
						interactive
						animation="scale"
						placement="right"
						content={(
							<div className={styles.addl_service}>
								{(additional_services.slice(1) || []).map((v) => <div className={styles.service_tag}>{startCase(v)}</div>)}
							</div>
						)}
					>
						<div className={styles.service_tag}>
							+
							{additional_services?.length - 1}
							{' '}
							More
						</div>
					</Tooltip>
				)}
			</div>
		</div>
	);
}

export default Commodities;
