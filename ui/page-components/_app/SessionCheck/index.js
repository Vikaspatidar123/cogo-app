import styles from './styles.module.css';

function SessionCheck({ children }) {
	// if (!sessionInitialized) {
	// 	return (
	// 		<div className={styles.container}>
	// 			<img
	// 				className={styles.img}
	// 				alt="cogoport-loading"
	// 				src="https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/cogoport-loading.gif"
	// 			/>
	// 		</div>
	// 	);
	// }
	return children;
}

export default SessionCheck;
