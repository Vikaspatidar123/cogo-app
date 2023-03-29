import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

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

	const { query } = useSelector(({ general }) => ({
		query: general?.query,
	}));
	const { rfq_id } = query;

	const [{ loading }, createRfqCheckouts] = useRequest(
		{
			url    : 'create_rfq_checkouts',
			method : 'post',
		},
		{ manual: true },
	);

	const handleOverview = () => {
		router.push('/rfq/[rfq_id]/overview', `/rfq/${rfq_id}/overview`);
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

		if (isEmpty(card_ids)) {
			handleNext();
		} else {
			try {
				const payload = {
					id,
					search_id      : data?.spot_search_id,
					selected_cards : card_ids,
				};
				const res = await createRfqCheckouts.trigger({ data: payload });

				if (!res.hasError) {
					Toast.success('Rates saved successfully!');
					setBookedRates({});
					handleNext();
				}
			} catch (err) {
				Toast.error(err?.data || 'Something went wrong!');
			}
		}
	};

	const handlePrevious = () => {
		try {
			router.push('/rfq/[rfq_id]/[serial_id]', `/rfq/${rfq_id}/${serial_id - 1}`);
			hookSetters.setFilters({ ...(filters || {}), serial_id: serial_id - 1 });
		} catch (err) {
			Toast.error(err?.data);
		}
	};

	return { loading, handlePrevious, handleOverview, handleSave };
};

export default useSaveRfq;
