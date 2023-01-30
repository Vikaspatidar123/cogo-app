import { Avatar } from '@cogoport/components';

import KycStatus from '../../KycStatus';

import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function SwitchPartnerItem({ item }) {
	const { partner } = useSelector(({ profile }) => profile);

	let accountType = '';
	const accountTypes = item.verifications?.map(
		({ account_type }) => account_type,
	);

	if (accountTypes.length === 2) {
		accountType = 'Channel Partner, Service Provider';
	} else if (accountTypes[0] === 'importer_exporter') {
		accountType = 'Channel Partner';
	} else if (accountTypes[0] === 'service_provider') {
		accountType = 'Service Provider';
	}

	return (
		<div
			className={styles.container}
			href={`/${item.id}/dashboard`}
			disabled={item.id === partner?.id}
		>
			<div className={styles.main}>
				<Avatar name={item.business_name} />

				<div className={styles.partner_details}>
					<div className={styles.partner_name}>{item.business_name}</div>
					<div className={styles.type}>{accountType}</div>
				</div>
			</div>

			<KycStatus
				verifications={item.verifications}
				twin_importer_exporter_id={item.twin_importer_exporter_id}
			/>
		</div>
	);
}

export default SwitchPartnerItem;
