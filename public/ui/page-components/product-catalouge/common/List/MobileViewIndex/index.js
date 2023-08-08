import { Loader } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

const getMobileViewControlMapping = ({ t }) => (
	[t('productCatalogue:product_catalogue_mobile_view_text_1'),
		t('productCatalogue:product_catalogue_mobile_view_text_2'),
		t('productCatalogue:product_catalogue_mobile_view_text_3'),
		t('productCatalogue:product_catalogue_mobile_view_text_4'),
		t('productCatalogue:product_catalogue_mobile_view_text_5')]
);

function MobileView({
	fields, infoData, itm, loading,
}) {
	const { t } = useTranslation(['common', 'productCatalogue']);

	const MOBILE_VIEW_CONTROL_MAPPING = getMobileViewControlMapping({ t });

	const data = {};
	fields.forEach((singleItem) => {
		data[singleItem?.label || 'renderIcon'] = singleItem;
	});
	return (
		<div className={styles.container}>
			{loading ? (
				<>
					{[...Array(5).keys()].map(() => (
						<div className={styles.div_container}>
							<div className={styles.label}>
								<Loader height="16px" width="80px" />
							</div>
							<div className={styles.value}>
								<Loader height="16px" width="200px" />
							</div>
						</div>
					))}
				</>
			) : (
				<>
					{data?.renderIcon && <div className={styles.icon}>{infoData(data.renderIcon, itm)}</div>}
					{MOBILE_VIEW_CONTROL_MAPPING.map(
						(key) => (
							<div className={styles.div_container}>
								<div className={styles.label}>
									{key}
									:
								</div>
								<div className={styles.value}>{infoData(data[key], itm)}</div>
							</div>
						),
					)}
				</>
			)}
		</div>
	);
}
export default MobileView;
