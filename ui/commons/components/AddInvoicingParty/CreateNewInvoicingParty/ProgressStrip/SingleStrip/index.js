import { cl } from '@cogoport/components';
import styles from './styles.module.css';

function SingleStrip({
	item = {},
	currentStep = '',
	progressSteps = [],
	count = 1,
}) {
	const status = currentStep === item?.key ? 'active' : 'inactive';

	return (
		<div className={styles.flex_container}>
			<div
				className={cl`
					${styles.count}
					${status === 'active' ? styles.active : styles.inactive}
				`}
			>
				{count}
			</div>

			<span
				className={styles.title}
				style={{
					color: status === 'active' ? '#333333' : '#828282',
					cursor: count < 1 ? 'pointer' : 'default',
					fontWeight: status === 'active' ? 500 : 'normal',
				}}
			>
				{item?.label}
			</span>
			{count < progressSteps.length ? <div className={styles.line} /> : null}
		</div>
	);
}
export default SingleStrip;
