import { cl, Tooltip, Pill } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import { renderValue, LABELS } from '../../../../../../../constant';

import styles from './styles.module.css';

const RenderBox = ({ data }) => {
	const { t } = useTranslation(['dashboard']);
	const value = LABELS.map((label) => {
		const chipValue = data[label] ? renderValue({ label, data, t }) : null;
		if (chipValue) {
			return (
				<>
					<div className={styles.mobile_view} key={label}>
						<p>{chipValue}</p>
					</div>
					<div className={styles.desktop_view}>
						<Pill key={label} size="sm">{chipValue}</Pill>
					</div>
				</>
			);
		}
		return false;
	});
	return value;
};

function ContainerInfo({ data = {} }) {
	const { t } = useTranslation(['dashboard']);

	return (
		<>
			<div className={styles.desktop_view}>
				<Tooltip content={<RenderBox data={data} />} placement="bottom" className={styles.tool_content}>
					<div className={styles.info_box}>
						{LABELS.map((label) => {
							const chipValue = data[label] ? renderValue({ label, data, t }) : null;
							if (chipValue) {
								return <Pill key={label} size="sm">{chipValue}</Pill>;
							}

							return null;
						})}
					</div>
				</Tooltip>
			</div>

			<div className={styles.mobile_view}>
				<Tooltip content={<RenderBox data={data} />} placement="bottom" className={styles.tool_content}>
					<div className={cl`${styles.asd} ${styles.info_box}`}>
						{LABELS.map((label) => {
							const chipValue = data[label] ? renderValue({ label, data, t }) : null;
							if (chipValue) {
								return (
									<span key={label} className={styles.container_info}>
										{chipValue}
									</span>
								);
							}
							return null;
						})}
					</div>
				</Tooltip>
			</div>

		</>
	);
}

export default ContainerInfo;
