import { Popover, Button } from '@cogoport/components';
import { IcMAgentManagement } from '@cogoport/icons-react';

import HelpCard from '../HelpCard';

import styles from './styles.module.css';

function LayoutLogo() {
	return (
		<div className={styles.header}>

			<a href="/">
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/cogoport.svg"
					alt="Cogoport"
				/>
			</a>

			<div className={styles.help_mobile}>
				<Popover placement="bottom" render={(<HelpCard />)}>
					<Button size="md" themeType="accent">
						<IcMAgentManagement
							style={{ marginRight: '4px' }}
						/>
						Help
					</Button>
				</Popover>
			</div>

		</div>
	);
}

export default LayoutLogo;
