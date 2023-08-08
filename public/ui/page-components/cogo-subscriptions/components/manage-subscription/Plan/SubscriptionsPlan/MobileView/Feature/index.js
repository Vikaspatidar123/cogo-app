import { cl } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import TableList from '../../../../../../common/TableList';
import CardHeader from '../CardHeader';

import styles from './styles.module.css';

function Feature({ title = '', plans = {}, features = {} }) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div>
			<div
				role="presentation"
				className={cl`${styles.header} ${isOpen ? styles.active_header : undefined} `}
				onClick={() => setIsOpen((prv) => !prv)}
			>
				{title}
				{' '}
				<IcMArrowDown className={isOpen && styles.open} />
			</div>

			<div className={cl`${styles.table_container} ${isOpen && styles.accordion}`}>
				<CardHeader plans={plans} />
				<TableList features={features} />
			</div>
		</div>
	);
}

export default Feature;
