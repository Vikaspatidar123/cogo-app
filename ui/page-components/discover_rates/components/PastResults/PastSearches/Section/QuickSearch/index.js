import React, { useState } from 'react';
import { shape, bool, string, func } from 'prop-types';
import useForm from '@cogoport/front/hooks/useFormCogo';
import { Popover } from '@cogo/deprecated_legacy/ui';
import { useRouter } from '@cogo/next';
import showErrorsInToast from '@cogo/utils/showErrorsInToast';
import { usePartnerEntityType } from '@cogo/commons/hooks';
import { trackEvent } from '@cogo/commons/analytics';
import { APP_EVENT } from '@cogo/commons/analytics/constants';
import { IcMSearchlight } from '@cogoport/icons-react';
import Header from './Header';
import Form from '../../../../../../common/FormElement';
import useCreateSearch from '../../../../../../hooks/useCreateSearch';
import getConfiguration from '../../../../../../hooks/configuration';
import formatMainServiceData from '../../../../../../utils/format-main-service-data';

import { Container } from './styles';
import { Rates, EditOptions } from '../styles';

const QuickSearch = ({ data, extraParams = {}, mobile, type, refresh }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [show, setShow] = useState(false);
	const className = `${mobile ? 'mobile' : ''} ${type || ''}`;
	const { search_type } = data;
	const [errors, setErrors] = useState({});
	const { createNewSearch } = useCreateSearch({});

	const { push } = useRouter();
	const { isChannelPartner = false } = usePartnerEntityType();
	const tempControls = getConfiguration(
		'controls-quick-search',
		search_type,
		isChannelPartner,
	);

	const formattedData = formatMainServiceData(search_type, [
		{ ...(data || {}), service_type: search_type },
	]);

	const controls = tempControls.map((item) => ({
		...item,
		value: formattedData[item.name],
	}));

	const { fields, handleSubmit } = useForm(controls);

	const submit = async (values, e) => {
		e.preventDefault();
		setIsLoading(true);

		if (values === null) {
			setIsLoading(false);
			return;
		}

		const params = {
			...formattedData,
			...values,
			search_type,
			status: 'active',
			commodity: data.commodity,
			...extraParams,
		};

		const otherParams = {
			fcl_freight: ['origin_port_id', 'destination_port_id'],
			lcl_freight: ['origin_port_id', 'destination_port_id', 'inco_term'],
			air_freight: ['origin_airport_id', 'destination_airport_id', 'inco_term'],
			trailer_freight: [
				'origin_location_id',
				'destination_location_id',
				'haulage_type',
				'transport_mode',
				'shipping_line_id',
			],
			ftl_freight: ['origin_location_id', 'destination_location_id'],
			ltl_freight: ['origin_location_id', 'destination_location_id'],
			fcl_customs: ['port_id'],
			lcl_customs: ['trade_type', 'packages_count', 'location_id'],
			air_customs: ['trade_type', 'packages_count', 'airport_id'],
			haulage_freight: [
				'origin_location_id',
				'destination_location_id',
				'haulage_type',
				'transport_mode',
				'shipping_line_id',
			],
		};

		(otherParams[search_type] || []).forEach((param) => {
			params[param] = formattedData[param];
		});
		if (params.search_type === 'fcl_freight') {
			const container_details = [];
			let size;
			let container_type;
			let count;
			let commodity;
			let weight;
			const n = params.containers.length;
			for (let i = 0; i < n; i += 1) {
				size = params.containers[i].container_size;
				container_type =
					params.containers[i].container_type_commodity.container_type;
				count = params.containers[i].containers_count;
				commodity = params.containers[i].container_type_commodity.commodity;
				weight = params.containers[i].cargo_weight_per_container;
				container_details.push({
					container_count: count,
					container_size: size,
					container_type,
					commodity,
					weight,
				});
			}
			trackEvent(APP_EVENT.search_past_spot_rates, {
				type: params.search_type,
				origin: params.origin_port.name,
				destination: params.destination_port.name,
				containers: container_details,
				incoterm: params.inco_term,
			});
		} else if (params.search_type === 'lcl_freight') {
			trackEvent(APP_EVENT.search_past_spot_rates, {
				type: params.search_type,
				origin: params.origin_port.name,
				destination: params.destination_port.name,
				commodity: params.commodity,
				incoterm: params.inco_term,
				packages_count: params.packages_count,
				weight: params.weight,
				volume: params.volume,
			});
		} else if (params.search_type === 'air_freight') {
			trackEvent(APP_EVENT.search_past_spot_rates, {
				type: params.search_type,
				origin: params.origin_airport.name,
				destination: params.destination_airport.name,
				commodity: params.commodity,
				incoterm: params.inco_term,
				packages_count: params.packages_count,
				weight: params.weight,
				volume: params.volume,
			});
		} else if (
			params.search_type === 'trailer_freight' ||
			params.search_type === 'haulage_freight'
		) {
			trackEvent(APP_EVENT.search_past_spot_rates, {
				type: params.search_type,
				origin: params.origin_location.name,
				destination: params.destination_location.name,
				container_count: params.containers[0].containers_count,
				container_size: params.containers[0].container_size,
				container_type: params.containers[0].container_type,
				commodity: params.containers[0].commodity,
				weight: params.containers[0].cargo_weight_per_container,
			});
		} else if (params.search_type === 'ftl_freight') {
			trackEvent(APP_EVENT.search_past_spot_rates, {
				type: params.search_type,
				origin: params.origin_location.name,
				destination: params.destination_location.name,
				commodity: params.commodity,
				truck_type: params.truck_type,
				truck_count: params.trucks_count,
			});
		} else if (params.search_type === 'ltl_freight') {
			const packages_values = [];
			const n = params.packages.length;
			for (let i = 0; i < n; i += 1) {
				const details = params.packages[i];
				const x = details.packing_type;
				const { length } = details.dimensions;
				const { width } = details.dimensions;
				const depth = details.dimensions.height;
				const l = length.toString().concat('*');
				const w = width.toString().concat('*');
				const d = depth.toString();
				const y = l.concat(w).concat(d);
				const z = details.packages_count;
				packages_values.push({
					type: x,
					dimension: y,
					count: z,
				});
			}
			trackEvent(APP_EVENT.search_past_spot_rates, {
				type: params.search_type,
				origin: params.origin_location.name,
				destination: params.destination_location.name,
				commodity: params.commodity,
				total_weight: params.weight,
				packages: packages_values,
			});
		} else if (params.search_type === 'fcl_customs') {
			const container_details = [];
			let size;
			let container_type;
			let count;
			let commodity;
			let weight;
			const n = params.containers.length;
			for (let i = 0; i < n; i += 1) {
				size = params.containers[i].container_size;
				container_type =
					params.containers[i].container_type_commodity.container_type;
				count = params.containers[i].containers_count;
				commodity = params.containers[i].container_type_commodity.commodity;
				weight = params.containers[i].cargo_weight_per_container;
				container_details.push({
					container_count: count,
					container_size: size,
					container_type,
					commodity,
					weight,
				});
			}
			trackEvent(APP_EVENT.search_past_spot_rates, {
				type: params.search_type,
				location: params.location,
				custom_type: params.custom_type,
				containers: container_details,
			});
		} else if (
			params.search_type === 'lcl_customs' ||
			params.search_type === 'air_customs'
		) {
			trackEvent(APP_EVENT.search_past_spot_rates, {
				type: params.search_type,
				location: params.location,
				custom_type: params.custom_type,
				commodity: params.commodity,
				packages_count: params.packages_count,
				weight: params.weight,
				volume: params.volume,
			});
		}

		const postData = await createNewSearch(params, search_type);
		if (!postData.error) {
			push(postData.href, postData.as);
		} else {
			setIsLoading(false);
			showErrorsInToast(postData.messages);
		}
	};

	const onError = (err) => {
		setErrors(err);
	};

	const renderPopover = () => (
		<Container className={mobile ? 'mobile' : ''}>
			<form onSubmit={handleSubmit(submit, onError)}>
				<Header onClose={() => setShow(false)} isLoading={isLoading} />
				<Form
					controls={controls}
					fields={fields}
					mode={search_type}
					errors={errors}
				/>
			</form>
		</Container>
	);

	const buttonText =
		type === 'negotiation'
			? 'REPEAT SEARCH'
			: (mobile && <IcMSearchlight width="20px" height="20px" fill="#fff" />) ||
			  'Show Rates';

	return (
		<>
			<Rates
				className={className}
				onClick={handleSubmit(submit, onError)}
				disabled={isLoading}
			>
				{buttonText}
				{refresh && refresh()}
			</Rates>
			{(type !== 'negotiation' && (
				<Popover
					show={show}
					withArrow
					usePortal
					placement="left"
					renderBody={renderPopover}
					onOuterClick={() => {
						setShow(false);
					}}
					onClickOutside={() => {
						setShow(false);
					}}
				>
					<EditOptions
						onClick={() => {
							setShow(true);
						}}
						className={className}
					>
						{mobile ? 'Edit' : 'Edit Options'}
					</EditOptions>
				</Popover>
			)) ||
				null}
		</>
	);
};

QuickSearch.propTypes = {
	data: shape({}).isRequired,
	extraParams: shape({}),
	mobile: bool,
	type: string,
	refresh: func,
};

QuickSearch.defaultProps = {
	extraParams: {},
	mobile: false,
	type: null,
	refresh: null,
};

export default QuickSearch;
