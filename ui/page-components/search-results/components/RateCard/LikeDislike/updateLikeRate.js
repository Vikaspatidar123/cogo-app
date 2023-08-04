import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useUpdateLikeRate = ({ details, updateRate, rate }) => {
	const {
		general: { query = {} },
		profile,
	} = useSelector((state) => state);

	const { search_id = '' } = query;

	const [{ loading }, trigger] = useRequest(
		{
			url    : 'create_spot_search_rate_feedback',
			method : 'post',
		},
		{ manual: true },
	);

	const handleLikeRateCard = async () => {
		if (rate.is_liked || loading) {
			return;
		}

		try {
			const params = {
				id                  : search_id,
				is_liked            : true,
				selected_card       : rate?.card,
				performed_by_org_id : details?.importer_exporter?.id,
				cogo_entity_id      : profile?.organization?.partner_id,

			};

			await trigger({
				data: params,
			});

			updateRate(rate.card, {
				likes_count : (rate.likes_count || 0) + 1,
				is_liked    : true,
				is_disliked : false,
			});
		} catch (err) {
			console.log(err);
		}
	};

	return {
		handleLikeRateCard,
		loading,
	};
};

export default useUpdateLikeRate;
