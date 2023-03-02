import { Tooltip, Pill } from '@cogoport/components';
import { IcCFtick } from '@cogoport/icons-react';
import { startCase, upperCase } from '@cogoport/utils';

import styles from './styles.module.css';

function ContainerInfo({ data = {} }) {
	const { packages = [] } = data || {};
	const packageLength = packages?.length;
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

	const valueForInput = Array.isArray(packages) && packageLength > 0 && packages[0];

	const inputValue = valueForInput
		? `${valueForInput?.packages_count} Pkg, ${valueForInput?.packing_type}`
		: '';
	const packageDetails = `Package: ${inputValue} ${
		packages?.length > 1 ? `+ ${packageLength - 1} more` : ''
	}`;

	const renderValue = (label) => {
		switch (label) {
			case 'container_size':
				if (data.container_size.includes('HC')) {
					return data.container_size.replace('HC', 'ft HC');
				}
				return `${data.container_size || '--'}ft`;
			case 'containers_count':
				if (!data.containers_count) {
					return null;
				}

				if (data.containers_count === 1) {
					return '1 Container';
				}

				return `${data.containers_count} Containers`;
			case 'packages_count':
				if (!data.packages_count) {
					return null;
				}

				if (data.packages_count === 1) {
					return '1 Package';
				}

				return `${data.packages_count} Packages`;
			case 'trucks_count':
				if (!data.trucks_count) {
					return null;
				}

				if (data.trucks_count === 1) {
					return '1 Truck';
				}

				return `${data.trucks_count} Trucks`;
			case 'container_type':
				return startCase(data.container_type || '');
			case 'trade_type':
				return startCase(data.trade_type || '');
			case 'commodity':
				return startCase(data.commodity || '');
			case 'inco_term':
				return `Inco - ${upperCase(data.inco_term || '')}`;
			case 'packages':
				if (packages?.length === 0) {
					return null;
				}
				return packageDetails;
			case 'volume':
				return `Vol. - ${data.volume} cbm`;
			case 'weight':
				return `Weight. - ${data.weight} Kgs`;
			case 'haulage_type':
				return startCase(data.haulage_type || '');
			case 'transport_mode':
				return startCase(data.transport_mode || '');
			case 'cargo_stacking_type':
				return startCase(data.cargo_stacking_type || '');
			case 'msds_document':
				// return `msds${(<Tick />)}`;
				return data.commodity_details[0].msds_document ? `msds${(<IcCFtick />)}` : null;
			default:
				return null;
		}
	};
	const renderBox = () => {
		const value = labels.map((label) => {
			const chipValue = data[label] ? renderValue(label) : null;
			if (chipValue) {
				return <Pill key={label} size="sm">{chipValue}</Pill>;
			}
			return false;
		});
		return value;
	};
	let numberBox = 0;
	return (
		<Tooltip content={renderBox()} placement="bottom" className={styles.toolContent}>
			<div>
				{labels.map((label) => {
					const chipValue = data[label] ? renderValue(label) : null;
					if (chipValue && numberBox < 3) {
						numberBox += 1;
						return <Pill key={label} size="sm">{chipValue}</Pill>;
					}

					return null;
				})}
				<Pill size="sm">...</Pill>
			</div>
		</Tooltip>
	);
}

export default ContainerInfo;
