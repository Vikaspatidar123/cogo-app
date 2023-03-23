import { Select } from '@cogoport/components';
import React, { forwardRef, useImperativeHandle, useCallback } from 'react';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import getCountryDetails from '@/ui/commons/utils/getCountryDetails';

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

const { IN: INDIA_COUNTRY_ID } = GLOBAL_CONSTANTS.country_ids;

const INDIA_COUNTRY_DETAILS = getCountryDetails({
	country_id: INDIA_COUNTRY_ID,
});

const INDIA_COUNTRY_CODE = INDIA_COUNTRY_DETAILS?.country_code;

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
				options={
          country_code === INDIA_COUNTRY_CODE
          	? DOMESTIC_OPTIONS
          	: INTERNATIONAL_OPTIONS
        }
				value={selectedTradeType}
				onChange={setSelected}
				style={{
        	menu: {
        		right        : 0,
        		background   : 'white',
        		boxShadow    : '0 4px 80px rgba(0, 0, 0, 0.15)',
        		borderRadius : 10,
        		zIndex       : 99999,
        		width        : 244,
        	},
				}}
			/>
			{formError?.TradeType ? (
				<div className={styles.error_message_container}>Trade Type is required</div>
			) : null}
		</div>
	);
}

export default forwardRef(TradeType);
