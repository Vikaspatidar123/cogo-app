import { Button, Select, Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function ServiceWiseHeading({
	setServiceType = () => {},
	serviceType = '',
	refetch = () => {},
	setShowServiceList = () => {},
}) {
	const handleSubmit = () => {
		if (isEmpty(serviceType)) {
			Toast.error('Please select a service!');
			return;
		}

		setShowServiceList(true);
		refetch({ service_type: serviceType });
	};

	const handleSelect = (val) => {
		setServiceType(val);

		if (isEmpty(val)) {
			setServiceType('');
			setShowServiceList(false);
			refetch();
		}
	};

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
					options={[{ label: 'FCL Customs', value: 'fcl_customs' }]}
					value={serviceType}
					onChange={(e) => handleSelect(e)}
					isClearable
					style={{ width: '200px' }}
				/>

				<Button themeType="accent" className={styles.button} onClick={handleSubmit}>
					Submit
				</Button>
			</div>
		</div>
	);
}

export default ServiceWiseHeading;
