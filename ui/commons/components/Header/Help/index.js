import { Tooltip } from '@cogoport/components';

import HelpIcon from './ic-help.svg';
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
						<HelpIcon
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
