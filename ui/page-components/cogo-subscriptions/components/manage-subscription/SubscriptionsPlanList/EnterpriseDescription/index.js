import { Button } from '@cogoport/components';

import LoadingBtn from '../../../../asset/loading.svg';

import styles from './styles.module.css';

function EnterpriseDescription({ requestCallback = () => {}, callbackLoading }) {
	return (
		<div className={styles.flex_column}>
			<div className={styles.label}>Enterprise</div>
			<div className={styles.sub_heading}>Tailor a plan to your needs</div>
			<div className={`${styles.subscribe} ${styles.wrapper}`}>
				<Button
					onClick={requestCallback}
					disabled={callbackLoading}
					className={callbackLoading ? 'disabled' : ''}
					size="md"
					themeType="secondary"
				>
					{callbackLoading ? (
						<LoadingBtn width="100px" height="15px" />
					) : (
						'Request Callback'
					)}
				</Button>
			</div>
		</div>
	);
}

export default EnterpriseDescription;
