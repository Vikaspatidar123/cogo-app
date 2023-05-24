import { IcMTick } from '@cogoport/icons-react';
import { upperCase, startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function ContainerInfo({ detail }) {
	const { packages = [] } = detail || {};
	const labels = [
		'container_size',
		'containers_count',
		'container_type',
		'commodity',
		'inco_term',
		'trucks_count',
		'trade_type',
		'packages',
		'volume',
		'weight',
		'haulage_type',
		'transport_mode',
		'cargo_stacking_type',
		'msds_document',
	];

	const valueForInput = Array.isArray(packages) && packages?.length > 0 ? packages[0] : null;

	const inputValue = valueForInput
		? `${valueForInput?.packages_count} Pkg, ${valueForInput?.packing_type}`
		: '';
	const packageDetails = `Package: ${inputValue} ${
		packages?.length > 1 ? `+ ${(packages?.length || 0) - 1} more` : ''
	}`;

	const renderValue = (label) => {
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
			case 'container_type':
				return startCase(detail.container_type || '');
			case 'trade_type':
				return startCase(detail.trade_type || '');
			case 'commodity':
				return startCase(detail.commodity || '');
			case 'inco_term':
				return `Inco - ${upperCase(detail.inco_term || '')}`;
			case 'packages':
				if (packages?.length === 0) {
					return null;
				}
				return packageDetails;
			case 'volume':
				return `Vol. - ${detail.volume} cbm`;
			case 'weight':
				return `Weight. - ${detail.weight} Kgs`;
			case 'haulage_type':
				return startCase(detail.haulage_type || '');
			case 'transport_mode':
				return startCase(detail.transport_mode || '');
			case 'cargo_stacking_type':
				return startCase(detail.cargo_stacking_type || '');
			case 'msds_document':
				// return `msds${(<Tick />)}`;
				return detail.commodity_details[0].msds_document
					? `msds${(<IcMTick />)}`
					: null;
			default:
				return null;
		}
	};

	return (
		<div className={styles.flex} style={{ flexWrap: 'wrap' }}>
			{labels.map((label) => {
				const chipValue = detail[label] ? renderValue(label) : null;
				if (chipValue) {
					return (
						<div className={styles.box} key={label}>
							{chipValue}
						</div>
					);
				}

				return null;
			})}
		</div>
	);
}

export default ContainerInfo;
