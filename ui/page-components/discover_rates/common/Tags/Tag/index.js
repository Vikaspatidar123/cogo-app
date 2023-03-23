import { cl } from '@cogoport/components';
import {
	IcCHaulage as IcSurface,
	IcMArrowRotateDown,
} from '@cogoport/icons-react';
import React from 'react';

import IcAir from './ic-air.svg';
import IcDomestic from './ic-domestic.svg';
import IcFcl from './ic-fcl.svg';
import IcLcl from './ic-lcl.svg';
import styles from './styles.module.css';

const ICON_MAPPING = {
	'ic-fcl'      : IcFcl,
	'ic-lcl'      : IcLcl,
	'ic-air'      : IcAir,
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
			? 'selected'
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
			<div className={styles.id}>
				<div className={`${styles.container_label} ${styles[className]}`}>
					<Icon style={{ width: 20, height: 20 }} />

					<div style={{ marginLeft: 8 }}>
						{item?.options ? selectedOptionLabel || item.label : item.label}
					</div>

					{item?.options ? (
						<IcMArrowRotateDown style={{ marginLeft: 6 }} />
					) : null}
				</div>
			</div>
		</div>
	);
}

export default React.memo(TagSingle);
