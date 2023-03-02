import { Tooltip } from '@cogoport/components';

import styles from './styles.module.css';
import Support from './Support';

import { useSelector } from '@/packages/store';

function Help() {
	const { agent } = useSelector(({ profile }) => ({
		agent: profile.partner?.entity_manager,
	}));

	return (
		<div className={styles.tooltip_container}>
			<Tooltip
				animation="shift-away"
				placement="bottom"
				content={<Support agent={agent} />}
				theme="light"
				interactive
			>
				<div className={styles.container}>
					<div className={styles.container}>
						<img src='https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/ic-help.svg' alt='cogo'
							style={{ cursor: 'pointer' }}
							width="22px"
							height="22px"
						/>
					</div>
				</div>
			</Tooltip>
		</div>
	);
}

export default Help;
