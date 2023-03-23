import { Carousel } from '@cogoport/components';

import styles from './styles.module.css';

import { Router } from '@/packages/next';

function Promotion({ promotion_data }) {
	console.log(promotion_data?.promotion[0].image_url, "promotion_data'");
	const onHandelPush = (item) => {
		Router.push(item.route_url);
	};

	const imgData = promotion_data?.promotion;

	return (
		<div style={{ border: '1px solid red' }}>
			{' '}
			{
            imgData?.forEach((element) => {
	<div style={{ border: '1px solid red' }}>
		<img src={element.image_url} alt="" />
	</div>;
	console.log(element.image_url, 'element');
            })
}
			{/* <Carousel size="md" slides={CAROUSELDATA} /> */}
			{/* { promotion_data?.promotion?.map((item) => (
				<div key={item.id} onClick={() => onHandelPush(item)}>
					<div className={styles.img}>
						<img src={item.image_url} alt="" />

					</div>
				</div>
			))} */}
		</div>
	);
}
export default Promotion;
