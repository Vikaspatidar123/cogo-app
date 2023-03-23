import { Select, Pills } from '@cogoport/components';
import React, { useEffect, useState } from 'react';

// import SwitchSelect from '../SwitchSelect';

import IncoTerms from '@/ui/commons/constants/inco-terms.json';

function IncoTermSelect({
	tradeType,
	incoTermType,
	selectType,
	value,
	activeTradeType = '',
	id,
	...rest
}) {
	// eslint-disable-next-line no-param-reassign
	tradeType = tradeType
    || (IncoTerms || []).filter((item) => item?.value === value)[0]?.tradeType;

	let list = IncoTerms;
	const currentObj = list.find((inco) => inco.value === value) || {
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
			<Pills
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
