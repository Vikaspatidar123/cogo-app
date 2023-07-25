import { Button } from '@cogoport/components';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.css';

import { Image, useRouter } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function SuccessPage() {
	const Router = useRouter();
	const { t } = useTranslation(['common']);

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div>
					<Image
						src={GLOBAL_CONSTANTS.image_url.success_image}
						alt="Success"
						width={300}
						height={300}
					/>
				</div>
				<h1>{t('common:dunning_user_added_response_message')}</h1>
				<h2 className={styles.success_text}>{t('common:dunning_user_added_successfully')}</h2>
				<Button
					size="lg"
					className={styles.btn}
					onClick={() => Router.push('/login')}
				>
					{t('common:go_to_login_page')}
				</Button>
			</div>
		</div>
	);
}

export default SuccessPage;
