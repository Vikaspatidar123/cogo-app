import React from 'react';

import styles from './styles.module.css';

import Carousel, { CarouselItem } from '@/ui/components/Carousel';
import { useTranslation } from '@/ui/components/LocaleTranslationContext';
import SpotCard from '@/ui/components/SpotCard';
import { useGetUserLocationContent } from '@/ui/components/UserLocationContentContext';

function CarouselBanner() {
	const { t } = useTranslation(['spot_search']);

	const {
		spotSearch_spotCard_img1,
		spotSearch_spotCard_img2,
		spotSearch_spotCard_img3,
	} = useGetUserLocationContent();

	return (
		<div
			className={styles.carousel_container}
		>

			<Carousel>
				<CarouselItem>
					<SpotCard
						heading={t('design_card')}
						image={spotSearch_spotCard_img1}
						description={t('spotcard_description1')}
					/>
				</CarouselItem>
				<CarouselItem>
					<SpotCard
						heading={t('design_card')}
						image={spotSearch_spotCard_img2}
						description={t('spotcard_description2')}
					/>
				</CarouselItem>
				<CarouselItem>
					<SpotCard
						heading={t('design_card')}
						image={spotSearch_spotCard_img3}
						description={t('spotcard_description3')}
					/>
				</CarouselItem>
			</Carousel>

		</div>
	);
}

export default CarouselBanner;
