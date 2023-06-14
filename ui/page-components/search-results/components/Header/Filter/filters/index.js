import { Popover, cl, Button } from '@cogoport/components';
import React from 'react';

import FilterContent from './FilterContent';
import styles from './styles.module.css';

function Filters({
	children = null,
	controls = [],
	fields = {},
	reset = () => {},
	applyFilters = () => {},
	open = false,
	setOpen = () => {},
	isScrollable = true,
	name = 'APPLY',
	heading = 'Search',
	width = '',
	showElements = {},
	onClickOutside = () => {},
	placement = 'bottom',
	control,
}) {
	return (
		<div
			width={width}
			className={cl`${styles.filter_box}${isScrollable ? styles.scroll : ''}`}
		>
			<Popover
				interactive
				animation="perspective"
				placement={placement}
				render={(
					<FilterContent
						controls={controls}
						fields={fields}
						reset={reset}
						applyFilters={applyFilters}
						setOpen={setOpen}
						showElements={showElements}
						heading={heading}
						control={control}
					/>
				)}
				visible={open}
				onClickOutside={onClickOutside}
			>
				{children || <Button onClick={() => setOpen(!open)}>{name}</Button>}
			</Popover>
		</div>
	);
}

export default Filters;
