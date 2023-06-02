import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';
import showErrorsInToast from '@/ui/commons/utils/showErrorsInToast';

const useCreateCheckout = ({
	data = {},
	spot_search_id = '',
	id = '',
	source = '',
}) => {
	const router = useRouter();
	const [confirmation, setConfirmation] = useState(false);
	const [noRatesServices, setNoRatesServices] = useState([]);
	const {
		query = {},
	} = useSelector(({ general }) => ({
		query: general?.query,
	}));

	const [{ loading }, trigger] = useRequest(
		{
			url    : 'create_spot_search_checkout',
			method : 'post',
		},
		{ manual: true },
	);

	const [{ loading : createLoading }, createRfqCheckouts] = useRequest(
		{
			url    : 'create_rfq_checkouts',
			method : 'post',
		},
		{ manual: true },
	);

	const handleCreateCheckout = async () => {
		const params = {
			id            : query?.search_id,
			source        : source || null,
			selected_card : data?.card,

		};

		try {
			const res = await trigger({ data: params });
			if (!res.hasError) {
				setConfirmation(false);

				if (query.shipment_id) {
					router.push(
						'/checkout/[checkout_id]/[shipment_id]',
						`/checkout/${res?.data?.id}/${query.shipment_id}`,
					);
				} else {
					let partnerHref = '/checkout/[checkout_id]';
					let partnerAs = `/checkout/${res?.data?.id}`;

					if (query?.source) {
						partnerAs += `?source=${query.source}`;
						partnerHref += `?source=${query.source}`;
					}
					router.push(partnerHref, partnerAs);
				}
			} else {
				setConfirmation(false);
				Toast.error(res?.messages);
			}
		} catch (e) {
			showErrorsInToast(e?.response?.data);
			setConfirmation(false);
		}
	};

	const handleBook = () => {
		const { service_rates } = data || {};
		const rates = Object.keys(service_rates).map(
			(service) => service_rates[service],
		);
		const no_rates_services = [];
		(rates || []).forEach((rate) => {
			if (rate?.is_rate_available === false) {
				let serviceName = '';
				if (rate?.service_type === 'subsidiary') {
					if (rate?.trade_type === 'export') {
						serviceName = `origin:${rate?.service_name}:${rate?.service}`;
					} else if (rate?.trade_type === 'import') {
						serviceName = `destination:${rate?.service_name}`;
					} else {
						serviceName = `${rate?.service_name}:${rate?.service}`;
					}
				} else if (rate?.trade_type === 'export') {
					serviceName = `origin:${rate?.service_type}:${rate?.service || ''}`;
				} else if (rate?.trade_type === 'import') {
					serviceName = `destination:${rate?.service_type || ''}`;
				} else {
					serviceName = rate?.service_type;
				}

				no_rates_services.push(serviceName);
			}
		});
		const isFclLocals = no_rates_services.includes('fcl_freight_local');

		if (!isEmpty(no_rates_services) && isFclLocals) {
			setNoRatesServices(no_rates_services);
			setConfirmation(true);
		} else {
			handleCreateCheckout();
		}
	};

	const handleSave = async () => {
		try {
			const payload = {
				id             : query?.rfq_id,
				search_id      : spot_search_id,
				selected_cards : [id],
			};
			const res = await createRfqCheckouts.trigger({ data: payload });
			if (!res.hasError) {
				const checkout_id = res?.data?.checkout_ids?.[0];
				router.push(
					'/rfq/[rfq_id]/[serial_id]/csq/[checkout_id]',
					`/rfq/${query?.rfq_id}/${query?.serial_id}/csq/${checkout_id}`,
				);
			}
		} catch (err) {
			Toast.error(err?.data || 'Something went wrong!');
		}
	};

	return {
		handleBook,
		loading,
		confirmation,
		setConfirmation,
		noRatesServices,
		handleSave,
		createLoading,
	};
};

export default useCreateCheckout;
