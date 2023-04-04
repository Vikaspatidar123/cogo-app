import { Button, cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

function FilterContent({
	controls = [],
	fields = {},
	reset = () => {},
	applyFilters = () => {},
	setOpen = () => {},
	showElements = {},
	heading,
	control,
}) {
	const handleClick = () => {
		applyFilters();
		setOpen(false);
	};

	const handleReset = () => {
		reset();
		setOpen(false);
	};

	const renderElement = () => controls.map((item) => {
		const Element = getField(item.type);
		if (
			item?.show === false
        || (Object.keys(showElements || {}).length > 0
          && showElements?.[item?.name] === false)
		) {
			return null;
		}
		const props = {};
		if (item.type.includes('select')) {
			props.defaultOptions = false;
		}
		return (
			<div className={styles.filter_display}>
				<div className={cl`${styles.filter_control_label}${styles.label}`}>{item.label}</div>
				{/* <Element control={control} {...item} {...props} /> */}
			</div>
		);
	});

	return (
		<div>
			<div
				className={cl`${styles.header}${styles.bussiness_module_filter_header}`}
			>
				<div className={styles.heading}>{heading}</div>

				<div>
					<Button onClick={() => handleReset()}>RESET FORM</Button>

					<Button
						onClick={() => handleClick()}
						style={{
							background : '#393f70',
							color      : '#ffffff',
							marginLeft : '10px',
						}}
					>
						SHOW RESULTS
					</Button>
				</div>
			</div>

			{renderElement()}
		</div>
	);
}
export default FilterContent;
