import { IcMTrailorFull, IcMSettings, IcMSearchdark } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function Icons({ icon }) {
	const iconsMappings = {
		'ic-truck': (
			<div className={styles.container}>
				<IcMTrailorFull size={1.5} />
			</div>
		),
		'ic-settings': (
			<div className={styles.container}>
				<IcMSettings size={1.5} />
			</div>
		),
		'ic-search-spec': (
			<div className={styles.container}>
				<IcMSearchdark size={1.5} />
			</div>
		),
	};
	return <div>{iconsMappings[icon]}</div>;
}
export default Icons;
