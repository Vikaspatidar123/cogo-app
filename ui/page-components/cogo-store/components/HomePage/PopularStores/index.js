import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import Carousel from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import CarouselLoader from '../../../common/CarouselLoader';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

const CAROUSEL_SETTINGS = {
	dots: true,
	infinite: false,
	speed: 1000,
	autoplaySpeed: 5000,
	slidesToShow: 5,
	slidesToScroll: 5,
	autoplay: false,
	arrows: false,
	pauseOnHover: true,
};

function PopularStores({ data = {}, loading = false }) {
	const { t } = useTranslation(['cogoStore']);
	const { push } = useRouter();

	const { list = [] } = data || {};

	const handleRoute = (brandId) => {
		push(`/saas/cogo-store/category/${brandId}?isBrand=true`);
	};

	const Head = (
		<div className={styles.heading}>
			{t('cogoStore:popular_brands')}
			{' '}
			🎁
		</div>
	);

	if (loading) {
		return (
			<div className={styles.container}>
				{Head}
				<CarouselLoader />
			</div>
		);
	}

	return (
		<div>
			{isEmpty(list) && !loading && (
				<div className={styles.container}>
					{Head}
					{t('cogoStore:empty_state_text')}
				</div>
			)}
			{!isEmpty(list) && !loading && (
				<div className={styles.container}>
					{Head}
					<Carousel {...CAROUSEL_SETTINGS}>
						{(list || []).map((item, index) => {
							const {
								logo_url: newLogo,
								id: newId,
								name,
								available_products = 0,
							} = item || {};
							if (index % 2 === 0) {
								return (
									<div key={newId} className={styles.flex}>
										<div className={styles.wrapper}>
											<div
												role="presentation"
												className={styles.small_image_box}
												onClick={() => handleRoute(newId)}
											>
												<img
													alt=""
													className={styles.small_image}
													src={newLogo}
												/>
												{available_products > 0 && (
													<div className={styles.overlay}>
														<div className={styles.hover_text}>
															<div className={styles.text_name}>{name}</div>
															<div className={styles.text_no}>
																{available_products}
																{' '}
																Coupons
															</div>
														</div>
													</div>
												)}
											</div>
										</div>
										{list[index + 1]?.logo_url && (
											<div className={styles.wrapper}>
												<div
													role="presentation"
													className={styles.small_image_box}
													onClick={() => handleRoute(list[index + 1]?.id)}
												>
													<img
														alt=""
														className={styles.small_image}
														src={list[index + 1]?.logo_url}
													/>
													{list[index + 1]?.available_products > 0 && (
														<div className={styles.overlay}>
															<div className={styles.hover_text}>
																<div className={styles.text_name}>
																	{list[index + 1]?.name}
																</div>
																<div className={styles.text_no}>
																	{list[index + 1]?.available_products}
																	{' '}
																	Coupons
																</div>
															</div>
														</div>
													)}
												</div>
											</div>
										)}
									</div>
								);
							}
							return null;
						})}
					</Carousel>
				</div>
			)}
		</div>
	);
}

export default PopularStores;
