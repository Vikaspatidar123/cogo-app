import styles from './styles.module.css';

import useGetAuthorizationChecked from '@/ui/page-components/authentication/hooks/useGetAuthorizationChecked';

function SessionCheck({ children }) {
	const { sessionInitialized, asPrefix } = useGetAuthorizationChecked();
	if (!sessionInitialized && asPrefix === undefined) {
		return (
			<div className={styles.container}>
				<img
					className={styles.img}
					alt="cogoport-loading"
					src="https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/cogoport-loading.gif"
				/>
			</div>
		);
	}
	return children;
}

export default SessionCheck;
