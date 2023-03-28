import { cl, Button } from '@cogoport/components';
import {
	IcCHaulage as IcSurface,
	IcMArrowRotateDown,
	IcMShip,
	IcMLcl,
	IcMAir,
} from '@cogoport/icons-react';
import React from 'react';

import IcDomestic from './ic-domestic.svg';
import styles from './styles.module.css';

const ICON_MAPPING = {
	'ic-fcl'      : IcMShip,
	'ic-lcl'      : IcMLcl,
	'ic-air'      : IcMAir,
	'ic-surface'  : IcSurface,
	'ic-domestic' : IcDomestic,
};

function TagSingle({
	item = {},
	selected = '',
	onClick = () => {},
	className: classNameProp = '',
	id = '',
}) {
	const isAnyOptionSelected = () => {
		const selectedValue = (item.options || []).filter(
			(option) => option.value === selected,
		);
		return selectedValue.length > 0;
	};
	const getLabelText = () => {
		const selectedValue = (item.options || []).find(
			(option) => option.value === selected,
		);
		return selectedValue?.label;
	};
	const selectedOptionLabel = getLabelText();

	const Icon = ICON_MAPPING[item.icon];
	const className = `${classNameProp} ${
		selected === item.value || (item.options && isAnyOptionSelected())
			? styles.selected
			: ''
	}`;
	return (
		<div
			key={item.value}
			role="presentation"
			onClick={() => {
      	onClick(item.value);
			}}
			className={cl`${styles.container}${styles[id]} ${styles[className]}`}
			id={id}
		>
			<Button
				size="md"
				themeType="secondary"
				className={cl`${styles[id]}${item.value === selected && styles.active}`}
			>
				<div className={cl`${styles.container_label} ${styles[className]}`}>
					<Icon style={{ width: 20, height: 20 }} />

					<div style={{ marginLeft: 8 }}>
						{item?.options ? selectedOptionLabel || item.label : item.label}
					</div>

					{item?.options ? (
						<IcMArrowRotateDown style={{ marginLeft: 6 }} />
					) : null}
				</div>
			</Button>
		</div>
	);
}

export default React.memo(TagSingle);
