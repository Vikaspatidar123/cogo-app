import React from 'react';

// import {
// 	DivFlex, DivRow, Dot, Label, Line,
// } from '../../style';

import styles from './styles.module.css';

const STEPPER = [
	{
		key   : 'description',
		title : 'Description',
	},
	{
		key   : 'section',
		title : 'Section',
	},
	{
		key   : 'chapter',
		title : 'Chapter',
	},
	{
		key   : 'hsCode',
		title : 'HS Code',
	},
];

function Stepper({ activeStepper }) {
	return (
		<div className={styles.div_row}>
			{STEPPER?.map(({ key = '', title = '' }) => (
				<div key={key}>
					<div className={styles.div_flex}>
						<div className={styles.dot} style={{ background: activeStepper[key] }} />
						{key !== 'hsCode' && <div className={styles.line} style={{ background: activeStepper[key] }} />}
					</div>
					<div className={styles.label} style={{ background: activeStepper[key] }}>{title}</div>
				</div>
			))}
		</div>
	);
}

export default Stepper;
