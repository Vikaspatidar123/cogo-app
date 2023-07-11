import { cl, Button } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function EnterpriseDescription({
	requestCallback = () => { },
	callbackLoading,
	setActiveHover,
	activeIndex,
}) {
	const { t } = useTranslation(['subscriptions']);
	return (
		<div
			className={styles.flex_column}
			onMouseEnter={() => {
				setActiveHover();
			}}
			onMouseLeave={() => {
				setActiveHover(activeIndex);
			}}
		>
			<div className={styles.container}>
				<div className={styles.label}>{t('subscriptions:enterprise_text')}</div>
				<div className={styles.sub_heading}>
					<IcMTick width={20} height={20} />
					{t('subscriptions:enterprise_description_text')}
				</div>
				<div className={`${styles.wrapper} ${styles.subscribe}`}>
					<Button
						role="presentation"
						onClick={requestCallback}
						disabled={callbackLoading}
						className={cl`${styles.request_button} ${styles.button} 
						${callbackLoading ? styles.disabled : ''}`}
						type="button"
					>
						{callbackLoading ? (
							<Image
								src={GLOBAL_CONSTANTS.image_url.loading_image}
								alt={t('subscriptions:loading_text')}
								width={25}
								height={20}
							/>
						) : (
							t('subscriptions:request_callback_button_text')
						)}

					</Button>
				</div>
			</div>
		</div>
	);
}

export default EnterpriseDescription;
