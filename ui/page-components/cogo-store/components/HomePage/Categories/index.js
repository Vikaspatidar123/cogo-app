import { IcMArrowRight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useRef } from 'react';

import CategoryLoader from '../../../common/CategoryLoader';
import { ICON_MAPPING } from '../../../constant/iconMapping';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Categories({ data = {}, loading = false }) {
	const { t } = useTranslation(['cogoStore']);

	const { push } = useRouter();
	const scrollRef = useRef();

	const { list } = data || {};

	const handleRouting = (id = '') => {
		if (id) {
			push(`/saas/cogo-store/category/${id}?isCategory=true`);
		} else {
			push('/saas/cogo-store/allcategory');
		}
	};
	const scrollHandler = () => {
		scrollRef.current.scrollLeft += 820;
	};
	const Head = (
		<div className={styles.heading}>{t('cogoStore:categories_header')}</div>
	);

	if (loading) {
		return (
			<div className={styles.container}>
				{Head}
				<CategoryLoader />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{!isEmpty(list) && !loading && (
				<div>
					<div className={styles.flex}>
						{Head}
						<div
							role="presentation"
							className={styles.hyperlink}
							onClick={() => handleRouting()}
						>
							{t('cogoStore:view_all')}
						</div>
					</div>
					<div className={styles.item_container}>
						<div className={styles.scroll_container} ref={scrollRef}>
							{(list || []).map((item) => {
								const {
									id = '',
									display_name = '',
									category = '',
									logo_url = '',
								} = item || {};
								return (
									<div
										className={styles.tile_container}
										key={id}
										onClick={() => handleRouting(id)}
										role="presentation"
									>
										<img
											alt=""
											className={styles.image}
											src={logo_url || ICON_MAPPING[category]}
										/>
										<div className={styles.styled_text}>{display_name}</div>
									</div>
								);
							})}
						</div>
						<div
							className={styles.icon_container}
							onClick={scrollHandler}
							role="presentation"
						>
							<IcMArrowRight
								className={styles.animated_arrow}
								width={35}
								height={35}
							/>
							<IcMArrowRight width={35} height={35} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Categories;
