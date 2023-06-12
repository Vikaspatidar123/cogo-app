import { IcMArrowDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import CardHeader from '../../CardHeader';
import TableList from '../../TableList';

import styles from './styles.module.css';

function Feature({ title, plans, features }) {
	const [isOpen, setIsOpen] = useState(false);
	const isOpenClass = isOpen ? styles.active_header : null;
	return (
		<div>
			<div
				className={`${styles.header} ${isOpenClass}`}
				onClick={() => setIsOpen(!isOpen)}
				role="presentation"
			>
				{title}
				{' '}
				<IcMArrowDown className={`${isOpen && styles.open}`} />
			</div>
			<div className={`${styles.table_container} ${isOpen && styles.accordion}`}>
				<CardHeader plans={plans} />
				<TableList features={features} />
			</div>
		</div>
	);
}

export default Feature;
