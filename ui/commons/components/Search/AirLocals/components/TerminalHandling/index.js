import { Select } from '@cogoport/components';
import React, {
	useState,
	forwardRef,
	useImperativeHandle,
	useCallback,
} from 'react';

import styles from './styles.module.css';

const OPTIONS = [
	{
		label : 'Origin',
		value : 'origin',
	},
	{
		label : 'Destination',
		value : 'destination',
	},
];

function TerminalHandlingType(props, ref) {
	const {
		airFreightLocalsData = {},
		formError = {},
		selectedTradeType,
	} = props;

	const { terminal_handling_charge = '', trade_type = '' } = airFreightLocalsData || {};

	const handlingTypeValueprefill = () => {
		if (trade_type === 'domestic' && terminal_handling_charge === 'inbound') {
			return 'destination';
		}
		if (trade_type === 'domestic' && terminal_handling_charge === 'outbound') {
			return 'origin';
		}
		if (trade_type === 'import') {
			return 'destination';
		}
		if (trade_type === 'export') {
			return 'origin';
		}
		return '';
	};

	const [selectedHandlingType, setSelectedHandlingType] = useState(
		handlingTypeValueprefill() || 'origin',
	);

	const getHandlingType = () => {
		if (selectedTradeType === 'export') {
			return 'origin';
		}
		return 'destination';
	};

	const imperativeHandle = useCallback(
		() => ({
			handleSubmit: () => ({
				hasError: !selectedHandlingType,
				...(selectedHandlingType && { values: { selectedHandlingType } }),
				...(!selectedHandlingType && { errors: {} }),
			}),
		}),
		[selectedHandlingType],
	);

	useImperativeHandle(ref, imperativeHandle, [imperativeHandle]);

	return (
		<div className={styles.container}>
			<div className={styles.title}>HANDLING TYPE</div>

			<Select
				type="select"
				placeholder="Select"
				options={OPTIONS}
				value={selectedTradeType === 'domestic' ? selectedHandlingType : getHandlingType()}
				onChange={setSelectedHandlingType}
				disabled={selectedTradeType !== 'domestic'}
			/>
			{formError?.terminalHandlingType ? (
				<div className={styles.error_message_container}>
					Handling Type is required
				</div>
			) : null}
		</div>
	);
}

export default forwardRef(TerminalHandlingType);
