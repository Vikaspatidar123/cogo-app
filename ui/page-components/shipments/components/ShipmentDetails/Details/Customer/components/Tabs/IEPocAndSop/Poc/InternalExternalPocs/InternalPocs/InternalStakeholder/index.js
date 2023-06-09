import { isEmpty } from '@cogoport/utils';

import Stakeholder from './Stakeholder';
import styles from './styles.module.css';

function InternalStakeholder({
	objectKey = '',
	item = [],
	stakeholderListRefetch = () => {},
	canEditStakeholders,
}) {
	const serviceName = objectKey?.replaceAll('_', ' ');

	return (
		<div>
			<div className={styles.heading}>{isEmpty(objectKey) ? 'Shipment' : serviceName}</div>

			{(item || []).map((data) => (
				<Stakeholder
					data={data}
					serviceName={serviceName}
					canEditStakeholders={canEditStakeholders}
					stakeholderListRefetch={stakeholderListRefetch}
				/>
			))}
		</div>
	);
}

export default InternalStakeholder;
