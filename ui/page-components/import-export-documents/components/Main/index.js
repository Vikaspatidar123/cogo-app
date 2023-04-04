import { useEffect } from 'react';

import useGetQuota from '../../hooks/useGetQuota';
import iconUrl from '../../utils/iconUrl.json';

import Details from './Details';
import styles from './styles.module.css';

function Main() {
	const { isUserSubscribed = false, isQuotaLeft = false } = useGetQuota();

	useEffect(() => {
		if (typeof window !== 'undefined' && isQuotaLeft && isUserSubscribed) {
			const localStorageFormData = JSON.parse(localStorage.getItem('transportDetails'));
			if (localStorageFormData) {
				localStorage.removeItem('transportDetails');
			}
		}
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<img src={iconUrl.logo} alt="Logo" />
				<h2>Import/Export Documents</h2>
			</div>
			<Details isUserSubscribed={isUserSubscribed} isQuotaLeft={isQuotaLeft} />
		</div>
	);
}
export default Main;
