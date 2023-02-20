import { cl } from '@cogoport/components';

import { STEPPER } from '../../../utils/stepper';

// import {
// 	Container, DivFlex, Dot, Label, Line,
// } from './styles';

import styles from './styles.module.css';

function Stepper({ activeStepper = {} }) {
	return (
		<div className={styles.container}>
			{STEPPER?.map(({ key = '', title = '' }) => (
				<div key={key}>
					<div className={styles.div_flex}>
						<div className={cl`${styles.dot}${activeStepper[key] && styles.completed}`} />
						{key !== 'hsCode' && (
							<div className={cl` ${styles.line} ${activeStepper[key] && styles.completed_line}`} />
						)}
					</div>
					<div className={cl` ${styles.label}${activeStepper[key] && styles.completed_label}`}>{title}</div>
				</div>
			))}
		</div>
	);
}

export default Stepper;
