import { PARTNER_EVENT, APP_EVENT } from '../common/analytics/constants';
import trackEvent from '../common/analytics/trackEvent';
import getFinalServices from '../common/SearchForm/utils/getFinalServices';
import { UNDEFINED_ATTRIBUTES } from '../undefined_attributes';
import formatCreateSearch from '../utils/format-create-search';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';
import getGeoConstants from '@/ui/commons/constants/geo';
import showErrorsInToast from '@/ui/commons/utils/showErrorsInToast';

const geo = getGeoConstants();

const cogoVerseTeamIDS = [
	geo.uuid.cogoverse_admin_id,
	geo.uuid.cogoverse_executive_id,
	geo.uuid.cogoverse_kam_id,
];

const {
	cogo_demo_account_shipper,
	cogo_demo_account_shipper_user,
	cogo_demo_account_shipper_user_branch,
} = geo.uuid;

const useCreateSearch = ({
	optionsControls = {},
	options = {},
	setOptions = () => {},
	extraParams = {},
	setLoading,
	mode,
	services,
	location,
	onPush,
	importer_exporter_details = {},
	checked,
}) => {
	const { push } = useRouter();

	const {
		importer_exporter_branch_id,
		user_id,
		scope = '',
		query = {},
		userRoleIDs = [],
	} = useSelector(({ general, profile }) => ({
		scope                       : general?.scope,
		query                       : general?.query,
		userRoleIDs                 : profile?.partner?.user_role_ids,
		importer_exporter_branch_id : general?.query?.branch_id,
		user_id                     : profile?.id,
	}));

	const isCogoVerseMember = userRoleIDs.some((elem) => cogoVerseTeamIDS.includes(elem));

	const [{ loading }, createSpotSearch] = useRequest(
		{
			url    : '/create_spot_search',
			method : 'post',
		},
		{ manual: true },
	);

	const [{ loading: createCheckoutLoading }, createCheckout] = useRequest(
		{
			url    : '/create_checkout',
			method : 'post',
		},
		{ manual: true },
	);

	const createNewSearch = async (
		rawParams,
		serviceMode,
		createServices = {},
		is_service = false,
	) => {
		const spotSearchParams = { ...rawParams, search_type: serviceMode };
		const checkIsCogoVerse = scope === 'partner'
      && (query?.source === 'communication' || isCogoVerseMember);

		const formattedSpotSearchParams = formatCreateSearch(
			rawParams,
			serviceMode,
			createServices,
			is_service,
			checked,
		);

		try {
			let formattedPayload = rawParams.spot_search_params
				? spotSearchParams
				: formattedSpotSearchParams;
			if (scope === 'app') {
				formattedPayload = { ...formattedPayload, schedules_required: false };
			}
			const apiToTrigger = rawParams.is_pass_through_selected === 'pass_through'
        	? createCheckout
        	: createSpotSearch;

			if (checkIsCogoVerse) {
				formattedPayload = { ...formattedPayload, tags: ['cogoverse'] };
			}

			const { data, hasError, messages } = await apiToTrigger({
				data: formattedPayload,
			});

			if (!hasError) {
				if (rawParams.is_pass_through_selected === 'pass_through') {
					push('/checkout/[checkout_id]', `/checkout/${(data || {}).id}`);
					return {};
				}

				const as = `/book/${(data || {}).id}`;
				const href = '/book/[search_id]';

				let partneras = `${as}/${(rawParams || {}).importer_exporter_id}`;
				let partnerHref = '/book/[search_id]/[importer_exporter_id]';

				if (query?.source) {
					partneras += `?source=${query?.source}`;
					partnerHref += `?source=${query?.source}`;
				}
				const userId = (formattedPayload || {}).user_id;

				return {
					userId,
					searchId : (data || {}).id,
					messages,
					error    : hasError,
					as       : scope === 'partner' ? partneras : as,
					href     : scope === 'partner' ? partnerHref : href,
				};
			}
			return {
				error    : true,
				messages : [],
				url      : null,
			};
		} catch (err) {
			showErrorsInToast(err?.data);
			return {
				error    : true,
				messages : [],
				url      : null,
			};
		}
	};

	const handleCreate = async (values, optionsValues) => {
		setLoading(true);
		const { container_type_commodity, ...restOptions } = optionsValues;
		const rawParams = {
			importer_exporter_branch_id,
			user_id,
			...extraParams,
			...values,
			...restOptions,
			packages: (options?.values?.packages || [])?.length
				? options?.values?.packages
				: restOptions?.packages,
			...container_type_commodity,
			search_type: mode,
			location,
			importer_exporter_details,
		};
		const search_parameter = rawParams.search_type;
		const isCrmAccount = !(rawParams.name === rawParams.importer_exporter_name);
		if (scope === 'partner') {
			if (!isCrmAccount) {
				if (search_parameter === 'fcl_freight') {
					const container_details = [];
					let size;
					let type;
					let count;
					let commodity;
					let weight;
					const n = rawParams.containers.length;
					for (let i = 0; i < n; i += 1) {
						size = rawParams.containers[i].container_size;
						type = rawParams.containers[i].container_type_commodity.container_type;
						count = rawParams.containers[i].containers_count;
						commodity = rawParams.containers[i].container_type_commodity.commodity;
						weight = rawParams.containers[i].cargo_weight_per_container;
						container_details.push({
							container_count : count,
							container_size  : size,
							container_type  : type,
							commodity,
							weight,
						});
					}
					let name;
					let email;
					const flag = !!(
						rawParams.importer_exporter_id === cogo_demo_account_shipper
            && rawParams.user_id === cogo_demo_account_shipper_user
            && rawParams.importer_exporter_branch_id
              === cogo_demo_account_shipper_user_branch
            && rawParams.importer_exporter_name === 'Cogo Freight Pvt Ltd'
					);

					if (!flag) {
						const user_details = rawParams.user_options || {};
						name = user_details.name ? user_details.name : 'null';
						email = user_details.email ? user_details.email : 'null';
					}
					trackEvent(PARTNER_EVENT.search_searched_rates, {
						company_name    : rawParams.importer_exporter_name,
						is_demo_account : flag,
						user_name       : name,
						user_email      : email,
						type            : search_parameter,
						origin          : location.origin.display_name,
						destination     : location.destination.display_name,
						containers      : container_details,
						incoterm        : rawParams.inco_term,
					});
				} else if (search_parameter === 'lcl_freight') {
					let name;
					let email;
					const flag = !!(
						rawParams.importer_exporter_id === cogo_demo_account_shipper
            && rawParams.user_id === cogo_demo_account_shipper_user
            && rawParams.importer_exporter_branch_id
              === cogo_demo_account_shipper_user_branch
            && rawParams.importer_exporter_name === 'Cogo Freight Pvt Ltd'
					);

					if (!flag) {
						const user_details = rawParams.user_options || {};
						name = user_details.name ? user_details.name : 'null';
						email = user_details.email ? user_details.email : 'null';
					}
					trackEvent(PARTNER_EVENT.search_searched_rates, {
						company_name    : rawParams.importer_exporter_name,
						is_demo_account : flag,
						user_name       : name,
						user_email      : email,
						type            : search_parameter,
						origin          : location.origin.display_name,
						destination     : location.destination.display_name,
						commodity       : rawParams.commodity,
						incoterm        : rawParams.inco_term,
						packages_count  : rawParams.packages_count,
						weight          : rawParams.weight,
						volume          : rawParams.volume,
					});
				} else if (search_parameter === 'air_freight') {
					let name;
					let email;
					const flag = !!(
						rawParams.importer_exporter_id === cogo_demo_account_shipper
            && rawParams.user_id === cogo_demo_account_shipper_user
            && rawParams.importer_exporter_branch_id
              === cogo_demo_account_shipper_user_branch
            && rawParams.importer_exporter_name === 'Cogo Freight Pvt Ltd'
					);

					if (!flag) {
						const user_details = rawParams.user_options || {};
						name = user_details.name ? user_details.name : 'null';
						email = user_details.email ? user_details.email : 'null';
					}
					trackEvent(PARTNER_EVENT.search_searched_rates, {
						company_name    : rawParams.importer_exporter_name,
						is_demo_account : flag,
						user_name       : name,
						user_email      : email,
						type            : search_parameter,
						origin          : rawParams.location.origin.display_name,
						destination     : rawParams.location.destination.display_name,
						commodity       : rawParams.commodity,
						incoterm        : rawParams.inco_term,
						packages_count  : rawParams.packages_count,
						weight          : rawParams.weight,
						volume          : rawParams.volume,
					});
				} else if (search_parameter === 'trailer_freight') {
					let name;
					let email;
					const flag = !!(
						rawParams.importer_exporter_id === cogo_demo_account_shipper
            && rawParams.user_id === cogo_demo_account_shipper_user
            && rawParams.importer_exporter_branch_id
              === cogo_demo_account_shipper_user_branch
            && rawParams.importer_exporter_name === 'Cogo Freight Pvt Ltd'
					);

					if (!flag) {
						const user_details = rawParams.user_options || {};
						name = user_details.name ? user_details.name : 'null';
						email = user_details.email ? user_details.email : 'null';
					}
					const newDetail = rawParams.containers[0];
					trackEvent(PARTNER_EVENT.search_searched_rates, {
						company_name    : rawParams.importer_exporter_name,
						is_demo_account : flag,
						user_name       : name,
						user_email      : email,
						type            : search_parameter,
						origin          : location.origin.display_name,
						destination     : location.destination.display_name,
						container_count : newDetail.containers_count,
						container_size  : newDetail.container_size,
						container_type  : newDetail.container_type_commodity.container_type,
						commodity       : newDetail.container_type_commodity.commodity,
						weight          : newDetail.cargo_weight_per_container,
					});
				} else if (search_parameter === 'ftl_freight') {
					let name;
					let email;
					const flag = !!(
						rawParams.importer_exporter_id === cogo_demo_account_shipper
            && rawParams.user_id === cogo_demo_account_shipper_user
            && rawParams.importer_exporter_branch_id
              === cogo_demo_account_shipper_user_branch
            && rawParams.importer_exporter_name === 'Cogo Freight Pvt Ltd'
					);

					if (!flag) {
						const user_details = rawParams.user_options || {};
						name = user_details.name ? user_details.name : 'null';
						email = user_details.email ? user_details.email : 'null';
					}
					trackEvent(PARTNER_EVENT.search_searched_rates, {
						company_name    : rawParams.importer_exporter_name,
						is_demo_account : flag,
						user_name       : name,
						user_email      : email,
						type            : search_parameter,
						origin          : location.origin.display_name,
						destination     : location.destination.display_name,
						commodity       : rawParams.commodity,
						truck_type      : rawParams.truck_type,
						trucks_count    : rawParams.trucks_count,
					});
				} else if (search_parameter === 'ltl_freight') {
					let name;
					let email;
					const flag = !!(
						rawParams.importer_exporter_id === cogo_demo_account_shipper
            && rawParams.user_id === cogo_demo_account_shipper_user
            && rawParams.importer_exporter_branch_id
              === cogo_demo_account_shipper_user_branch
            && rawParams.importer_exporter_name === 'Cogo Freight Pvt Ltd'
					);

					if (!flag) {
						const user_details = rawParams.user_options || {};
						name = user_details.name ? user_details.name : 'null';
						email = user_details.email ? user_details.email : 'null';
					}
					const array = [];
					const n = rawParams.packages.length;
					for (let i = 0; i < n; i += 1) {
						const newDetail = rawParams.packages[i];
						const x = newDetail.packing_type;
						const { length } = newDetail.dimensions;
						const { width } = newDetail.dimensions;
						const depth = newDetail.dimensions.height;
						const l = length.toString().concat('*');
						const w = width.toString().concat('*');
						const d = depth.toString();
						const y = l.concat(w).concat(d);
						const z = newDetail.packages_count;
						array.push({
							type      : x,
							dimension : y,
							count     : z,
						});
					}
					trackEvent(PARTNER_EVENT.search_searched_rates, {
						company_name    : rawParams.importer_exporter_name,
						is_demo_account : flag,
						user_name       : name,
						user_email      : email,
						type            : search_parameter,
						origin          : location.origin.display_name,
						destination     : location.destination.display_name,
						commodity       : rawParams.commodity,
						total_weight    : rawParams.weight,
						packages        : array,
					});
				} else if (search_parameter === 'haulage_freight') {
					let name;
					let email;
					const flag = !!(
						rawParams.importer_exporter_id === cogo_demo_account_shipper
            && rawParams.user_id === cogo_demo_account_shipper_user
            && rawParams.importer_exporter_branch_id
              === cogo_demo_account_shipper_user_branch
            && rawParams.importer_exporter_name === 'Cogo Freight Pvt Ltd'
					);

					if (!flag) {
						const user_details = rawParams.user_options || {};
						name = user_details.name ? user_details.name : 'null';
						email = user_details.email ? user_details.email : 'null';
					}

					const newDetail = rawParams.containers[0];
					trackEvent(PARTNER_EVENT.search_searched_rates, {
						company_name    : rawParams.importer_exporter_name,
						is_demo_account : flag,
						user_name       : name,
						user_email      : email,
						type            : search_parameter,
						origin          : location.origin.display_name,
						destination     : location.destination.display_name,
						container_count : newDetail.containers_count,
						container_size  : newDetail.container_size,
						container_type  : newDetail.container_type_commodity.container_type,
						commodity       : newDetail.container_type_commodity.commodity,
						weight          : newDetail.cargo_weight_per_container,
					});
				} else if (search_parameter === 'fcl_customs') {
					const container_details = [];
					let size;
					let container_type;
					let count;
					let commodity;
					const location_name = rawParams.location.origin.display_name
            || {}
            || rawParams.location.desatination.display_name;
					const n = rawParams.containers.length;
					for (let i = 0; i < n; i += 1) {
						size = rawParams.containers[i].container_size;
						container_type = rawParams.containers[i].container_type_commodity.container_type;
						count = rawParams.containers[i].containers_count;
						commodity = rawParams.containers[i].container_type_commodity.commodity;
						container_details.push({
							container_count : count,
							container_size  : size,
							container_type,
							commodity,
						});
					}
					let name;
					let email;
					let type;
					const flag = !!(
						rawParams.importer_exporter_id === cogo_demo_account_shipper
            && rawParams.user_id === cogo_demo_account_shipper_user
            && rawParams.importer_exporter_branch_id
              === cogo_demo_account_shipper_user_branch
            && rawParams.importer_exporter_name === 'Cogo Freight Pvt Ltd'
					);

					if (!flag) {
						const user_details = rawParams.user_options || {};
						name = user_details.name ? user_details.name : 'null';
						email = user_details.email ? user_details.email : 'null';
					}
					if (rawParams.trade_type === 'import') {
						type = 'Destination';
					} else {
						type = 'Origin';
					}
					trackEvent(PARTNER_EVENT.search_searched_rates, {
						company_name    : rawParams.importer_exporter_name,
						is_demo_account : flag,
						user_name       : name,
						user_email      : email,
						type            : search_parameter,
						location        : location_name,
						custom_type     : type,
						containers      : container_details,
					});
				} else if (search_parameter === 'lcl_customs') {
					let name;
					let email;
					let type;
					const flag = !!(
						rawParams.importer_exporter_id === cogo_demo_account_shipper
            && rawParams.user_id === cogo_demo_account_shipper_user
            && rawParams.importer_exporter_branch_id
              === cogo_demo_account_shipper_user_branch
            && rawParams.importer_exporter_name === 'Cogo Freight Pvt Ltd'
					);
					if (!flag) {
						const user_details = rawParams.user_options || {};
						name = user_details.name ? user_details.name : 'null';
						email = user_details.email ? user_details.email : 'null';
					}
					if (rawParams.trade_type === 'import') {
						type = 'Destination';
					} else {
						type = 'Origin';
					}
					trackEvent(PARTNER_EVENT.search_searched_rates, {
						company_name    : rawParams.importer_exporter_name,
						is_demo_account : flag,
						user_name       : name,
						user_email      : email,
						type            : search_parameter,
						location        : rawParams.location.origin.display_name,
						custom_type     : type,
						commodity       : rawParams.commodity,
						packages_count  : rawParams.packages_count,
						weight          : rawParams.weight,
						volume          : rawParams.volume,
					});
				} else {
					let name;
					let email;
					let type;
					const flag = !!(
						rawParams.importer_exporter_id === cogo_demo_account_shipper
            && rawParams.user_id === cogo_demo_account_shipper_user
            && rawParams.importer_exporter_branch_id
              === cogo_demo_account_shipper_user_branch
            && rawParams.importer_exporter_name === 'Cogo Freight Pvt Ltd'
					);

					if (!flag) {
						const user_details = rawParams.user_options || {};
						name = user_details.name ? user_details.name : 'null';
						email = user_details.email ? user_details.email : 'null';
					}
					if (rawParams.trade_type === 'import') {
						type = 'Destination';
					} else {
						type = 'Origin';
					}

					trackEvent(PARTNER_EVENT.search_searched_rates, {
						company_name    : rawParams.importer_exporter_name,
						is_demo_account : flag,
						user_name       : name,
						user_email      : email,
						type            : search_parameter,
						location        : rawParams.location.origin.display_name,
						custom_type     : type,
						commodity       : rawParams.commodity,
						packages_count  : rawParams.packages_count,
						weight          : rawParams.weight,
						volume          : rawParams.volume,
					});
				}
			} else if (search_parameter === 'fcl_freight') {
				const flag = !!(
					rawParams.importer_exporter_id === cogo_demo_account_shipper
          && rawParams.user_id === cogo_demo_account_shipper_user
          && rawParams.importer_exporter_branch_id
            === cogo_demo_account_shipper_user_branch
          && rawParams.importer_exporter_name === 'Cogo Freight Pvt Ltd'
				);

				const newDetail = rawParams.containers[0];
				trackEvent(PARTNER_EVENT.search_searched_rates, {
					company_name    : rawParams.importer_exporter_name,
					is_demo_account : flag,
					user_name       : rawParams.name,
					user_email      : rawParams.email,
					type            : search_parameter,
					origin          : location.origin.display_name,
					destination     : location.destination.display_name,
					containers      : {
						...UNDEFINED_ATTRIBUTES,
						container_count : newDetail.containers_count,
						size            : newDetail.container_size,
						type            : newDetail.container_type_commodity.container_type,
						weight          : newDetail.cargo_weight_per_container, // in mertic tonnes
						commodity       : newDetail.container_type_commodity.commodity,
					},
					incoterm: rawParams.inco_term,
				});
			} else if (search_parameter === 'lcl_freight') {
				const flag = !!(
					rawParams.importer_exporter_id === cogo_demo_account_shipper
          && rawParams.user_id === cogo_demo_account_shipper_user
          && rawParams.importer_exporter_branch_id
            === cogo_demo_account_shipper_user_branch
          && rawParams.importer_exporter_name === 'Cogo Freight Pvt Ltd'
				);

				trackEvent(PARTNER_EVENT.search_searched_rates, {
					company_name    : rawParams.importer_exporter_name,
					is_demo_account : flag,
					user_name       : rawParams.name,
					user_email      : rawParams.email,
					type            : search_parameter,
					origin          : location.origin.display_name,
					destination     : location.destination.display_name,
					commodity       : rawParams.commodity,
					incoterm        : rawParams.inco_term,
					packages_count  : rawParams.packages_count,
					weight          : rawParams.weight,
					volume          : rawParams.volume,
				});
			} else if (search_parameter === 'air_freight') {
				const flag = !!(
					rawParams.importer_exporter_id === cogo_demo_account_shipper
          && rawParams.user_id === cogo_demo_account_shipper_user
          && rawParams.importer_exporter_branch_id
            === cogo_demo_account_shipper_user_branch
          && rawParams.importer_exporter_name === 'Cogo Freight Pvt Ltd'
				);

				trackEvent(PARTNER_EVENT.search_searched_rates, {
					company_name    : rawParams.importer_exporter_name,
					is_demo_account : flag,
					user_name       : rawParams.name,
					user_email      : rawParams.email,
					type            : search_parameter,
					origin          : rawParams.location.origin.display_name,
					destination     : rawParams.location.destination.display_name,
					commodity       : rawParams.commodity,
					incoterm        : rawParams.inco_term,
					packages_count  : rawParams.packages_count,
					weight          : rawParams.weight,
					volume          : rawParams.volume,
				});
			} else if (search_parameter === 'trailer_freight') {
				const flag = !!(
					rawParams.importer_exporter_id === cogo_demo_account_shipper
          && rawParams.user_id === cogo_demo_account_shipper_user
          && rawParams.importer_exporter_branch_id
            === cogo_demo_account_shipper_user_branch
          && rawParams.importer_exporter_name === 'Cogo Freight Pvt Ltd'
				);

				const newDetail = rawParams.containers[0];
				trackEvent(PARTNER_EVENT.search_searched_rates, {
					company_name    : rawParams.importer_exporter_name,
					is_demo_account : flag,
					user_name       : rawParams.name,
					user_email      : rawParams.email,
					type            : search_parameter,
					origin          : location.origin.display_name,
					destination     : location.destination.display_name,
					container_count : newDetail.containers_count,
					container_size  : newDetail.container_size,
					container_type  : newDetail.container_type_commodity.container_type,
					commodity       : newDetail.container_type_commodity.commodity,
					weight          : newDetail.cargo_weight_per_container,
				});
			} else if (search_parameter === 'ftl_freight') {
				const flag = !!(
					rawParams.importer_exporter_id === cogo_demo_account_shipper
          && rawParams.user_id === cogo_demo_account_shipper_user
          && rawParams.importer_exporter_branch_id
            === cogo_demo_account_shipper_user_branch
          && rawParams.importer_exporter_name === 'Cogo Freight Pvt Ltd'
				);

				trackEvent(PARTNER_EVENT.search_searched_rates, {
					company_name    : rawParams.importer_exporter_name,
					is_demo_account : flag,
					user_name       : rawParams.name,
					user_email      : rawParams.email,
					type            : search_parameter,
					origin          : location.origin.display_name,
					destination     : location.destination.display_name,
					commodity       : rawParams.commodity,
					truck_type      : rawParams.truck_type,
					trucks_count    : rawParams.trucks_count,
				});
			} else if (search_parameter === 'ltl_freight') {
				const flag = !!(
					rawParams.importer_exporter_id === cogo_demo_account_shipper
          && rawParams.user_id === cogo_demo_account_shipper_user
          && rawParams.importer_exporter_branch_id
            === cogo_demo_account_shipper_user_branch
          && rawParams.importer_exporter_name === 'Cogo Freight Pvt Ltd'
				);

				const array = [];
				const n = rawParams.packages.length;
				for (let i = 0; i < n; i += 1) {
					const newDetail = rawParams.packages[i];
					const x = newDetail.packing_type;
					const { length } = newDetail;
					const { width } = newDetail;
					const depth = newDetail.height;
					const l = length.toString().concat('*');
					const w = width.toString().concat('*');
					const d = depth.toString();
					const y = l.concat(w).concat(d);
					const z = newDetail.packages_count;
					array.push({
						type      : x,
						dimension : y,
						count     : z,
					});
				}
				trackEvent(PARTNER_EVENT.search_searched_rates, {
					company_name    : rawParams.importer_exporter_name,
					is_demo_account : flag,
					user_name       : rawParams.name,
					user_email      : rawParams.email,
					type            : search_parameter,
					origin          : location.origin.display_name,
					destination     : location.destination.display_name,
					commodity       : rawParams.commodity,
					total_weight    : rawParams.weight,
					packages        : array,
				});
			} else if (search_parameter === 'haulage_freight') {
				const flag = !!(
					rawParams.importer_exporter_id === cogo_demo_account_shipper
          && rawParams.user_id === cogo_demo_account_shipper_user
          && rawParams.importer_exporter_branch_id
            === cogo_demo_account_shipper_user_branch
          && rawParams.importer_exporter_name === 'Cogo Freight Pvt Ltd'
				);

				const newDetail = rawParams.containers[0];
				trackEvent(PARTNER_EVENT.search_searched_rates, {
					company_name    : rawParams.importer_exporter_name,
					is_demo_account : flag,
					user_name       : rawParams.name,
					user_email      : rawParams.email,
					type            : search_parameter,
					origin          : location.origin.display_name,
					destination     : location.destination.display_name,
					container_count : newDetail.containers_count,
					container_size  : newDetail.container_size,
					container_type  : newDetail.container_type_commodity.container_type,
					commodity       : newDetail.commodity,
					weight          : newDetail.weight,
				});
			} else if (search_parameter === 'fcl_customs') {
				let type;
				const flag = !!(
					rawParams.importer_exporter_id === cogo_demo_account_shipper
          && rawParams.user_id === cogo_demo_account_shipper_user
          && rawParams.importer_exporter_branch_id
            === cogo_demo_account_shipper_user_branch
          && rawParams.importer_exporter_name === 'Cogo Freight Pvt Ltd'
				);

				if (rawParams.trade_type === 'import') {
					type = 'Destination';
				} else {
					type = 'Origin';
				}
				const newDetail = rawParams.containers[0];
				trackEvent(PARTNER_EVENT.search_searched_rates, {
					company_name    : rawParams.importer_exporter_name,
					is_demo_account : flag,
					user_name       : rawParams.name,
					user_email      : rawParams.email,
					type            : search_parameter,
					location        : rawParams.location.origin.display_name,
					custom_type     : type,
					containers      : {
						...UNDEFINED_ATTRIBUTES,
						container_count : newDetail.containers_count,
						container_size  : newDetail.container_size,
						container_type  : newDetail.container_type_commodity.container_type,
						commodity       : newDetail.container_type_commodity.commodity,
					},
				});
			} else if (search_parameter === 'lcl_customs') {
				let type;
				const flag = !!(
					rawParams.importer_exporter_id === cogo_demo_account_shipper
          && rawParams.user_id === cogo_demo_account_shipper_user
          && rawParams.importer_exporter_branch_id
            === cogo_demo_account_shipper_user_branch
          && rawParams.importer_exporter_name === 'Cogo Freight Pvt Ltd'
				);

				if (rawParams.trade_type === 'import') {
					type = 'Destination';
				} else {
					type = 'Origin';
				}
				trackEvent(PARTNER_EVENT.search_searched_rates, {
					company_name    : rawParams.importer_exporter_name,
					is_demo_account : flag,
					user_name       : rawParams.name,
					user_email      : rawParams.email,
					type            : search_parameter,
					location        : rawParams.location.origin.display_name,
					custom_type     : type,
					commodity       : rawParams.commodity,
					packages_count  : rawParams.packages_count,
					weight          : rawParams.weight,
					volume          : rawParams.volume,
				});
			} else {
				const flag = !!(
					rawParams.importer_exporter_id === cogo_demo_account_shipper
          && rawParams.user_id === cogo_demo_account_shipper_user
          && rawParams.importer_exporter_branch_id
            === cogo_demo_account_shipper_user_branch
          && rawParams.importer_exporter_name === 'Cogo Freight Pvt Ltd'
				);
				let type;
				if (rawParams.trade_type === 'import') {
					type = 'Destination';
				} else {
					type = 'Origin';
				}

				trackEvent(PARTNER_EVENT.search_searched_rates, {
					company_name    : rawParams.importer_exporter_name,
					is_demo_account : flag,
					user_name       : rawParams.name,
					user_email      : rawParams.email,
					type            : search_parameter,
					location        : rawParams.location.origin.display_name,
					custom_type     : type,
					commodity       : rawParams.commodity,
					packages_count  : rawParams.packages_count,
					weight          : rawParams.weight,
					volume          : rawParams.volume,
				});
			}
		} else if (search_parameter === 'fcl_customs') {
			const container_details = [];
			let size;
			let type;
			let count;
			let commodity;
			const location_name = rawParams.location.origin.display_name
        || {}
        || rawParams.location.desatination.display_name;
			const n = rawParams.containers.length;
			for (let i = 0; i < n; i += 1) {
				size = rawParams.containers[i].container_size;
				type = rawParams.containers[i].container_type_commodity.container_type;
				count = rawParams.containers[i].containers_count;
				commodity = rawParams.containers[i].container_type_commodity.commodity;
				container_details.push({
					...UNDEFINED_ATTRIBUTES,
					container_count : count,
					container_size  : size,
					container_type  : type,
					commodity,
				});
			}
			trackEvent(APP_EVENT.search_searched_rates, {
				type        : search_parameter,
				location    : location_name,
				custom_type : rawParams.trade_type,
				containers  : container_details,
			});
		} else if (search_parameter === 'fcl_freight') {
			const container_details = [];
			let size;
			let type;
			let count;
			let commodity;
			let weight;
			const n = rawParams.containers.length;
			for (let i = 0; i < n; i += 1) {
				size = rawParams.containers[i].container_size;
				type = rawParams.containers[i].container_type_commodity.container_type;
				count = rawParams.containers[i].containers_count;
				commodity = rawParams.containers[i].container_type_commodity.commodity;
				weight = rawParams.containers[i].cargo_weight_per_container;
				container_details.push({
					...UNDEFINED_ATTRIBUTES,
					container_count : count,
					container_size  : size,
					container_type  : type,
					commodity,
					weight,
				});
			}
			trackEvent(APP_EVENT.search_searched_rates, {
				type        : search_parameter,
				origin      : rawParams.location.origin.display_name,
				destination : rawParams.location.destination.display_name,
				containers  : container_details,
				incoterm    : rawParams.inco_term,
			});
		}
		const newServices = getFinalServices(services, location, mode);

		const res = await createNewSearch(rawParams, mode, newServices);

		if (!res?.error && res?.href) {
			push(res.href, res.as);
			if (onPush) {
				onPush();
			}
		} else {
			setLoading(false);
		}
	};

	const submitRfq_Contract = (values) => new Promise((resolve) => {
		const formData = {};
		formData.values = null;
		formData.isValues = false;

		if (optionsControls.display.length > 0) {
			options.handleSubmit(
				(optionVals) => {
					formData.values = { ...values, ...optionVals, location };
					formData.isValues = true;
				},
				(errs) => {
					setOptions({ ...options, error: 'Please select required options' });
					options.onError(errs);
					formData.values = null;
					formData.isValues = false;
				},
			)();
		}

		setTimeout(() => {
			resolve({ formData });
		}, 300);
	});

	const submitData = async (values, e) => {
		e.preventDefault();
		if (scope === 'partner' && !extraParams.importer_exporter_id) {
			showErrorsInToast(['Please select importer exporter']);
			return;
		}
		if (scope === 'partner' && !extraParams.importer_exporter_branch_id) {
			showErrorsInToast(['Please select organization branch ']);
			return;
		}
		if (scope === 'partner' && !extraParams.user_id) {
			showErrorsInToast(['Please select organization user ']);
			return;
		}
		if (optionsControls.display.length > 0) {
			options.handleSubmit(
				(optionVals) => {
					handleCreate(values, optionVals);
				},
				(errs) => {
					setOptions({ ...options, error: 'Please select required options' });
					options.onError(errs);
				},
			)();
		}
	};

	return { submitRfq_Contract, submitData, createNewSearch };
};

export default useCreateSearch;
