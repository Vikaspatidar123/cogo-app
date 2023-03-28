import { useRequest } from '@cogo/commons/hooks';
import formatAmount from '@cogo/globalization/utils/formatAmount';
import { useRouter } from '@cogo/next';
import { useSelector } from '@cogo/store';
import { Button } from '@cogoport/front/components/admin';
import { useEffect } from 'react';

import AddLineItems from './AddLineItems';
import Loader from './Loader';
import { Container, BtnContainer, PriceCon, Text, LeadText } from './styles';

function AddDetails({ spotBookingDetails }) {
	const { scope } = useSelector(({ general }) => ({
		scope: general?.scope,
	}));

	const router = useRouter();
	const getCheckout = useRequest('get', false, scope)('/get_checkout');

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
			<Container>
				<Loader />
			</Container>
		);
	}

	return (
		<Container>
			{(services || []).map((service) => (
				<AddLineItems
					getCheckout={getCheckout}
					service={service}
					spotBookingDetails={spotBookingDetails}
					rate={rate}
				/>
			))}
			<BtnContainer>
				<PriceCon>
					<Text>
						<div>Total Landed Cost :</div>
						<div className="price">
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
					</Text>
					<LeadText>(Including Taxes, Convience and Platform Fees)</LeadText>
				</PriceCon>
				<Button
					onClick={() => router.push(
						'/checkout/[checkout_id]',
						`/checkout/${spotBookingDetails?.checkout_id}`,
					)}
					disabled={line_item_check?.length !== service_ids?.length}
				>
					Go To Checkout
				</Button>
			</BtnContainer>
		</Container>
	);
}

export default AddDetails;
