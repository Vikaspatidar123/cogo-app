/* eslint-disable max-len */
import styles from './styles.module.css';

import { Link } from '@/packages/next';
// import WebBot from '@/commons/components/WebBot';

function CompanyDetails() {
	return (
		<div>
			<Link className={styles.a} href="/dashboard" as="/dashboard">
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/cogoport.svg"
					alt="Cogoport Logo"
				/>
			</Link>
			{/* <WebBot /> */}
		</div>
	);
}

export default CompanyDetails;
