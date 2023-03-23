import { Input, Select, Popover, Button } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import {
	CONTRACT_FILTERS,
	CONTRACT_FILTER_OPTION,
} from '../../../../constants';

import styles from './styles.module.css';

function Filters({ filterValue = {}, setFilterValue = () => {} }) {
	const { status, service_type, trade_type, source } = filterValue || {};
	const isActiveFilter = status || service_type || trade_type || source;

	const resetFilter = () => {
		setFilterValue('');
	};

	const content = () => (
		<div className={styles.filter_container}>
			{CONTRACT_FILTERS.map(({ label, key }) => (
				<div className={styles.filter_box}>
					<div className={styles.label}>{startCase(label)}</div>
					<Select
						className="primary md"
						placeholder={`Select ${label}`}
						value={filterValue[key]}
						onChange={(a) => {
							setFilterValue((p) => ({
								...p,
								[key]: a,
							}));
						}}
						options={CONTRACT_FILTER_OPTION[key]}
						clearable
					/>
				</div>
			))}

			{isActiveFilter && (
				<div className={styles.footer}>
					<Button onClick={resetFilter}>Reset Filters</Button>
				</div>
			)}
		</div>
	);

	return (
		<div className={styles.container}>
			<Popover
				theme="light-border"
				animation="scale"
				content={content()}
				interactive
			>
				<Button size="md">
					Filter
					{isActiveFilter && <div className={styles.active_dot} />}
				</Button>
			</Popover>
			<div className={styles.search_filter}>
				<Input
					placeholder="Search Contract ID/ Contract Name"
					suffix={<IcMSearchlight />}
					value={filterValue?.contract_reference_id}
					onChange={(e) => {
						setFilterValue((p) => ({
							...p,
							contract_reference_id: e,
						}));
					}}
				/>
			</div>
		</div>
	);
}

export default Filters;
