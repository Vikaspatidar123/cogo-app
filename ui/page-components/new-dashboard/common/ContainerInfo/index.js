import { useTranslation } from 'next-i18next';
import React from 'react';

import { renderValue, LABELS } from '../../constant';

import styles from './styles.module.css';

function ContainerInfo({ detail }) {
	const { t } = useTranslation(['dashboard']);
	return (
		LABELS.map((label) => {
			const color = label === 'inco_term' ? '#FBE6E6' : '#f2f2f2';
			if (!detail[label]) return null;

			return (
				<div
					className={styles.container_details_text}
					style={{ background: color }}
					key={label}
				>
					{renderValue({ label, data: detail, t })}
				</div>
			);
		})
	);
}

export default ContainerInfo;
