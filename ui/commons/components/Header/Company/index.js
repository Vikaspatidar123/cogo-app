import Logo from './cogoport-logo.svg';
import styles from './styles.module.css';

import { Link } from '@/packages/next';
// import WebBot from '@/commons/components/WebBot';

function CompanyDetails() {
	return (
		<div className={styles.container_flex}>
			<Link className={styles.a} href="/dashboard" as="/dashboard">
				<Logo />
			</Link>
			{/* <WebBot /> */}
		</div>
	);
}

export default CompanyDetails;
