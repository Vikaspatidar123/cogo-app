import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from '../styles.module.css';

function TitleContainer({ getDraftData = {} }) {
	const { t } = useTranslation(['dutiesTaxesCalculator']);

	return (
		<>
			{getDraftData?.headerResponse && (
				<div className={`${styles.success_msg} ${styles.txt}`}>
					{t('dutiesTaxesCalculator:validate_hscode_modal_title_container_1')}
					<br />
					{' '}
					{t('dutiesTaxesCalculator:validate_hscode_modal_title_container_2')}
				</div>
			)}
			<div>
				<div className={`${styles.subheading} ${styles.row_div}`}>
					<div className={styles.txt}>
						<div className={styles.text}>
							{t('dutiesTaxesCalculator:validate_hscode_modal_title_container_3')}
						</div>
						<div className={styles.hr} />
					</div>

					<Tooltip
						content={(
							<div className={styles.text}>
								{t('dutiesTaxesCalculator:validate_hscode_modal_title_container_4')}
							</div>
						)}
						interactive
						placement="top"
					>
						<div>
							<IcMInfo height={13} width={13} fill="#F68B21" />
						</div>
					</Tooltip>
				</div>

			</div>
		</>
	);
}

export default TitleContainer;
