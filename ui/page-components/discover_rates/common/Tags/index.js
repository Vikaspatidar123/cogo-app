import { cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useRef } from 'react';

import getBoundedClick from '../../utils/getBoundedClick';

import styles from './styles.module.css';
import Tag from './Tag';

function Tags({
	list = [],
	onClick = () => {},
	selected = '',
	className = '',
	search_type = '',
	prefix = '',
	showDomestic = true,
	showContainerTransportation = true,
}) {
	const [showTagOptionsValue, setShowTagOptionsValue] = useState('');

	const ref = useRef(null);

	const cRef = getBoundedClick(
		{
			onOuterClick: () => {
				setShowTagOptionsValue('');
			},
		},
		ref,
	);

	const onChange = (v) => {
		onClick(v);
		setShowTagOptionsValue('');
	};

	return (
		<div
			ref={cRef}
			className={cl`${styles.with_mobile} ${styles.without_mobile} ${
      	styles.search_type || ''
			}`}
		>
			{prefix ? (
				<div className={cl`${styles.text} ${styles.web}`}>{prefix}</div>
			) : null}

			{list.map((item) => {
      	const { value } = item || {};

      	if (search_type === 'forecast') {
      		const flag = ['domestic', 'container_transportation'].includes(value);

      		if (flag) {
      			return null;
      		}
      	}

      	// Removed Rail Domestic from App Side

      	let newOptions = item?.options;

      	if (value === 'container_transportation') {
      		newOptions = [{ value: 'haulage', label: 'Haulage' }];
      	}

      	if (!isEmpty(item.options)) {
      		const valueShowPropMapping = {
      			domestic                 : showDomestic,
      			container_transportation : showContainerTransportation,
      		};

      		if (valueShowPropMapping[value]) {
      			return (
	<Tag
		item={item}
		selected={selected}
		options={newOptions}
		className={styles[className]}
		id={`search_form_mode_${value}`}
		onClick={() => {
                	setShowTagOptionsValue(value);
		}}
		onChange={onChange}
		showTagOptionsValue={showTagOptionsValue}
		value={value}
	/>
      			);
      		}
      	}
      	{
      		/* <SelectController
		key={value}
		name={`search-${value}-tags`}
		options={newOptions}
		value={selected}
		inputId={`search_form_mode_${value}_input`}
		menuIsOpen={showTagOptionsValue === value}
		onChange={onChange}
		menuPlacement="auto"
		style={{
                	menu: {
                		width : 150,
                		left  : 0,
                	},
		}}
		ControlComponent={() => (
			<Tag
				item={item}
				selected={selected}
				className={styles[className]}
				id={`search_form_mode_${value}`}
				onClick={() => {
                    	setShowTagOptionsValue(value);
				}}
			/>
		)}
	/> */
      	}
      	return (
	<Tag
		key={value}
		item={item}
		selected={selected}
		onClick={onChange}
		className={className}
		id={`search_form_mode_${value}`}
	/>
      	);
			})}
		</div>
	);
}

export default Tags;
