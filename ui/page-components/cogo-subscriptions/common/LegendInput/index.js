import { Input } from '@cogoport/components';

import styles from './styles.module.css';

function LegendInput({
	type,
	label,
	val = '',
	setVal,
	className,
	placeholder,
	labelClassName,
	suffix,
	...rest
}) {
	return (
		<div className={styles.container}>
			<div className={`${styles.label} ${val && styles.move}  ${`${styles}.${labelClassName}`}`}>
				{label || placeholder}
			</div>
			<div className={`${styles.input_box_container} ${className}`}>
				<Input
					{...rest}
					type={type}
					value={val}
					onChange={(e) => {
						setVal(e);
					}}
				/>
				<div>{suffix}</div>
			</div>
		</div>
	);
}

export default LegendInput;
