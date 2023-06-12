import { Button, RadioGroup, Pagination, Placeholder, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import useGetHistoricalShipCons from '../../../../../../../../hooks/useGetHistoricalShipCons';

import EmptyState from './EmptyState';
import styles from './styles.module.css';

const FTL = 'ftl_freight';
const CLASS_FTL_SERVICE = 'ftl-service';
const SHIPPER = 'shipper';
function Historical({ props, query = '', shipment_data = {} }) {
	const { role = '' } = props;
	const { shipment_type = '' } = shipment_data;
	const isFTLShipper = shipment_type === FTL && role === SHIPPER;
	const [selectedData, setSelectedData] = useState('');
	const { list, loading, handleExistingCompany, page, setPage, total_count } =		useGetHistoricalShipCons({
		props,
		selectedData,
		query,
	});
	const labelContent = (item, idx) => {
		const {
			country_name = '',
			buisness_name = '',
			address = '',
			pincode = '',
			registration_number = '',
			tax_number = '',
			trade_party_id = '',
		} = item || {};
		return {
			label: (
				<div className={styles.label_container}>
					<div className={`${styles.country_name} ${isFTLShipper ? CLASS_FTL_SERVICE : ''}`}>
						{country_name}
					</div>
					<div className={`${styles.data_container} ${isFTLShipper ? CLASS_FTL_SERVICE : ''}`}>
						{buisness_name}
					</div>
					<div className={`${styles.address_container} ${isFTLShipper ? CLASS_FTL_SERVICE : ''}`}>
						{address}
					</div>
					<div className={`${styles.pin_container} ${isFTLShipper ? CLASS_FTL_SERVICE : ''}`}>
						{pincode}
					</div>
					{isFTLShipper && (
						<>
							<div className={styles.pan_container}>{registration_number || '-'}</div>
							<div className={styles.pan_container}>{tax_number || '-'}</div>
						</>
					)}
				</div>
			),
			value: isFTLShipper ? `${trade_party_id}${'_'}${idx}` : trade_party_id,
		};
	};

	const customOptions = [];
	(list.options || [])?.forEach((item, index) => {
		customOptions.push(labelContent(item, index));
	});

	if (loading && customOptions.length === 0) {
		return (
			<div className={styles.loader_container}>
				{Array(12)
					.fill(0)
					.map(() => (
						<Placeholder margin="8px" width="100%" />
					))}
			</div>
		);
	}

	if (!loading && (list.options || []).length === 0) {
		return <EmptyState />;
	}

	return (
		<div className={styles.container}>
			<Modal.Body>
				<RadioGroup
					className="primary lg"
					options={customOptions}
					value={selectedData}
					onChange={(item) => setSelectedData(item)}
				/>
				{total_count > 50 ? (
					<div className={styles.pagination_wrapper}>
						<Pagination
							style={{ justifyContent: 'flex-end' }}
							className="md"
							pageLimit={50}
							total={total_count}
							pagination={page}
							setPagination={(val) => setPage(val)}
						/>
					</div>
				) : null}
			</Modal.Body>
			<Modal.Footer>
				<div>
					<Button
						disabled={loading}
						onClick={() => handleExistingCompany()}
					>
						Submit
					</Button>

				</div>
			</Modal.Footer>
		</div>
	);
}

export default Historical;
