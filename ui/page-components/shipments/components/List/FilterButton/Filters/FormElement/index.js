import Item from './Item';
import styles from './styles.module.css';

function Options({ fields, controls }) {
	return (
		<div>
			<div className={styles.row}>
				{controls.map((item) => (
					<Item
						name={item.name}
						fields={fields}
						id={`${item.name}`}
					/>
				))}
			</div>
		</div>
	);
}

export default Options;
