import { Tooltip } from '@cogoport/components';
import { IcCCogoCoin } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import Carousel from 'react-slick';

import CarouselLoader from '../../../common/CarouselLoader';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

const CAROUSEL_SETTINGS = {
	dots: true,
	infinite: true,
	speed: 1000,
	autoplaySpeed: 5000,
	slidesToShow: 4,
	slidesToScroll: 4,
	autoplay: true,
	arrows: false,
	pauseOnHover: true,
	responsive: [
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
			},
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			},
		},
	],
};

function TrendingStores({ data = {}, loading = false }) {
	const { t } = useTranslation(['cogoStore']);
	const { push } = useRouter();
	const { list } = data || {};

	const Head = (
		<div className={styles.heading}>
			{t('cogoStore:trending_offers')}
			{' '}
			🔥
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
	const renderName = (name = '') => {
		if (name.length > 15) {
			return (
				<Tooltip content={name} interactive>
					<div>
						{name.substring(0, 15)}
						...
					</div>
				</Tooltip>
			);
		}
		return name;
	};

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
						{(list || []).map((item) => {
							const { id = '', cogopoints = 0, product_code } = item || {};
							const {
								name = '',
								brand,
								logo_urls = [],
								category,
							} = product_code || {};
							const { name: brandName = '' } = brand || {};
							const { display_name = '' } = category || {};

							return (
								<div className={styles.wrapper} key={id}>
									<div
										role="presentation"
										className={styles.offer_box}
										key={id}
										onClick={() => push(`/saas/cogo-store/${id}`)}
									>
										<img alt="" className={styles.image} src={logo_urls?.[0]} />
										<div className={styles.sub_text}>{display_name || '-'}</div>
										<div className={styles.flex}>
											<div className={styles.details_div}>
												<div className={styles.product_details}>
													{renderName(name)}
												</div>
												<div className={styles.sub_text}>{brandName}</div>
											</div>
											<div className={styles.amount_div}>
												<div className={styles.amount}>
													<IcCCogoCoin className={styles.styled_ic_cogo_coin} />
													<div className={styles.value}>{cogopoints}</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</Carousel>
				</div>
			)}
		</div>
	);
}

export default TrendingStores;
