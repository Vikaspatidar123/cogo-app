import styles from './styles.module.css';

export default function NoServiceFound({ serviceName = '' }) {
	return (
		<section className={styles.no_service_found}>
			<h3>
				{serviceName}
				{' '}
				Service
				{' '}
				Not
				{' '}
				Available
			</h3>
		</section>
	);
}
