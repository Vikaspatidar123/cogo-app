import styles from './styles.module.css';

function CardHeader({ configs }) {
	return (

		<div className={styles.row}>
			{(configs || []).map((config) => (
				<div
					key={config.key}
					style={config?.style}
					className={`${styles.col}${config.key === 'description' && styles.desc} `}
				>
					{config.label}
				</div>
			))}
		</div>
	);
}

export default CardHeader;
