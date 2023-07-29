import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import { useRouter } from '@/packages/next';
import { trackEvent, APP_EVENT } from '@/ui/commons/constants/analytics';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import useCreateSearch from '@/ui/page-components/discover_rates/hooks/useCreateSearch';
import formatMainServiceData from '@/ui/page-components/discover_rates/utils/format-main-service-data';
import { OTHER_PARAMS } from '@/ui/page-components/new-dashboard/constant';

function BtnContainer({ data = {} }) {
	const { search_type } = data;

	const { push } = useRouter();

	const { t } = useTranslation(['dashboard']);

	const { createNewSearch } = useCreateSearch({});

	const formattedData = formatMainServiceData(search_type, [
		{ ...(data || {}), service_type: search_type },
	]);

	const handleQuotationClick = async () => {
		const params = {
			...formattedData,
			search_type,
			status    : 'active',
			commodity : data.commodity,
		};

		(OTHER_PARAMS[search_type] || []).forEach((param) => {
			params[param] = formattedData[param];
		});

		if (params.search_type === 'fcl_freight' || params.search_type === 'fcl_customs') {
			const container_details = params.containers.map((container) => {
				const {
					container_size,
					container_type_commodity,
					containers_count,
					cargo_weight_per_container,
				} = container;
				const { container_type, commodity } = container_type_commodity;
				return {
					container_count : containers_count,
					container_size,
					container_type,
					commodity,
					weight          : cargo_weight_per_container,
				};
			});

			trackEvent(APP_EVENT.search_past_spot_rates, {
				type        : params.search_type,
				origin      : params.search_type === 'fcl_customs' ? params.location : params.origin_port.name,
				destination : params.search_type === 'fcl_customs' ? params.location : params.destination_port.name,
				containers  : container_details,
				incoterm    : params.inco_term,
			});
		} else if (params.search_type === 'lcl_freight' || params.search_type === 'air_freight'
			|| params.search_type === 'lcl_customs' || params.search_type === 'air_customs') {
			trackEvent(APP_EVENT.search_past_spot_rates, {
				type           : params.search_type,
				origin         : params.location,
				destination    : params.location,
				commodity      : params.commodity,
				incoterm       : params.inco_term,
				packages_count : params.packages_count,
				weight         : params.weight,
				volume         : params.volume,
			});
		} else if (params.search_type === 'trailer_freight' || params.search_type === 'haulage_freight') {
			const { containers } = params;
			if (containers && containers.length > 0) {
				const {
					container_size, container_type, containers_count,
					commodity, cargo_weight_per_container,
				} = containers[GLOBAL_CONSTANTS.zeroth_index];
				trackEvent(APP_EVENT.search_past_spot_rates, {
					type            : params.search_type,
					origin          : params.origin_location.name,
					destination     : params.destination_location.name,
					container_count : containers_count,
					container_size,
					container_type,
					commodity,
					weight          : cargo_weight_per_container,
				});
			}
		} else if (params.search_type === 'ftl_freight') {
			trackEvent(APP_EVENT.search_past_spot_rates, {
				type        : params.search_type,
				origin      : params.origin_location.name,
				destination : params.destination_location.name,
				commodity   : params.commodity,
				truck_type  : params.truck_type,
				truck_count : params.trucks_count,
			});
		} else if (params.search_type === 'ltl_freight') {
			const packages_values = params.packages.map((details) => {
				const { packing_type, dimensions, packages_count } = details;
				const { length, width, height } = dimensions;
				const dimension = `${length}*${width}*${height}`;

				return {
					type  : packing_type,
					dimension,
					count : packages_count,
				};
			});

			trackEvent(APP_EVENT.search_past_spot_rates, {
				type         : params.search_type,
				origin       : params.origin_location.name,
				destination  : params.destination_location.name,
				commodity    : params.commodity,
				total_weight : params.weight,
				packages     : packages_values,
			});
		}

		const postData = await createNewSearch(params, search_type);
		if (!postData.error) {
			push(postData.href, postData.as);
		}
	};

	return (
		<Button
			onClick={() => handleQuotationClick()}
			size="sm"
			themeType="accent"
			type="button"
		>
			{t('dashboard:book_text')}
		</Button>
	);
}

export default BtnContainer;
