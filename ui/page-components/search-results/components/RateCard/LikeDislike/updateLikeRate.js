import { useState } from 'react';
import { useSelector } from '@cogo/store';
import { useRequest } from '@cogo/commons/hooks';

const updateLikeRate = ({ details, updateRate, rate }) => {
	const {
		general: { query = {}, scope },
	} = useSelector((state) => state);

	const { search_id = '' } = query;

	const [loading, setLoading] = useState(false);

	const url = '/create_spot_search_rate_feedback';

	const { trigger } = useRequest('post', false, scope)(url);

	const handleLikeRateCard = async () => {
		if (rate.is_liked || loading) {
			return;
		}

		try {
			setLoading(true);

			const params = {
				id: search_id,
				is_liked: true,
				selected_card: rate.card,
				performed_by_org_id: details.importer_exporter.id,
			};

			await trigger({
				data: params,
			});

			updateRate(rate.card, {
				likes_count: (rate.likes_count || 0) + 1,
				is_liked: true,
				is_disliked: false,
			});
		} catch (err) {
			console.log(err);
		}

		setLoading(false);
	};

	return {
		handleLikeRateCard,
		loading,
	};
};

export default updateLikeRate;
