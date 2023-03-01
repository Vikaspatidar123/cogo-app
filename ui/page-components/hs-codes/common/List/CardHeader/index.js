import styles from './styles.module.css';
import {cl} from "@cogoport/components"
function CardHeader({ configs }) {
	return (

		<div className={styles.row}>
			
			{(configs || []).map((config) => (
				<div
					key={config.key}
					style={config?.style}
					className={cl`${styles.col}${config.key === 'description' && styles.desc} `}
				>
					{config.label}
				</div>
			))}
			
		</div>
	);
}

export default CardHeader;
