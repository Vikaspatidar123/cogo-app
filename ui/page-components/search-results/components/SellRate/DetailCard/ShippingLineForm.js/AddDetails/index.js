import { Button } from '@cogoport/components';
import { useEffect } from 'react';

import AddLineItems from './AddLineItems';
import Loader from './Loader';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import formatAmount from '@/ui/commons/utils/formatAmount';

function AddDetails({ spotBookingDetails }) {
	const router = useRouter();

	const [{ loading }, getCheckout] = useRequest(
		{
			url    : 'get_checkout',
			method : 'get',
		},
		{ manual: true },
	);

	const detail = getCheckout?.data?.detail;
	const rate = getCheckout?.data?.rate;

	const serviceDetails = detail?.services;
	const serviceRates = rate?.services;

	const service_ids = Object.keys(serviceDetails || {}).filter((item) => {
		if (serviceDetails?.[item]?.service_type === 'fcl_freight') {
			return item;
		}
		return null;
	});

	const services = (service_ids || []).map((item) => ({ ...serviceRates?.[item], ...serviceDetails?.[item] }));

	const line_item_check = (service_ids || []).filter((id) => {
		if (serviceRates?.[id]?.line_items?.length > 0) {
			return id;
		}
		return null;
	});

	useEffect(() => {
		getCheckout.trigger({
			params: {
				id             : spotBookingDetails?.checkout_id,
				quotation_type : 'customize',
			},
		});
	}, []);

	if (getCheckout?.loading) {
		return (
			<div className={styles.container}>
				<Loader />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{(services || []).map((service) => (
				<AddLineItems
					getCheckout={getCheckout}
					service={service}
					spotBookingDetails={spotBookingDetails}
					rate={rate}
				/>
			))}
			<div className={styles.btn_container}>
				<div className={styles.price_Con}>
					<div className={styles.text}>
						<div>Total Landed Cost :</div>
						<div className={styles.price}>
							{formatAmount({
								amount   : rate?.total_price_discounted,
								currency : rate?.total_price_currency,
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 0,
								},
							})}
						</div>
					</div>
					<div className={styles.lead_text}>(Including Taxes, Convience and Platform Fees)</div>
				</div>
				<Button
					onClick={() => router.push(
						'/checkout/[checkout_id]',
						`/checkout/${spotBookingDetails?.checkout_id}`,
					)}
					disabled={line_item_check?.length !== service_ids?.length}
				>
					Go To Checkout
				</Button>
			</div>
		</div>
	);
}

export default AddDetails;
