import styles from './styles.module.css';

function NoData() {
	return (
		<div className={styles.container}>
			<img
				height={200}
				width={200}
				alt=""
				src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/Insurance.png"
			/>
			<div className={styles.content}>You have no policies right now</div>
			<div className={styles.heading}>Try Securing Your Cargo Now</div>
		</div>
	);
}

export default NoData;
