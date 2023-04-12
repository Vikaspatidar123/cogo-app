import { Input } from '@cogoport/components';
import { useEffect } from 'react';

import FilterButton from '../FilterButton';

import styles from './styles.module.css';

import { useDebounceQuery } from '@/packages/forms';

function Header({ filters, hookSetters, config, viewAs }) {
	const { serial_id, ...restFilters } = filters || {};

	const renderFilters = (
		<FilterButton
			filters={restFilters}
			setFilters={(val) => {
				hookSetters.setFilters({
					...(val || {}),
					serial_id : serial_id || undefined,
					page      : 1,
				});
			}}
			isScrollable={(config.filter_controls || []).length > 5}
			controls={config.filter_controls}
			dynamicKey={
				viewAs === 'importer_exporter' ? 'shipment_type' : 'service_type'
			}
		/>
	);
	const { debounceQuery, query } = useDebounceQuery();
	useEffect(() => {
		if (query !== undefined && query !== null) {
			hookSetters.setFilters((prev) => ({
				...prev,
				serial_id: query,
			}));
		}
	}, [query]);

	return (
		<div className={styles.container} style={{ marginBottom: 40, marginLeft: 15 }}>
			<h2>Shipments</h2>
			<div className={styles.right}>
				<Input
					size="sm"
					style={{ marginRight: 10 }}
					onChange={(e) => {
						debounceQuery(e);
					}}
					placeholder="Shipment ID"
					className={styles.input}
				/>
				{renderFilters}
			</div>
		</div>
	);
}

export default Header;
