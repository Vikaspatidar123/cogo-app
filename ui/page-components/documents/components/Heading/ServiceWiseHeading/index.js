import { Button, Select } from '@cogoport/components';

import styles from './styles.module.css';

function ServiceWiseHeading({ setServiceType = () => {}, serviceType = '' }) {
	return (
		<div className={styles.header}>
			<div className={styles.or}>
				or
			</div>

			<div className={styles.title}>
				Upload or Check Documents for Specific Services
			</div>

			<div className={styles.form}>
				<Select
					type="select"
					placeholder="Service Name"
					options={[{ label: 'FCL Customs', value: 'fcl_customs_service' }]}
					value={serviceType}
					onChange={setServiceType}
					isClearable
					style={{ width: '200px' }}
				/>

				<Button themeType="accent" className={styles.button}>
					Submit
				</Button>
			</div>
		</div>
	);
}

export default ServiceWiseHeading;
