/* eslint-disable max-len */
import styles from './styles.module.css';

import { Link } from '@/packages/next';
// import WebBot from '@/commons/components/WebBot';

function CompanyDetails() {
	return (
		<div className={styles.container_flex}>
			<Link className={styles.a} href="/dashboard" as="/dashboard">
				<img
					src="https://cogoport-production.sgp1.digitaloceanspaces.com/e845419ea5eacebda858bad8b20d2797/cogoport-logo.svg"
					alt="Cogoport Logo"
				/>
			</Link>
			{/* <WebBot /> */}
		</div>
	);
}

export default CompanyDetails;
