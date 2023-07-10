import styles from './styles.module.css';

function Stepper({ originPort = {}, destinationPort = {} }) {
	return (
		<>
			<div className={styles.dot_circle}>
				<div className={styles.circle} />
				<div className={styles.line} />
				<div className={styles.circle} />
			</div>

			<div className={styles.port_code}>
				<span>{originPort?.port_code || 'Origin'}</span>
				<span>{destinationPort?.port_code || 'Destination' }</span>
			</div>
		</>
	);
}

export default Stepper;
