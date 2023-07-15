import { Popover, Button } from '@cogoport/components';
import { IcMAgentManagement } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import HelpCard from '../HelpCard';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function LayoutLogo() {
	const { t } = useTranslation(['common']);
	const translationKey = 'common:helpButton';

	return (
		<div className={styles.header}>

			<a href="/">
				<img
					src={GLOBAL_CONSTANTS.image_url.cogoport_logo}
					alt="Cogoport"
				/>
			</a>

			<div className={styles.help_mobile}>
				<Popover placement="bottom" render={(<HelpCard t={t} />)}>
					<Button size="md" themeType="accent">
						<IcMAgentManagement
							style={{ marginRight: '4px' }}
						/>
						{t(`${translationKey}_label`)}
					</Button>
				</Popover>
			</div>

		</div>
	);
}

export default LayoutLogo;
