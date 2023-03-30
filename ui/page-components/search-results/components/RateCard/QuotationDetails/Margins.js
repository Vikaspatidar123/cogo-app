import { isEmpty } from '@cogoport/utils';
import React from 'react';

import CC from '../../../helpers/condition-constants';
import useGetPermission from '../../../hooks/useGetPermission';

import styles from './styles.module.css';

function Margins({ margins = [] }) {
	const { isConditionMatches } = useGetPermission();

	const salesMargin = (margins || []).filter(
		(item) => item?.margin_type === 'demand',
	);
	const supplyMargin = (margins || []).filter(
		(item) => item?.margin_type === 'supply',
	);
	const cogoMargin = (margins || []).filter(
		(item) => item?.margin_type === 'cogoport',
	);

	let label = '';
	let margin = '';
	const handleMargin = (item, type) => {
		if (type === 'demand') {
			label = '(Sales)';
		} else if (type === 'supply') {
			label = '(Supply)';
		} else if (type === 'cogoport') {
			label = '(Cogo)';
		}

		if (!isEmpty(item)) {
			const value = (item || [])[0];
			if (value?.type === 'percentage') {
				margin = `${(value?.value).toFixed(2)}% (${(value?.min_value).toFixed(
					2,
				)} - ${(value?.max_value).toFixed(2)})${label}`;
			} else {
				margin = `${(value?.value).toFixed(2)}${label}`;
			}
		} else {
			margin = `0 ${label}`;
		}

		return margin;
	};

	return (
		<div style={{ display: 'flex' }}>
			<div style={{ display: 'flex', marginBottom: '8px' }}>
				{isConditionMatches(
					[...CC.SEE_ALL_MARGINS, ...CC.SEE_SALES_MARGIN],
					'or',
				) ? (
					<div className={styles.space}>
						+
						<div className={styles.pill}>{handleMargin(salesMargin, 'demand')}</div>
					</div>
					) : null}

				{isConditionMatches(
					[...CC.SEE_ALL_MARGINS, ...CC.SEE_SUPPLY_MARGIN],
					'or',
				) ? (
					<div className={styles.space}>
						+
						<div className={styles.pill}>{handleMargin(supplyMargin, 'supply')}</div>
					</div>
					) : null}
			</div>

			{isConditionMatches(CC.SEE_ALL_MARGINS, 'or') ? (
				<div className={styles.space}>
					+
					<div className={styles.pill}>{handleMargin(cogoMargin, 'cogoport')}</div>
				</div>
			) : null}
		</div>
	);
}

export default Margins;
