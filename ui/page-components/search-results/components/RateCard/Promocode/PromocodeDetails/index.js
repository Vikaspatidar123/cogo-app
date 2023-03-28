import Modal from '@cogoport/front/components/admin/Modal';

import PromocodeThumbnail from './PromocodeThumbnail';
import {
	HeaderText,
	Container,
	Row,
	Details,
	DetailsTitle,
	DetailsDescription,
	TermsTitle,
	Terms,
	TermsContent,
} from './styles';

function PromocodeDetails({ promotion = {}, setShowDetails = () => {} }) {
	return (
		<Modal className="primary xl" onClose={() => setShowDetails(false)} show>
			<HeaderText>Promo code Available</HeaderText>
			<Container>
				{promotion.promotion_discounts.map((promotion_discount) => (
					<Row>
						<PromocodeThumbnail
							promotion={promotion}
							promotion_discount={promotion_discount}
						/>
						<Details>
							<DetailsTitle>{promotion.promocodes[0]?.promocode}</DetailsTitle>
							<DetailsDescription>{promotion?.description}</DetailsDescription>
						</Details>
					</Row>
				))}
				<Row>
					<Terms>
						<TermsTitle>Terms & Conditions </TermsTitle>
						{promotion.terms_and_conditions?.map((term, i) => (
							<TermsContent>
								{i + 1}
								.
								{term}
							</TermsContent>
						))}
					</Terms>
				</Row>
			</Container>
		</Modal>
	);
}

export default PromocodeDetails;
