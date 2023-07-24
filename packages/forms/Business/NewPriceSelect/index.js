import { Input, Select } from '@cogoport/components';

import currencyOpt from '../../constants/currencies';

import styles from './styles.module.css';

function PriceSelect({
	value,
	onChange,
	codeKey = 'currency',
	numberKey = 'price',
	mobileSelectRef,
	select2,
	width,
	id = 'select_phone',
	...rest
}) {
	const { [codeKey]: currency = '', [numberKey]: price = '' } = value || {};

	const handleCodeChange = (v) => {
		onChange({ ...(value || {}), [codeKey]: v });
	};

	const handleNumberChange = (e) => {
		onChange({ ...(value || {}), [numberKey]: e });
	};

	const props = {};
	if (select2 && select2.includes('new')) {
		if (select2.includes('big')) {
			props.style = {
				control: {
					fontSize   : '12px',
					lineHeight : '14px',
					color      : 'black',
					minHeight  : '44px',
				},
				indicatorsContainer : { height: '42px' },
				menu                : {
					width        : '200px',
					background   : 'white',
					boxShadow    : '0 4px 80px rgba(0, 0, 0, 0.15)',
					borderRadius : '10px',
					zIndex       : 99999,
				},
			};
		} else {
			props.style = {
				control: {
					fontSize   : '12px',
					lineHeight : '14px',
					color      : 'black',
					minHeight  : select2.includes('small') ? '30px' : '34px',
				},
				indicatorsContainer: {
					height: select2.includes('small') ? '48px' : '32px',
				},
				menu: {
					width        : '200px',
					background   : 'white',
					boxShadow    : '0 4px 80px rgba(0, 0, 0, 0.15)',
					borderRadius : '10px',
					zIndex       : 99999,
				},
			};
		}
	} else {
		props.style = {
			control: {
				fontSize   : '14px',
				lineHeight : '18px',
				color      : 'black',
				minHeight  : '48px',
			},
			indicatorsContainer : { height: '46px' },
			menu                : { width: '200px' },
		};
	}

	return (
		<div
			className={styles.row_container}
			style={width ? { width: '100%' } : {}}
		>
			<div className={styles.col_container_1} style={{ paddingRight: 0 }}>
				<Select
					{...props}
					options={currencyOpt}
					value={currency}
					readOnly={false}
					onChange={handleCodeChange}
					name="currency"
				/>
			</div>
			<div className={styles.col_container_2}>
				<Input
					{...rest}
					ref={mobileSelectRef}
					width="100%"
					id={`${id || ''}_${numberKey || 'number'}`}
					name="price"
					type="number"
					value={price || (value || {})[numberKey] || ''}
					onChange={handleNumberChange}
				/>
			</div>
		</div>
	);
}

export default PriceSelect;
