import { Carousel } from '@cogoport/components';

import StoreCardLoader from '../../../common/StoreCardLoader';
import getCarouselData from '../../../utils/getCarouselData';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Banner({ data = {}, loading = false }) {
	const { push } = useRouter();

	const { list = [] } = data || {};

	const handelRouting = (id, filters) => {
		if (filters) {
			push(`/saas/cogo-store/category/${id}?isCategory=true}`);
		}
	};

	const CAROUSELDATA = getCarouselData({ data: list, handelRouting });

	if (loading) {
		return (
			<div className={styles.container}>
				<div>
					<StoreCardLoader width="92vw" />
				</div>
			</div>
		);
	}
	return <Carousel size="lg" slides={CAROUSELDATA} autoScroll />;
}

export default Banner;
