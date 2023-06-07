import styles from './styles.module.css';

function Title() {
	return (
		<div className={styles.content}>
			<span className={styles.text}>
				Ship Now
				{' '}
				<span className={styles.paylater}>PayLater</span>
			</span>
			<div>
				Let’s ease your cash flow so you can keep your shipments moving without any worry!
			</div>
		</div>
	);
}

export default Title;
