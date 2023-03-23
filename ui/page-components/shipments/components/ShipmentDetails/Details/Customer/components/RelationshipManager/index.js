import { Popover } from '@cogoport/components';
import { IcMCall } from '@cogoport/icons-react';

import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function RelationshipManager() {
	const profile = useSelector((state) => state.profile);

	const content = (
		<div className={styles.contact_details}>
			<span style={{ marginRight: '4px' }}> Mob No :</span>
			<span>
				{profile?.organization?.agent?.mobile_country_code}
				{' '}
				{'  '}
				{profile?.organization?.agent?.mobile_number}
			</span>
		</div>
	);

	return (
		<div className={styles.container}>
			<div className={styles.name}>
				Your Support Manager :
				<span style={{ fontWeight: 500, marginLeft: '6px' }}>
					{profile?.organization?.agent?.name}
				</span>
			</div>
			<Popover placement="bottom" theme="light" render={content}>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<IcMCall style={{ cursor: 'pointer', marginRight: '20px' }} />
				</div>
			</Popover>
		</div>
	);
}

export default RelationshipManager;
