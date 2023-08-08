import { cl, Button, Popover } from '@cogoport/components';
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
	onClick = () => { },
	className: classNameProp = '',
	id = '',
	options,
	onChange,
	showTagOptionsValue,
	value,
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
	const className = `${classNameProp} ${selected === item.value || (item.options && isAnyOptionSelected())
		? styles.selected
		: ''
	}`;
	const setOptions = (optionitem) => optionitem.map((e) => (
		<div
			role="presentation"
			className={cl`${styles.options} ${e.value === selected && styles.active}`}
			onClick={() => {
				onChange(e.value);
			}}
		>
			{e.label}
		</div>
	));
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
			{!options ? (
				<Button
					size="md"
					themeType="secondary"
					className={cl`${styles[id]} ${item.value === selected && styles.active}`}
				>
					<div className={cl`${styles.container_label} ${styles[className]}`}>
						<Icon style={{ width: 17, height: 17 }} />

						<div style={{ marginLeft: 8 }}>
							{item?.options ? selectedOptionLabel || item.label : item.label}
						</div>
					</div>
				</Button>
			)
				: (
					<Popover
						placement="bottom"
						render={setOptions(item?.options)}
					>
						<Button
							size="md"
							themeType="secondary"
							className={cl`${styles[id]} ${showTagOptionsValue === value && styles.active}`}
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
					</Popover>
				)}
		</div>
	);
}

export default React.memo(TagSingle);
