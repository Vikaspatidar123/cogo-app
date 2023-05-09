import { cl } from '@cogoport/components';
import React from 'react';

import GeneralCard from '../GeneralCard';

import styles from './styles.module.css';

function PlainCards({ cards, className = '' }) {
	return (
		<div className={cl`${styles.container} ${styles[className]}`}>
			{cards.map((card) => (
				<GeneralCard style={{ marginRight: 16 }} {...card} />
			))}
		</div>
	);
}
export default PlainCards;
