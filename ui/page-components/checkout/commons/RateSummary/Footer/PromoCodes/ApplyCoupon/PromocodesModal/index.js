import { Button, Input, Modal } from '@cogoport/components';
import { useState } from 'react';

import useGetCheckoutPromocodes from '../../../../../../hooks/useGetCheckoutPromocodes';
import useUpdateCheckoutPromotion from '../../../../../../hooks/useUpdateCheckoutPromotion';
import Empty from '../Empty/index';

import Loading from './Loading';
import PromocodeThumbnail from './PromocodeThumbnail';
import styles from './styles.module.css';

const promoCodesBgColors = [
	'linear-gradient(90deg, rgba(204, 197, 249, 0.8) -4.34%, rgba(195, 216, 254, 0.6) 105.7%)',
	'linear-gradient(90deg, rgba(245, 191, 157, 0.7) 0%, rgba(239, 135, 152, 0.525) 105.39%)',
	'linear-gradient(90deg, rgba(209, 255, 241, 0.8) -4.74%, rgba(108, 188, 227, 0.6) 105.77%)',
	'linear-gradient(90deg, rgba(252, 237, 191, 0.8) -4.11%, rgba(239, 155, 96, 0.6) 105.32%)',
];
const promoCodesDashedBorderColors = [
	'1px dashed #8cc1f9',
	'1px dashed #f48e8e',
	'1px dashed #8CC1F9',
	'1px dashed #DA9A3B',
];

function PromocodeDetails({
	setShowCoupons = () => {},
	setCouponApplied,
	refetch,
	showCoupons,
	isCouponApplied,
	appliedPromotion,
}) {
	const { updateCheckoutPromotion } = useUpdateCheckoutPromotion();
	const [promocode, setPromocode] = useState();
	const { data, loading, searchPromocode } = useGetCheckoutPromocodes();
	const { list = [] } = data || {};

	const removeCoupon = async () => {
		const applyRes = await updateCheckoutPromotion(
			appliedPromotion.id,
			'inactive',
		);
		if (applyRes) {
			await refetch();
			setCouponApplied(false);
			setShowCoupons(false);
		}
	};

	return (
		<Modal
			onClose={() => setShowCoupons(false)}
			onOuterClick={() => setShowCoupons(false)}
			show={showCoupons}
			size="lg"
		>
			<div className={styles.modal_container}>
				<Modal.Header className={styles.header_text} title="Promo codes" />

				{loading && <Loading />}
				{!loading && list?.length === 0 && <Empty />}
				{!loading && list.length > 1 ? (
					<>
						<div className={styles.promo_code_container}>
							<div className={styles.search_div}>
								<Input
									value={promocode}
									onChange={(e) => setPromocode(e.target.value)}
									placeholder="Enter Promo code here...."
								/>
								<Button onClick={() => searchPromocode(promocode)}>
									Search
								</Button>
							</div>
							{isCouponApplied && (
								<div className={styles.remove_offer_div}>
									<div
										className={styles.remove_link}
										role="presentation"
										onClick={removeCoupon}
									>
										Remove Offer

									</div>
									<div className={styles.offer_text}>(This will apply the initial discount)</div>
								</div>
							)}
						</div>
						<div className={styles.container}>
							<div className={styles.title_container}>

								<div className={styles.details_title}>More offers available:</div>
								<div className={`${styles.text} ${styles.title_fs}`} size="14px" color="#828282">
									Select coupon to apply
								</div>
							</div>
							<div className={styles.row}>
								{(list || []).map((promotion, index) => (
									<div className={styles.col1} key={promotion?.id}>
										<PromocodeThumbnail
											key={promotion}
											promotion={promotion}
											setShowCoupons={setShowCoupons}
											setCouponApplied={setCouponApplied}
											refetch={refetch}
											bgColor={promoCodesBgColors[index % promoCodesBgColors.length]}
											dashedColor={
												promoCodesDashedBorderColors[
													index % promoCodesDashedBorderColors.length]
											}
										/>
									</div>
								))}
							</div>
						</div>
					</>
				) : (
					!loading
					&& list.length > 0 && (
						<div className={styles.styled_row}>
							<div className={styles.col1}>
								<PromocodeThumbnail
									promotion={list[0]}
									setShowCoupons={setShowCoupons}
									setCouponApplied={setCouponApplied}
									refetch={refetch}
									dataLength={list.length}
									bgColor={promoCodesBgColors[0]}
									dashedColor={promoCodesBgColors[0]}
								/>
							</div>
							<div className={styles.col}>
								<div className={styles.styled_text}>Terms & Conditions</div>
								<ol className="ml-16">
									{list[0].terms_and_conditions.map((val) => (
										<li key={val}>
											<div className={styles.text} size="12px" color="#4F4F4F">
												{val}
											</div>
										</li>
									))}
								</ol>
							</div>
						</div>
					)
				)}
			</div>
		</Modal>
	);
}

export default PromocodeDetails;
