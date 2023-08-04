import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useDislikeFeedback = ({ reset, details, rate, updateRate, onClose }) => {
	const {
		general: { query = {} },
		profile,
	} = useSelector((state) => state);

	const { search_id = '' } = query;

	const freight = rate.service_type;

	const keysToSend = {
		fcl_freight     : 'preferred_freight_rate',
		ftl_freight     : 'preferred_freight_rate',
		air_freight     : 'preferred_freight_rate',
		ltl_freight     : 'preferred_freight_rate',
		lcl_freight     : 'preferred_freight_rate',
		fcl_customs     : 'preferred_customs_rate',
		lcl_customs     : 'preferred_customs_rate',
		air_customs     : 'preferred_customs_rate',
		haulage_freight : 'preferred_freight_rate',
		trailer_freight : 'preferred_freight_rate',
	};
	const keysToSendCurr = {
		fcl_freight     : 'preferred_freight_rate_currency',
		ftl_freight     : 'preferred_freight_rate_currency',
		air_freight     : 'preferred_freight_rate_currency',
		ltl_freight     : 'preferred_freight_rate_currency',
		lcl_freight     : 'preferred_freight_rate_currency',
		fcl_customs     : 'preferred_customs_rate_currency',
		lcl_customs     : 'preferred_customs_rate_currency',
		air_customs     : 'preferred_customs_rate_currency',
		haulage_freight : 'preferred_freight_rate_currency',
		trailer_freight : 'preferred_freight_rate_currency',
	};

	const [{ loading }, trigger] = useRequest(
		{
			url    : 'create_spot_search_rate_feedback',
			method : 'post',
		},
		{ manual: true },
	);

	const onSubmitFeedback = async (values = {}) => {
		const keyToSend = keysToSend[freight];
		const keyCurrency = keysToSendCurr[freight];
		const { preferred_freight_rate, preferred_freight_rate_currency, ...rest } =			values;

		try {
			if (preferred_freight_rate && !preferred_freight_rate_currency) {
				Toast.error('Please add currency');
			} else {
				const body = {
					id                    : search_id,
					is_disliked           : true,
					...rest,
					preferred_airline_ids : values.preferred_airline_ids || undefined,
					preferred_shipping_line_ids:
						values.preferred_shipping_line_ids || undefined,
					remarks       : values.remarks ? [values.remarks] : undefined,
					[keyToSend]   : values.preferred_freight_rate || undefined,
					[keyCurrency] : values.preferred_freight_rate_currency || undefined,
					preferred_detention_free_days:
						values.preferred_detention_free_days || undefined,
					selected_card       : rate.card,
					performed_by_org_id : details?.importer_exporter?.id,
					cogo_entity_id      : profile?.organization?.partner_id,
				};

				await trigger({
					data: body,
				});

				updateRate(rate.card, {
					is_disliked : true,
					likes_count : rate.is_liked ? rate.likes_count - 1 : rate.likes_count,
					is_liked    : false,
				});

				onClose(false);

				reset();
			}
		} catch (err) {
			Toast.error('Something went wrong');
		}
	};

	return {
		onSubmitFeedback,
		loading,
	};
};

export default useDislikeFeedback;
