import { Input } from '@cogoport/components';
import { useEffect } from 'react';

import FilterButton from '../FilterButton';

import styles from './styles.module.css';

import { useDebounceQuery } from '@/packages/forms';
// import { useRouter } from '@/packages/next';

function Header({ filters, hookSetters, config, viewAs }) {
	const { serial_id, ...restFilters } = filters || {};
	// const { push } = useRouter();

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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query]);

	return (
		<div className={styles.container} style={{ marginBottom: 40, marginLeft: 15 }}>
			<h2>Shipments</h2>
			<div className={styles.right}>
				{renderFilters}
				<Input
					size="sm"
					style={{ margin: '0px 10px', width: '200px' }}
					onChange={(e) => {
						debounceQuery(e);
					}}
					placeholder="Shipment ID"
					className={styles.input}
				/>

				{/* <Button
					size="md"
					themeType="secondary"
					type="button"
					onClick={() => push('/shipment-report?type=shipment')}
				>
					View Shipment Status Report
				</Button> */}
			</div>
		</div>
	);
}

export default Header;
