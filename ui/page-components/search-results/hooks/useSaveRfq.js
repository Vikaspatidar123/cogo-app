import { useRequest } from '@cogo/commons/hooks';
import { useRouter } from '@cogo/next';
import { useSelector } from '@cogo/store';
import isEmpty from '@cogo/utils/isEmpty';
import { toast } from '@cogoport/front/components';
import { useState } from 'react';

const useSaveRfq = ({
	total = 1,
	hookSetters = () => {},
	bookedRates = [],
	id = '',
	data = {},
	filters = {},
	setBookedRates = () => {},
	serial_id = 1,
}) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const { scope, query } = useSelector(({ general }) => ({
		isMobile : general?.isMobile,
		scope    : general?.scope,
		query    : general?.query,
	}));
	const { rfq_id } = query;

	const createRfqCheckouts = useRequest('post', false, scope)('/create_rfq_checkouts');

	const handleOverview = () => {
		setLoading(true);
		router.push('/rfq/[rfq_id]/overview', `/rfq/${rfq_id}/overview`);
		setLoading(false);
	};

	const handleNext = () => {
		if (serial_id === total) {
			handleOverview();
		} else {
			router.push('/rfq/[rfq_id]/[serial_id]', `/rfq/${rfq_id}/${serial_id + 1}`);
			hookSetters.setFilters({ ...(filters || {}), serial_id: serial_id + 1 });
		}
	};

	const handleSave = async () => {
		const rates_arr = [];
		Object.keys(bookedRates).map((item) => {
			rates_arr.push({ id: item, checked: bookedRates[item] });
			return rates_arr;
		});

		const card_ids = (rates_arr || []).filter((item) => item?.checked === true).map((item) => item?.id);

		setLoading(true);
		if (isEmpty(card_ids)) {
			handleNext();
			setLoading(false);
		} else {
			try {
				const payload = {
					id,
					search_id      : data?.spot_search_id,
					selected_cards : card_ids,
				};
				const res = await createRfqCheckouts.trigger({ data: payload });

				if (!res.hasError) {
					toast.success('Rates saved successfully!');
					setBookedRates({});
					handleNext();
					setLoading(false);
				}
			} catch (err) {
				toast.error(err?.data || 'Something went wrong!');
				setLoading(false);
			}
		}
		setLoading(false);
	};

	const handlePrevious = () => {
		setLoading(true);
		try {
			router.push('/rfq/[rfq_id]/[serial_id]', `/rfq/${rfq_id}/${serial_id - 1}`);
			hookSetters.setFilters({ ...(filters || {}), serial_id: serial_id - 1 });
			setLoading(false);
		} catch (err) {
			toast.error(err?.data);
			setLoading(false);
		}
		setLoading(false);
	};

	return { loading, handlePrevious, handleOverview, handleSave };
};

export default useSaveRfq;
