import Item from './Item';
import styles from './styles.module.css';

function Options({ fields, controls, id_prefix }) {
	return (
		<div>
			<div className={styles.row}>
				{controls.map((item) => (
					<Item
						key={item.name}
						name={item.name}
						fields={fields}
						id={`${id_prefix}_${item.name}`}
					/>
				))}
			</div>
		</div>
	);
}

export default Options;
