import { startCase, upperCase } from '@cogoport/utils';
import React from 'react';

import styles from '../components/Shipments/styles.module.css';

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
		'rates_count',
	];

	const valueForInput = Array.isArray(packages) && packages?.length > 0 ? packages[0] : null;

	const inputValue = valueForInput
		? `${valueForInput.packages_count} Pkg, ${valueForInput?.length} X ${valueForInput?.width} X ${
			valueForInput?.height}, ${valueForInput?.packing_type}`
		: '';
	const packageDetails = `Package: ${inputValue} ${
		packages?.length > 1
			? `+ ${(packages?.length || 0) - 1} more`
			: ''
	}`;

	const renderValue = (label) => {
		switch (label) {
			case 'container_size':
				return `${detail.container_size || '--'} ft`;
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
					return "1 Package'";
				}

				return `${detail.packages_count} "Packages"`;
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
				return `"Vol". - ${
					detail.volume
				} "cbm"`;
			case 'weight':
				return `Weight. - ${
					detail.weight
				} Kgs`;
			case 'rates_count':
				return `"Rates count": ${
					detail.rates_count
				}`;
			default:
				return null;
		}
	};

	return (
		<>
			{labels.map((label) => {
				const color = label === 'inco_term' ? '#FBE6E6' : '#f2f2f2';
				if (detail[label]) {
					return (
						<div
							className={styles.container_details_text}
							style={{ background: color }}
							key={label}
						>
							{renderValue(label)}
						</div>
					);
				}
				return null;
			})}
		</>
	);
}

export default ContainerInfo;
