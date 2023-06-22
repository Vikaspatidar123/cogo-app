import { Button, Popover } from '@cogoport/components';
import { IcMAgentManagement } from '@cogoport/icons-react';

import HelpCard from '../HelpCard';

import styles from './styles.module.css';

function LayoutHelp() {
	return (
		<div className={styles.help}>

			<Popover placement="bottom" render={(<HelpCard />)}>

				<Button size="md" themeType="accent">
					<IcMAgentManagement
						style={{ marginRight: '4px' }}
					/>
					Help
				</Button>

			</Popover>

		</div>
	);
}

export default LayoutHelp;
