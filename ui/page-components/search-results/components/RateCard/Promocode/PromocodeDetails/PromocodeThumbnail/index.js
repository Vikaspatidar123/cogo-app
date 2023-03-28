import {
	Container,
	BannerImage,
	CircleICon,
	Discount,
	PromoCodeName,
	PromoCodeDescription,
	Badge,
	DiscountAmount,
} from './styles';

function PromocodeThumbnail({ promotion = {}, promotion_discount = [] }) {
	return (
		<Container>
			<BannerImage img={promotion.thumbnail_image}>
				<PromoCodeName>{promotion.promocodes[0]?.promocode}</PromoCodeName>
			</BannerImage>

			{promotion_discount.unit === 'percentage' ? (
				<CircleICon>
					<Discount>
						{Math.round(promotion_discount.value)}
						%
					</Discount>
				</CircleICon>
			) : (
				<Badge>
					<DiscountAmount>
						{Math.round(promotion_discount.value)}
						{' '}
						{promotion_discount.amount_currency}
					</DiscountAmount>
				</Badge>
			)}
			<PromoCodeDescription>
				{promotion.thumbnail_description}
			</PromoCodeDescription>
		</Container>
	);
}

export default PromocodeThumbnail;
