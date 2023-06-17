import { cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import { ICON_MAPPING } from '../../../constant/iconMapping';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function Categories({
	categories = [],
	categoryId = '',
	displayCategoryProduct,
}) {
	const { t } = useTranslation(['cogoStore']);
	const activeCategory = categoryId || 'All';

	return (
		<div className={styles.categories}>
			<div
				className={cl`${styles.category} ${activeCategory === 'All' ? styles.category_active : ''}`}
				onClick={() => displayCategoryProduct()}
				role="presentation"
			>
				<div className={styles.category_icon}>
					<img
						src={GLOBAL_CONSTANTS.image_url.category_image}
						alt={t('cogoStore:orderHistory_card_image_alt')}
						className={cl` ${styles.all_icon}`}
					/>
				</div>
				<div className={styles.category_name}>{t('cogoStore:all')}</div>
			</div>

			{(categories || []).map(({ display_name, id, category, logo_url }) => (
				<div
					key={id}
					className={cl`${styles.category} ${activeCategory === id ? styles.category_active : ''}`}
					onClick={() => displayCategoryProduct(id, display_name)}
					role="presentation"
				>
					<div className={styles.category_icon}>
						<img
							src={logo_url || ICON_MAPPING[category]}
							alt={t('cogoStore:orderHistory_card_image_alt')}
							className={styles.category_img}
						/>
					</div>
					<div className={styles.category_name}>{display_name}</div>
				</div>
			))}
		</div>
	);
}

export default Categories;
