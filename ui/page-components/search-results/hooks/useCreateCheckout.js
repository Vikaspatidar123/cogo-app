import { useState } from 'react';
import { useRequest } from '@cogo/commons/hooks';
import { useSelector } from '@cogo/store';
import { flattenErrorToString } from '@cogo/commons/helpers';
import { useRouter } from '@cogo/next';
import isEmpty from '@cogo/utils/isEmpty';
import { toast } from '@cogoport/front/components';
import getGeoConstants from '@cogo/globalization/constants/geo';

const geo = getGeoConstants();

const cogoVerseTeamIDS = [
	geo.uuid.cogoverse_admin_id,
	geo.uuid.cogoverse_executive_id,
	geo.uuid.cogoverse_kam_id,
];

const useCreateCheckout = ({
	data = {},
	spot_search_id = '',
	id = '',
	source = '',
}) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [confirmation, setConfirmation] = useState(false);
	const [noRatesServices, setNoRatesServices] = useState([]);

	const {
		scope = '',
		query = {},
		userRoleIDs = [],
	} = useSelector(({ general, profile }) => ({
		scope: general?.scope,
		query: general?.query,
		userRoleIDs: profile?.partner?.user_role_ids,
	}));

	const { trigger } = useRequest(
		'post',
		false,
		scope,
	)('/create_spot_search_checkout');
	const createRfqCheckouts = useRequest(
		'post',
		false,
		scope,
	)('/create_rfq_checkouts');

	const handleCreateCheckout = async () => {
		setLoading(true);

		const isCogoVerseMember = userRoleIDs.some((elem) =>
			cogoVerseTeamIDS.includes(elem),
		);

		const params = {
			id: query?.search_id,
			source: source || null,
			selected_card: data?.card,
			tags:
				scope === 'partner' &&
				(query?.source === 'communication' || isCogoVerseMember)
					? ['cogoverse']
					: undefined,
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
					let partnerHref = `/checkout/[checkout_id]`;
					let partnerAs = `/checkout/${res?.data?.id}`;

					if (query?.source) {
						partnerAs += `?source=${query.source}`;
						partnerHref += `?source=${query.source}`;
					}
					router.push(partnerHref, partnerAs);
				}
			} else {
				setLoading(false);
				setConfirmation(false);
				toast.error(res?.messages);
			}
		} catch (e) {
			toast.error(flattenErrorToString(e));
			setLoading(false);
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
		setLoading(true);
		try {
			const payload = {
				id: query?.rfq_id,
				search_id: spot_search_id,
				selected_cards: [id],
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
			toast.error(err?.data || 'Something went wrong!');
			setLoading(false);
		}
		setLoading(false);
	};

	return {
		handleBook,
		loading,
		confirmation,
		setConfirmation,
		noRatesServices,
		handleSave,
	};
};

export default useCreateCheckout;
