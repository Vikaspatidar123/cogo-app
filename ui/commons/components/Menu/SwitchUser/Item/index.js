import { Avatar, Badge, Tooltip } from '@cogoport/components';

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
	const activeUser = organization.id === item.id;
	const onSwitch = () => {
		window.location.href = `/${item.id}/${branch?.id}/dashboard`;
	};
	return (
		<div
			className={`${styles.container} ${activeUser && styles.active}`}
			disabled={item.id === id}
			onClick={() => onSwitch(item.id)}
			role="presentation"
		>
			<div className={styles.main}>
				{activeUser ? (
					<Badge
						placement="right"
						color="rgb(87 195 79 / 94%)"
						size="md"
						text=""
					>
						<Avatar name={item.business_name} />
					</Badge>
				) : (
					<Avatar name={item.business_name} />
				)}

				<div className={styles.partner_details}>
					<Tooltip
						content={<div style={{ color: 'grey' }}>{item.business_name}</div>}
					>
						<div className={styles.partner_name}>{item.business_name.substring(0, 13)}</div>
					</Tooltip>
					<div className={styles.type}>{MAPPING[account_type]}</div>
				</div>
			</div>

			<KycStatus kyc_status={item.kyc_status} />
		</div>
	);
}

export default SwitchPartnerItem;
