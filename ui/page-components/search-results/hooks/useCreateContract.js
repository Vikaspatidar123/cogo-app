import { useRequest, useScope } from '@cogo/commons/hooks';
import { toast } from '@cogoport/front/components';
import { useSelector } from '@cogo/store';

const useCreateContract = ({
	data = {},
	setPriceLocked = () => {},
	setContractData = () => {},
	setShowContract = () => {},
	search_type = '',
}) => {
	const { scope } = useScope();
	const { query } = useSelector(({ general }) => ({
		query: general.query,
	}));

	const { loading, trigger } = useRequest(
		'post',
		false,
		scope,
	)('/create_spot_search_contract');

	const createContract = async (values) => {
		const {
			max_containers_count = 0,
			max_volume = 0,
			max_weight = 0,
			preferred_shipping_line_ids = '',
			exclude_shipping_line_ids = '',
		} = values || {};

		try {
			const body = {
				...values,
				status: 'pending_approval',
				id: query?.search_id,
				selected_card: data?.card,
				preferred_shipping_line_ids: preferred_shipping_line_ids || undefined,
				exclude_shipping_line_ids: exclude_shipping_line_ids || undefined,
				max_containers_count:
					search_type === 'fcl_freight'
						? Number(max_containers_count)
						: undefined,
				max_volume:
					search_type === 'lcl_freight' ? Number(max_volume) : undefined,
				max_weight:
					search_type === 'air_freight' ? Number(max_weight) : undefined,
			};
			const res = await trigger({ data: body });
			setShowContract(false);
			setPriceLocked(true);
			if (res?.data) {
				setContractData({ ...values, ...res?.data, search_type });
			}
		} catch (e) {
			toast.error(e?.error?.message);
		}
	};
	return {
		loading,
		createContract,
	};
};
export default useCreateContract;
