import styles from './styles.module.css';

function Slider({
	min,
	max,
	onChange = () => {},
	value,
	suffixtext = '',
	unit = '',
}) {
	return (
		<div className={styles.container}>
			<div className={styles.range}>
				<div className={styles.values}>
					{unit}
					{min}
				</div>
				<div className={styles.title}>
					{unit}
					{value}
					{suffixtext}
				</div>
				<div className={styles.values}>
					{unit}
					{max}
				</div>
			</div>

			<div className={styles.flex}>
				<input
					className={styles.slider}
					type="range"
					min={min}
					max={max}
					id="active_oc_sc_transit_time_input"
					onChange={onChange}
					value={value}
				/>
			</div>
		</div>
	);
}

export default Slider;
