import { addDays, format } from '@cogoport/utils';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { request } from '@/packages/request';
import PageSpotSearchRates from '@/ui/page-components/PageSpotSearchRates';

const getHaulages = ({ size, count, is_origin_icd, is_destination_icd }) => {
	const haulageProps = {
		container_size             : size || '20',
		container_type             : 'standard',
		haulage_type               : 'carrier',
		containers_count           : count || 1,
		cargo_weight_per_container : 18,
		transport_mode             : 'rail',
		status                     : 'active',
	};

	let haulages = [];

	if (is_origin_icd === 'true' && is_destination_icd === 'true') {
		haulages = [
			{ ...haulageProps, trade_type: 'import' },
			{ ...haulageProps, trade_type: 'export' },
		];
	} else if (is_origin_icd === 'true') {
		haulages = [{ ...haulageProps, trade_type: 'export' }];
	} else if (is_destination_icd === 'true') {
		haulages = [{ ...haulageProps, trade_type: 'import' }];
	}
	return haulages;
};

const getPublicSearchParameters = ({
	id,
	origin,
	destination,
	size,
	count,
	is_origin_icd,
	is_destination_icd,
	cargoClearanceDate,
	shipments,
	package_type,
	amount,
	weight,
	volume,
	haulages,
}) => {
	const publicSearchParameters = {
		sea: {
			search_type                     : 'fcl_freight',
			source                          : 'public',
			fcl_freight_services_attributes : [
				{
					origin_location_code       : origin,
					destination_location_code  : destination,
					container_size             : size || '20',
					container_type             : 'standard',
					commodity                  : 'general',
					containers_count           : count || 1,
					cargo_weight_per_container : 18,
					status                     : 'active',
				},
			],
			haulage_freight_services_attributes: (is_origin_icd === 'true' || is_destination_icd === 'true')
				? haulages : undefined,
		},
		air: {
			search_type                     : 'air_freight',
			source                          : 'public',
			platform                        : 'public',
			air_freight_services_attributes : [
				{
					origin_location_code      : origin,
					destination_location_code : destination,
					cargo_clearance_date      : cargoClearanceDate,
					commodity                 : 'general',
					commodity_details         : [
						{
							commodity_type: 'all',
						},
					],
					packages: [
						{
							length         : 1,
							width          : 1,
							height         : 1,
							packages_count : shipments || 1,
							packing_type   : package_type || 'box',
							handling_type  : 'stackable',
							package_weight : amount || 1,
						},
					],
					packages_count         : shipments || 1,
					weight                 : weight || 1,
					volume                 : volume || 1,
					status                 : 'active',
					dry_ice_required       : false,
					logistics_service_type : 'normal',
					load_selection_type    : 'cargo_gross',
				},
			],
		},
	};
	return publicSearchParameters[id] || {};
};

async function getRateData({
	id,
	origin,
	destination,
	size,
	count,
	is_destination_icd,
	is_origin_icd,
	haulages,
	cargoClearanceDate,
	shipments,
	package_type,
	amount,
	weight,
	volume,
}) {
	try {
		const { data: spot_search } = await request.post(
			'/public_search/create_public_search',
			getPublicSearchParameters({
				id,
				origin,
				destination,
				size,
				count,
				is_destination_icd,
				is_origin_icd,
				haulages,
				cargoClearanceDate,
				shipments,
				package_type,
				amount,
				weight,
				volume,
			}),
		);

		const { data } = await request.get('/public_search/get_public_search', {
			params: {
				id: spot_search.id,
			},
		});

		return data;
	} catch (e) {
		console.error(e);
		return null;
	}
}

// async function getData({ origin, destination, id, user_ip_address }) {
// 	try {
// 		const { data } = await request.get('/location/get_multiple_routes', {
// 			headers: {
// 				user_ip_address,
// 			},
// 			params: {
// 				origin_port_code      : origin,
// 				destination_port_code : destination,
// 				preferences           : id,
// 			},
// 		});

// 		return data;
// 	} catch (e) {
// 		console.error(e);
// 		if (e?.response?.status === 429) {
// 			return { error: e.response.data };
// 		}
// 		return null;
// 	}
// }

