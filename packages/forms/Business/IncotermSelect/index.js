/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import IncoTerms from '../../constants/inco-terms.json';
import Chip from '../Chip/chip';
import Select from '../Select';
import SwitchSelect from '../SwitchSelect';

function IncoTermSelect({
	tradeType:tradeMode,
	incoTermType,
	selectType,
	value,
	activeTradeType = '',
	id,
	...rest
}) {
	const tradeType = (IncoTerms || []).filter((item) => item?.key === value)[0]?.tradeType || tradeMode;
	let list = IncoTerms;
	const currentObj = list.find((inco) => inco.key === value) || {
		tradeType: tradeType || activeTradeType,
	};
	const [tradeTypeToggle, setTradeType] = useState(
		tradeType || currentObj?.tradeType,
	);

	if (selectType !== 'normal') {
		list = list.filter((item) => item.tradeType === tradeTypeToggle);
	}
	if (tradeTypeToggle === 'export' || tradeTypeToggle === 'import') {
		list = list.filter((item) => item.tradeType === tradeTypeToggle);
	}

	useEffect(() => {
		if (tradeTypeToggle !== tradeType) {
			setTradeType(tradeType || currentObj?.tradeType);
		}
	}, [tradeType]);

	useEffect(() => {
		setTradeType(currentObj?.tradeType || activeTradeType);
	}, [activeTradeType]);
	const switchProps = {
		right: {
			title : 'Export',
			value : 'export',
		},
		left: {
			title : 'Import',
			value : 'import',
		},
		onChange : setTradeType,
		active   : tradeTypeToggle,
		id,
	};

	return selectType === 'normal' ? (
		<Select
			name="inco_term"
			selectType={selectType}
			{...rest}
			value={value}
			options={list}
			inputId={rest.id}
		/>
	) : (
		<SwitchSelect label="Incoterms" switchProps={switchProps}>
			<Chip
				name="inco_term"
				selectType={selectType}
				{...rest}
				value={value}
				options={list}
				id={id}
			/>
		</SwitchSelect>
	);
}
export default IncoTermSelect;
