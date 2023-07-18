import { Button, Popover } from '@cogoport/components';
import { IcMAgentManagement } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import HelpCard from '../HelpCard';

import styles from './styles.module.css';

function LayoutHelp() {
	const { t } = useTranslation(['common']);
	const translationKey = 'common:helpButton';

	return (
		<div className={styles.help}>

			<Popover placement="bottom" render={(<HelpCard />)}>

				<Button size="md" themeType="accent" type="button">
					<IcMAgentManagement
						style={{ marginRight: '4px' }}
					/>
					{t(`${translationKey}_label`)}
				</Button>

			</Popover>

		</div>
	);
}

export default LayoutHelp;
