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
		return (
			<Placeholder height="450px">
				<svg width="65" height="53" viewBox="0 0 65 53" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M58.1641 0.833496H6.83073C3.29194 0.833496 0.414062 3.71137 0.414062
						7.25016V45.7502C0.414062 49.289 3.29194 52.1668
						6.83073 52.1668H58.1641C61.7029 52.1668 64.5807
						49.289 64.5807 45.7502V7.25016C64.5807 3.71137 61.7029
						0.833496 58.1641 0.833496ZM14.8516
					10.4585C16.1279 10.4585 17.352 10.9655 18.2545 11.868C19.157
					12.7706 19.6641
					13.9946 19.6641 15.271C19.6641 16.5474 19.157 17.7714 18.2545
					18.6739C17.352 19.5765 16.1279 20.0835
					14.8516 20.0835C13.5752 20.0835 12.3511 19.5765 11.4486
					18.6739C10.5461 17.7714 10.0391
					16.5474 10.0391 15.271C10.0391 13.9946 10.5461 12.7706
					11.4486 11.868C12.3511
					10.9655 13.5752 10.4585 14.8516 10.4585V10.4585ZM32.4974
					42.5418H10.0391L22.8724 26.5002L27.6849
					32.9168L37.3099 20.0835L54.9557 42.5418H32.4974Z"
						fill="#BDBDBD"
					/>
				</svg>
			</Placeholder>
		);
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
