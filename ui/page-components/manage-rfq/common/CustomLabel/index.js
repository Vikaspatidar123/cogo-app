import styles from './styles.module.css';

function CustomLabel({ icon: Svg, title, subTitle, fill }) {
	return (
		<div className={styles.container}>
			<Svg width={24} height={24} fill={fill} />
			<div className={styles.label}>
				<div className={styles.title}>{title}</div>
				<div className={styles.sub_title}>{subTitle}</div>
			</div>
		</div>
	);
}

export default CustomLabel;
