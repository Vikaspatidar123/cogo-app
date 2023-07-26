import { Carousel, Placeholder } from '@cogoport/components';

import useGetPromotion from '../../../../hooks/useGetPromotion';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Promotion() {
	const { push } = useRouter();

	const { loading = false, promotionData } = useGetPromotion();
	const { promotion = [] } = promotionData || {};
	const carouselData = (data) => (
		<div onClick={() => push(data?.route_url)} role="presentation">
			{/* img use for url comeing from backend its changes any time */}
			<img className={styles.image} src={data?.image_url} alt="promotion" />
		</div>
	);
	const mainData = (promotion || []).map((data) => ({
		key    : data?.id,
		render : () => <div>{carouselData(data)}</div>,
	}));

	if (loading) {
		return <Placeholder height="450px" />;
	}
	return (
		<div>
			<Carousel
				showDots={false}
				showArrow={false}
				size="md"
				slides={mainData}
				isInfinite
				autoScroll
			/>
		</div>
	);
}
export default Promotion;
