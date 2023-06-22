import Field from './Field';
import styles from './styles.module.css';

function CardHeader({ fields = {} }) {
	return (
		<div className={styles.container}>
			<div className={styles.row}>
				{fields.map((field) => <Field field={field} />)}
			</div>
		</div>
	);
}

export default CardHeader;
