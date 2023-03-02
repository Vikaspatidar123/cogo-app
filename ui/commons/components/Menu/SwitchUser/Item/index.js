import { Avatar } from '@cogoport/components';

import KycStatus from '../../KycStatus';

import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

const MAPPING = {
	importer_exporter : 'Importer/Exporter',
	service_provider  : 'Service',
};
function SwitchPartnerItem({ item }) {
	const { organization, branch = '' } = useSelector(({ profile }) => profile);
	const { account_type = '', id } = organization || {};

	const onSwitch = () => {
		window.location.href = `/v2/${item.id}/${branch?.id}/dashboard`;
	};
	return (
		<div
			className={styles.container}
			disabled={item.id === id}
			onClick={() => onSwitch(item.id)}
			role="presentation"
		>
			<div className={styles.main}>
				<Avatar name={item.business_name} />

				<div className={styles.partner_details}>
					<div className={styles.partner_name}>{item.business_name}</div>
					<div className={styles.type}>
						{MAPPING[account_type]}

					</div>
				</div>
			</div>

			<KycStatus
				kyc_status={item.kyc_status}
			/>
		</div>
	);
}

export default SwitchPartnerItem;
