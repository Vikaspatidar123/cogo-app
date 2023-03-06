import styles from './styles.module.css';
import TrashIcon from './trash.svg';

function Child({
	controls,
	control,
	field,
	index,
	name,
	remove,
	showDeleteButton = true,
	noDeleteButtonTill = 0,
	disabled = false,
}) {
	return (
		<div className={`form-fieldArray-${name}-${index}`} key={field.id}>
			<div className={styles.Color}>
				<input type="color" />
			</div>

			{showDeleteButton && index >= noDeleteButtonTill && !disabled ? (
				<div className={styles.remove_icon}>
					<div className={`form-fieldArray-${name}-remove`}>
						<TrashIcon
							onClick={() => remove(index, 1)}
							style={{ width: '2em', height: '2em' }}
						/>
					</div>
				</div>
			) : null}
		</div>
	);
}
export default Child;
