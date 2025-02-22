import { Input, MultiSelect } from '@cogoport/components';
import { IcMSearchdark, IcMCross } from '@cogoport/icons-react';

import statusOptions from '../../constants/status-options';

import styles from './styles.module.css';

function Filters({
	onQueryChange,
	searchQuery,
	setPagination,
	setInvoiceStatus,
	invoiceStatus,
}) {
	return (
		<div className={styles.container}>
			<div
				className={styles.flex}
				style={{
					justifyContent: 'start',
				}}
			>
				<Input
					prefix={(
						<IcMSearchdark
							style={{ width: '20px', height: '20px', marginTop: '5px' }}
						/>
					)}
					suffix={(
						<IcMCross
							onClick={() => onQueryChange('')}
							style={{ cursor: 'pointer', marginRight: '5px' }}
						/>
					)}
					onChange={(e) => {
						onQueryChange(e);
					}}
					value={searchQuery}
					placeholder="Search by Invoice ID"
					type="text"
					size="sm"
				/>
				<MultiSelect
					className={styles.status_select}
					placeholder="Select Status"
					options={statusOptions}
					size="sm"
					value={invoiceStatus}
					onChange={(e) => {
						setInvoiceStatus(e);
						setPagination(1);
					}}
					isClearable
					style={{ marginLeft: '10px' }}
				/>
			</div>
		</div>
	);
}

export default Filters;
