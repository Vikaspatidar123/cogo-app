import { Select } from '@cogoport/components';
import React, { forwardRef, useImperativeHandle, useCallback } from 'react';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const INTERNATIONAL_OPTIONS = [
	{
		name  : 'import',
		label : 'Import',
		value : 'import',
	},
	{
		name  : 'export',
		label : 'Export',
		value : 'export',
	},
];
const DOMESTIC_OPTIONS = [
	{
		name  : 'import',
		label : 'Import',
		value : 'import',
	},
	{
		name  : 'export',
		label : 'Export',
		value : 'export',
	},
	{
		name  : 'domestic',
		label : 'Domestic',
		value : 'domestic',
	},
];

const INDIA_COUNTRY_CODE = GLOBAL_CONSTANTS.country_code.IN;

function TradeType(props, ref) {
	const {
		formError = {},
		selectedTradeType,
		setSelected = () => {},
		location = {},
	} = props;
	const { country_code = '' } = location.origin || {};

	const imperativeHandle = useCallback(
		() => ({
			handleSubmit: () => ({
				hasError: !selectedTradeType,
				...(selectedTradeType && { values: { selectedTradeType } }),
				...(!selectedTradeType && { errors: {} }),
			}),
		}),
		[selectedTradeType],
	);

	useImperativeHandle(ref, imperativeHandle, [imperativeHandle]);

	return (
		<div className={styles.container}>
			<div className={styles.title}>TRADE TYPES</div>

			<Select
				type="select"
				placeholder="Select"
				options={country_code === INDIA_COUNTRY_CODE ? DOMESTIC_OPTIONS : INTERNATIONAL_OPTIONS}
				value={selectedTradeType}
				onChange={setSelected}
			/>
			{formError?.TradeType ? (
				<div className={styles.error_message_container}>
					Trade Type is required
				</div>
			) : null}
		</div>
	);
}

export default forwardRef(TradeType);
