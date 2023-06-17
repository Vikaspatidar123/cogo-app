import { Card, cl, Tooltip } from '@cogoport/components';
import { IcAAboutUs, IcCCogoCoin } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function StoreCard({ isProductPage = false, item = {} }) {
	const { t } = useTranslation(['cogoStore']);
	const { product_code, id = '', cogopoints = 0 } = item;

	const { name = '', brand = {}, logo_urls = [] } = product_code || {};

	const { name: brand_name } = brand || {};

	const { push } = useRouter();

	const showProductDetails = () => {
		push(`/saas/cogo-store/${id}`);
	};

	const renderTitle = () => (
		<div className={styles.content_detail}>
			<Tooltip content={startCase(name)} placement="bottom">
				<div className={styles.card_product_name}>{startCase(name)}</div>
			</Tooltip>
		</div>
	);

	return (
		<Card
			className={cl`${styles.card} ${isProductPage ? styles.product_card : ''}`}
			themetype="primary"
			disabled={false}
			onClick={showProductDetails}
		>
			{!logo_urls && <IcAAboutUs height={170} width="100%" />}
			{logo_urls && (
				<Card.Image
					className={styles.card_image}
					imageSrc={logo_urls[0]}
					altText={t('cogoStore:main_storeCard_altText')}
				/>
			)}
			<Card.Title title={renderTitle()} />
			<Card.Description className={styles.card_content}>
				<div className={styles.card_product_value}>{brand_name}</div>
				<div className={styles.content_value}>
					<IcCCogoCoin height={20} width={25} />
					{cogopoints}
				</div>
			</Card.Description>
		</Card>
	);
}

export default StoreCard;
