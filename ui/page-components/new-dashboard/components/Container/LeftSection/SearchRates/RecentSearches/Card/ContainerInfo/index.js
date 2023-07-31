import { cl, Tooltip, Pill } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { renderValue, LABELS } from '../../../../../../../constant';

import styles from './styles.module.css';

const RenderBox = ({ data }) => {
	const { t } = useTranslation(['dashboard']);

	return LABELS.map((label) => {
		const chipValue = data[label] ? renderValue({ label, data, t }) : null;

		if (!chipValue) return null;

		return (
			<React.Fragment key={label}>
				<div className={styles.mobile_view} key={label}>
					<p>{chipValue}</p>
				</div>
				<div className={styles.desktop_view}>
					<Pill key={label} size="sm">{chipValue}</Pill>
				</div>
			</React.Fragment>
		);
	});
};

function ContainerInfo({ data = {} }) {
	const { t } = useTranslation(['dashboard']);

	return (
		<div>
			<Tooltip content={<RenderBox data={data} />} placement="bottom" className={styles.tool_content}>

				<div className={styles.info_box}>

					{LABELS.map((label) => {
						const chipValue = data[label] ? renderValue({ label, data, t }) : null;

						if (!chipValue) return null;
						return (
							<>
								<Pill key={label} size="sm" className={styles.desktop_view}>{chipValue}</Pill>
								<span key={label} className={cl`${styles.container_info} ${styles.mobile_view}`}>
									{chipValue}
								</span>
							</>
						);
					})}
				</div>
			</Tooltip>
		</div>
	);
}

export default ContainerInfo;
