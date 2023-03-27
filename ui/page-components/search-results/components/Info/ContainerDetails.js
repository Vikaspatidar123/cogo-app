import React from 'react';
import { Flex, ToolTip } from '@cogoport/front/components';
import startCase from '@cogo/utils/startCase';
import { FlexCol, ContainerValues } from './styles';
import CLASS_MAPPING from '../../../business-modules/components/Search/Air/utils/classMapping';

const GOODS_MAPPING = [
	'fcl_freight',
	'trailer_freight',
	'haulage_freight',
	'fcl_customs',
	'fcl_cfs',
	'fcl_freight_local',
];

const LOAD_CARGO_MAPPING = [
	'lcl_freight',
	'air_freight',
	'lcl_customs',
	'air_customs',
	'ltl_freight',
	'lcl_freight_local',
	'air_freight_local',
];

const LOAD_TRUCK_MAPPING = ['ftl_freight'];

const ROUND_FIG_NUMBER = 1000000;

const ConatinerDetails = ({ data = {} }) => {
	const { commodity_details, service_details = {} } = data || {};

	const {
		commodity_type = '',
		commodity_class = '',
		commodity_subtype: commoditySubType = '',
	} = commodity_details?.[0] || {};

	const airFreightService = [];
	const airFreightLocalService = [];
	const lclFreightService = [];
	const airCustomsService = [];
	const lclCustomsService = [];

	Object.values(service_details).forEach((service_data) => {
		if (
			service_data.service_type === 'air_freight' &&
			data?.search_type === 'air_freight'
		) {
			airFreightService.push(service_data);
		}
	});

	Object.values(service_details).forEach((service_data) => {
		if (
			service_data.service_type === 'air_freight_local' &&
			data?.search_type === 'air_freight_local'
		) {
			airFreightLocalService.push(service_data);
		}
	});

	Object.values(service_details).forEach((service_data) => {
		if (
			service_data.service_type === 'lcl_freight' &&
			data?.search_type === 'lcl_freight'
		) {
			lclFreightService.push(service_data);
		}
	});

	Object.values(service_details).forEach((service_data) => {
		if (
			service_data.service_type === 'air_customs' &&
			data?.search_type === 'air_customs'
		) {
			airCustomsService.push(service_data);
		}
	});

	Object.values(service_details).forEach((service_data) => {
		if (
			service_data.service_type === 'lcl_customs' &&
			data?.search_type === 'lcl_customs'
		) {
			lclCustomsService.push(service_data);
		}
	});

	let packageCount = 0;
	let totalPackageVolume = 0;
	let totalPackageWeight = 0;
	airFreightService.forEach((item) => {
		packageCount += item.packages_count;
		totalPackageVolume += item.volume;
		totalPackageWeight += item.weight;
	});

	airFreightLocalService.forEach((item) => {
		packageCount += item.packages_count;
		totalPackageVolume += item.volume;
		totalPackageWeight += item.weight;
	});

	lclFreightService.forEach((item) => {
		packageCount += item.packages_count;
		totalPackageVolume += item.volume;
		totalPackageWeight += item.weight;
	});

	airCustomsService.forEach((item) => {
		packageCount += item.packages_count;
		totalPackageVolume += item.volume;
		totalPackageWeight += item.weight;
	});

	lclCustomsService.forEach((item) => {
		packageCount += item.packages_count;
		totalPackageVolume += item.volume;
		totalPackageWeight += item.weight;
	});

	totalPackageVolume =
		Math.round(totalPackageVolume * ROUND_FIG_NUMBER) / ROUND_FIG_NUMBER;

	let classDescription = '';
	Object.keys(CLASS_MAPPING).forEach((element) => {
		const newElement = CLASS_MAPPING[element];
		if (commodity_class?.subclass_id) {
			if (
				newElement.subclass_id === commodity_class?.subclass_id &&
				newElement?.subclass_codes?.toString() ===
					commodity_class?.subclass_codes?.toString()
			) {
				classDescription = newElement.subclass_id;
			}
		} else if (newElement.class_id === commodity_class?.class_id) {
			classDescription = newElement.class_id;
		}
	});

	const services_ids = Object.keys(data?.service_details || {});
	const services = (services_ids || []).map((key) => ({
		...data?.service_details[key],
		id: key,
	}));

	const container_sizes = (services || [])
		.filter((cs) => cs?.container_size)
		.map((item) => `${item?.container_size} ft`);
	const uniq_container_sizes = [...new Set(container_sizes)];
	const size =
		(uniq_container_sizes || []).length === 1
			? uniq_container_sizes[0]
			: (uniq_container_sizes || []).join(', ');

	const commodities = (services || [])
		.filter((item) => item?.commodity)
		.map((comm) => startCase(comm?.commodity));
	const uniq_commodities = [...new Set(commodities)];
	const commodity =
		(uniq_commodities || []).length === 1
			? uniq_commodities[0]
			: (uniq_commodities || []).join(', ');

	return (
		<>
			{GOODS_MAPPING.includes(data?.search_type) ? (
				<FlexCol>
					{commodity ? (
						<Flex style={{ marginBottom: '8px' }}>
							<span>COMMODITY</span>
							<ToolTip placement="bottom" theme="light" content={commodity}>
								<ContainerValues>{commodity}</ContainerValues>
							</ToolTip>
						</Flex>
					) : null}

					{size ? (
						<Flex>
							<span>CONTAINER</span>
							<ToolTip placement="bottom" theme="light" content={size}>
								<ContainerValues>{size}</ContainerValues>
							</ToolTip>
						</Flex>
					) : null}
				</FlexCol>
			) : null}

			{LOAD_CARGO_MAPPING.includes(data?.search_type) ? (
				<>
					<FlexCol>
						{data?.volume ? (
							<Flex style={{ marginBottom: '8px' }}>
								<span style={{ width: 100 }}>Volume</span>
								<ContainerValues>{totalPackageVolume} cbm</ContainerValues>
							</Flex>
						) : null}

						{data?.weight ? (
							<Flex style={{ marginBottom: '8px' }}>
								<span style={{ width: 100 }}>Weight</span>
								<ContainerValues>{totalPackageWeight} kgs</ContainerValues>
							</Flex>
						) : null}

						{data?.packages_count ? (
							<Flex>
								<span style={{ width: 100 }}>Packages count</span>
								<ContainerValues>{packageCount}</ContainerValues>
							</Flex>
						) : null}
					</FlexCol>

					<FlexCol>
						{data?.cargo_clearance_date ? (
							<Flex style={{ marginBottom: '8px' }}>
								<span style={{ width: 130 }}>Cargo Readiness Date</span>
								<ContainerValues>{data?.cargo_clearance_date}</ContainerValues>
							</Flex>
						) : null}

						{data?.logistics_service_type ? (
							<Flex style={{ marginBottom: '8px' }}>
								<span style={{ width: 130 }}>logistics service type</span>
								<ContainerValues>
									{data?.logistics_service_type}
								</ContainerValues>
							</Flex>
						) : null}

						{data?.payment_type ? (
							<Flex style={{ marginBottom: '8px' }}>
								<span style={{ width: 130 }}>Payment Type</span>
								<ContainerValues>
									{startCase(data?.payment_type)}
								</ContainerValues>
							</Flex>
						) : null}

						{commoditySubType || data?.commodity ? (
							<Flex>
								<span style={{ width: 130 }}>Commodity</span>
								<ContainerValues>
									{commodity_type === 'dangerous'
										? `Class ${classDescription}`
										: startCase(commoditySubType || data?.commodity)}
								</ContainerValues>
							</Flex>
						) : null}
					</FlexCol>
				</>
			) : null}

			{LOAD_TRUCK_MAPPING.includes(data?.search_type) ? (
				<FlexCol>
					{data?.truck_type ? (
						<Flex style={{ marginBottom: '8px' }}>
							<span>Truck Type</span>
							<ToolTip
								placement="bottom"
								theme="light"
								content={startCase(data?.truck_type)}
							>
								<ContainerValues>{startCase(data?.truck_type)}</ContainerValues>
							</ToolTip>
						</Flex>
					) : null}

					{data?.trucks_count ? (
						<Flex>
							<span>Truck Count</span>
							<ContainerValues>{data?.trucks_count}</ContainerValues>
						</Flex>
					) : null}
				</FlexCol>
			) : null}
		</>
	);
};

export default ConatinerDetails;
