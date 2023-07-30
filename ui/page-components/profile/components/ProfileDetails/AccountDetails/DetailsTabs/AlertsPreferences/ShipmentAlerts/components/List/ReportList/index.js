import { useState } from 'react';

import Head from './Head';
import styles from './styles.module.css';
import Table from './Table';

function ReportList({ props }) {
	return (
		<div className={styles.container}>
			<Head props={props} />
			<Table props={props} />
		</div>
	);
}

export default ReportList;
