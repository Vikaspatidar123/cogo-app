import Benefits from './Benefits';
import Form from './Form';
import styles from './styles.module.css';
import Title from './Title';

function PayLater() {
	return (
		<div className={styles.container}>
			<div className={styles.information}>
				<Title />
				<Benefits />
			</div>
			<div className={styles.form}>
				<Form />
			</div>
		</div>
	);
}
export default PayLater;
