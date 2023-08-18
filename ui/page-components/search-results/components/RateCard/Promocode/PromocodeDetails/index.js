import { Modal } from '@cogoport/components';

import PromocodeThumbnail from './PromocodeThumbnail';
import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function PromocodeDetails({ promotion = {}, setShowDetails = () => {} }) {
	return (
		<Modal onClose={() => setShowDetails(false)} show>
			<div className={styles.header_text}>Promo code Available</div>
			<div className={styles.container}>
				{promotion.promotion_discounts.map((promotion_discount) => (
					<div className={styles.row}>
						<PromocodeThumbnail
							promotion={promotion}
							promotion_discount={promotion_discount}
						/>
						<div className={styles.details}>
							<div className={styles.details_title}>
								{promotion.codes?.
									[GLOBAL_CONSTANTS.zeroth_index]?.promocode}
							</div>
							<div className={styles.details_description}>{promotion?.description}</div>
						</div>
					</div>
				))}
				<div className={styles.row}>
					<div className={styles.terms}>
						<div className={styles.terms_title}>Terms & Conditions </div>
						{promotion.terms_and_conditions?.map((term, i) => (
							<div className={styles.terms_content}>
								{i + 1}
								.
								{term}
							</div>
						))}
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default PromocodeDetails;
