import { Button } from '@cogoport/components';
import { IcCFtick } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

function SuccessPage() {
	const { push } = useRouter();

	const { t } = useTranslation(['createTicketPublic']);

	const {
		general: { query: { token = '' } = {} },
	} = useSelector((state) => state);

	const pushToDetailsPage = () => {
		if (token) {
			push('/ticket-details/[token]', `/ticket-details/${token}`, false);
		}
	};
	return (
		<div className={styles.container}>
			<div className={styles.layout_div}>
				<IcCFtick className={styles.success_icon} />
				<div className={styles.heading}>{t('createTicketPublic:success_title')}</div>
				<div className={styles.sub_text}>{t('createTicketPublic:success_sub_title')}</div>
				<div className={styles.button_wrapper}>
					<Button themeType="primary" type="button" onClick={pushToDetailsPage}>
						{t('createTicketPublic:success_btn')}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default SuccessPage;
