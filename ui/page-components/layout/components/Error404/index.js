import { Button } from '@cogoport/components';

import styles from './styles.module.css';

import { useSelector } from '@/packages/store';
// import IcError from './error.svg';

function Error404() {
	const {
		general,
	} = useSelector((state) => state);
	const { asPrefix = {} } = general || {};
	const redirect = () => {
		window.location.href = asPrefix;
	};
	return (
		<div className={styles.component}>
			{/* {!isMobile && <IcError height="100%" width="100%" />} */}
			<div className={styles.container}>
				<div className={styles.title}>404</div>
				<div className={styles.description}>Looks like you are off course</div>
				<div className={styles.button_container}>
					<Button onClick={() => redirect()}>Get back to base</Button>
				</div>
			</div>
		</div>
	);
}

export default Error404;
