import { APP_EVENT } from '../common/analytics/constants';
import trackEvent from '../common/analytics/trackEvent';
import getFinalServices from '../common/SearchForm/utils/getFinalServices';
import formatCreateSearch from '../utils/format-create-search';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';
import { UNDEFINED_ATTRIBUTES } from '@/ui/commons/constants/undefined_attributes';
import showErrorsInToast from '@/ui/commons/utils/showErrorsInToast';

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
		// query = {},
		// userRoleIDs = [],
	} = useSelector(({ general, profile }) => ({
		query                       : general?.query,
		userRoleIDs                 : profile?.partner?.user_role_ids,
		importer_exporter_branch_id : general?.query?.branch_id,
		user_id                     : profile?.id,
	}));

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

		const formattedSpotSearchParams = formatCreateSearch(
			rawParams,
			serviceMode,
			createServices,
			is_service,
			checked,
		);
		try {
			const formattedPayload = rawParams.spot_search_params
				? spotSearchParams
				: formattedSpotSearchParams;
			const apiToTrigger = rawParams.is_pass_through_selected === 'pass_through'
				? createCheckout
				: createSpotSearch;

			const { data, hasError, messages } = await apiToTrigger({
				data: { ...formattedPayload, schedules_required: false },
			});

			if (!hasError) {
				if (rawParams.is_pass_through_selected === 'pass_through') {
					push('/checkout/[checkout_id]', `/checkout/${(data || {}).id}`);
					return {};
				}

				const as = `/book/${(data || {}).id}`;
				const href = '/book/[search_id]';

				const userId = (formattedPayload || {}).user_id;

				return {
					userId,
					searchId : (data || {}).id,
					messages,
					error    : hasError,
					as,
					href,
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
		if (search_parameter === 'fcl_customs') {
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

	return { submitRfq_Contract, submitData, createNewSearch, loading, createCheckoutLoading };
};

export default useCreateSearch;
