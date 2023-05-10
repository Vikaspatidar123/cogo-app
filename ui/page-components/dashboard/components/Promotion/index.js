import { Carousel, Placeholder } from '@cogoport/components';

import useGetPromotion from '../../hooks/useGetPromotion';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Promotion() {
	const { push } = useRouter();

	const { loading = false, promotionData = {} } = useGetPromotion();
	const imgData = promotionData?.promotion;

	const carouselData = (data) => (
		<div onClick={() => push(data.route_url)} role="presentation">
			<img className={styles.image} src={data.image_url} alt="img" />
		</div>
	);

	const mainData = [];

	// imgData?.forEach((data) => {
	// 	mainData.push({
	// 		key    : data?.id,
	// 		render : () => (<div>{carouselData(data)}</div>),
	// 	});
	// });

	return (
		<div>
			{loading && <Placeholder />}
			{!loading && (
				<Carousel
					showDots={false}
					showArrow={false}
					size="md"
					slides={mainData}
					isInfinite
				/>
			)}
		</div>
	);
}
export default Promotion;