export async function getServerSideProps(ctx) {
	const { locale } = ctx;

	const { location } = ctx?.req?.cookies || {};

	const {
		id,
		origin,
		destination,
		count = '1',
		shipments = '1',
		weight = '1',
		volume = '1',
		package_type = 'box',
		amount = '1',
		is_origin_icd = 'false',
		is_destination_icd = 'false',
	} = ctx.query;

	const cargoClearanceDate = `${format(addDays(new Date(), 1), "yyyy-MM-dd'T'HH:mm:ss.sss")}Z`;

	const promises = ['20', '40'].map((container_size) => {
		const haulages = getHaulages({
			size: container_size,
			count,
			is_origin_icd,
			is_destination_icd,
		});

		return getRateData({
			id,
			origin,
			destination,
			size: container_size,
			count,
			is_destination_icd,
			is_origin_icd,
			haulages,
			cargoClearanceDate,
			shipments,
			package_type,
			amount,
			weight,
			volume,
		});
	});

	// const data = await getData({
	// 	origin,
	// 	destination,
	// 	id,
	// });

	const ratesData = await Promise.all(promises);

	const rateData = {
		rateData1 : ratesData[0],
		rateData2 : ratesData[1],
	};
	const translationData = await serverSideTranslations(locale, ['common', 'home', 'spot_search']);
	const data = {
		origin: [
			18.952,
			72.948,
		],
		destination: [
			25.00328,
			55.052067,
		],
		all_routes: [
			{
				main_service : 'ocean',
				routes       : [
					{
						id         : 'dfertgh3456w5ehjkf890uio5n4238uh49i',
						lineString : [
							{
								type : 'ocean',
								path : [
									[
										18.952,
										72.948,
									],
									[
										18.952,
										72.948,
									],
									[
										18.941361,
										72.80777,
									],
									[
										19,
										72.4,
									],
									[
										20,
										70,
									],
									[
										20.0838,
										64.5005,
									],
									[
										21.440441,
										62.375976,
									],
									[
										22.7,
										60.4,
									],
									[
										24,
										59,
									],
									[
										25.5,
										57.1,
									],
									[
										26.422112,
										56.763061,
									],
									[
										26.4,
										56.4,
									],
									[
										25.6,
										55.2,
									],
									[
										25.00328,
										55.052067,
									],
								],
								maneuvers : [],
								summary   : {
									currency : '',
									length   : 2241.3288172811976,
									time     : 336199.32259217964,
								},
								price_params: [
									{
										type                    : 'fcl',
										origin_location_id      : 'eb187b38-51b2-4a5e-9f3c-978033ca1ddf',
										destination_location_id : '23630ba9-b478-4000-ba75-05606d72d19f',
									},
								],
								waypoints: [
									{
										type         : 'seaport',
										display_name : 'Jawaharlal Nehru (Nhava Sheva) (INNSA), Mumbai, India',
										location_id  : 'eb187b38-51b2-4a5e-9f3c-978033ca1ddf',
										coordinates  : [
											18.952,
											72.948,
										],
										services: {
											prev: [
												{
													type  : 'custom',
													value : 'Origin Customs',
												},
												{
													type  : 'cfs',
													value : 'Origin CFS',
												},
											],
											next: [],
										},
									},
									{
										type         : 'seaport',
										display_name : 'Jebel Ali (AEJEA), Dubai, United Arab Emirates',
										location_id  : '23630ba9-b478-4000-ba75-05606d72d19f',
										coordinates  : [
											25.00328,
											55.052067,
										],
										services: {
											prev : [],
											next : [
												{
													type  : 'custom',
													value : 'Destination Customs',
												},
												{
													type  : 'cfs',
													value : 'Destination CFS',
												},
											],
										},
									},
								],
								id: '05cbebdd-d764-4344-86df-0a27db96b7d3',
							},
						],
						summary: {
							total_length : 2241.3288172811976,
							total_time   : 336199.32259217964,
						},
					},
				],
			},
			{},
		],
	};
	return {
		props: {
			translationData,
			rateData,
			data,
			location,
		},
	};
}

export default PageSpotSearchRates;
