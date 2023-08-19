import { Placeholder } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import ServiePopupModal from '../../PopupModal/ServicePopupModal';

import Card from './Card';
import RouteInfo from './RouteInfo';
import styles from './styles.module.css';

import { useGetUserLocationContent } from '@/ui/commons/components/UserLocationContentContext';

const getIconMapping = ({
	spotSearch_cardImage_CmaCgm = '',
	spotSearch_cardImage_Cosco = '',
	spotSearch_cardImage_Maersk = '',
	spotSearch_cardImage_Hapag_Lloyd,
	spotSearch_cardImage_OOCL,
	spotSearch_cardImage_OneLine,
	spotSearch_cardImage_Zim,
	spotSearch_cardImage_aegeanAirlines,
	spotSearch_cardImage_aerLingus,
	spotSearch_cardImage_aeroflot,
	spotSearch_cardImage_AeroLogic,
	spotSearch_cogoassured_cardLabel,

}) => ({
	cogo_assured: {
		icon : spotSearch_cogoassured_cardLabel,
		link : '',
	},
	sea: {
		cmacgm: {
			icon : spotSearch_cardImage_CmaCgm,
			link : '/knowledge-center/shipping-lines/cma-cgm',
		},
		cosco: {
			icon : spotSearch_cardImage_Cosco,
			link : '/knowledge-center/shipping-lines/cosco',
		},
		maersk: {
			icon : spotSearch_cardImage_Maersk,
			link : '/knowledge-center/shipping-lines/maersk',
		},
		hapag: {
			icon : spotSearch_cardImage_Hapag_Lloyd,
			link : '/knowledge-center/shipping-lines/hapag-lloyd',
		},
		oocl: {
			icon : spotSearch_cardImage_OOCL,
			link : '/knowledge-center/shipping-lines/oocl',
		},
		oneline: {
			icon : spotSearch_cardImage_OneLine,
			link : '/knowledge-center/shipping-lines/one-line',
		},
		zim: {
			icon : spotSearch_cardImage_Zim,
			link : '/knowledge-center/shipping-lines/zim',
		},
	},
	air: {
		aegean: {
			icon : spotSearch_cardImage_aegeanAirlines,
			link : '/knowledge-center/airlines/aegean-airlines',
		},
		aerlingus: {
			icon : spotSearch_cardImage_aerLingus,
			link : '/knowledge-center/airlines/aer-lingus',
		},
		aeroflot: {
			icon : spotSearch_cardImage_aeroflot,
			link : '/knowledge-center/airlines/aeroflot',
		},
		aerologic: {
			icon : spotSearch_cardImage_AeroLogic,
			link : '/knowledge-center/airlines/aerologic',
		},
	},
});
function RouteDetails({
	data,
	journeyData,
	location,
	rateData,
	tab,
	showRoutes,
	loading,
}) {
	const [showDetails, setShowDetails] = useState(false);
	const [serviceModalShow, setServiceModal] = useState(false);

	const {
		spotSearch_cogoassured_cardLabel,
		spotSearch_cardImage_aegeanAirlines,
		spotSearch_cardImage_aerLingus,
		spotSearch_cardImage_aeroflot,
		spotSearch_cardImage_AeroLogic,
		spotSearch_cardImage_CmaCgm,
		spotSearch_cardImage_Cosco,
		spotSearch_cardImage_Maersk,
		spotSearch_cardImage_Hapag_Lloyd,
		spotSearch_cardImage_OOCL,
		spotSearch_cardImage_OneLine,
		spotSearch_cardImage_Zim,
	} = useGetUserLocationContent();

	const details = {
		origin      : journeyData?.[0] || '',
		destination : journeyData?.[1] || '',
	};

	// const heading = {
	// 	sea: {
	// 		label : t('sea_routes'),
	// 		icon  : iconMappings.sea,
	// 		color : '#1867d2',
	// 	},
	// 	air: {
	// 		label : t('air_routes'),
	// 		icon  : iconMappings.air,
	// 		color : '#f37166',
	// 	},
	// };

	const newTab = tab === 'sea' ? 'ocean' : tab;
	const allRoutes = data?.all_routes?.filter(({ main_service }) => main_service === newTab);
	const routes = allRoutes?.[0]?.routes;

	const rates = [
		rateData?.rateData1 || {},
		rateData?.rateData2 || {},
	];
	const iconMapping = getIconMapping(
		{
			spotSearch_cardImage_aegeanAirlines,
			spotSearch_cardImage_aerLingus,
			spotSearch_cardImage_aeroflot,
			spotSearch_cardImage_AeroLogic,
			spotSearch_cardImage_CmaCgm,
			spotSearch_cardImage_Cosco,
			spotSearch_cardImage_Maersk,
			spotSearch_cardImage_Hapag_Lloyd,
			spotSearch_cardImage_OOCL,
			spotSearch_cardImage_OneLine,
			spotSearch_cardImage_Zim,
			spotSearch_cogoassured_cardLabel,
		},
	);

	const handleDetailsView = (status) => {
		setShowDetails(status);
	};

	// const getLabel = (key) => {
	// 	const { icon, label, color } = heading[key];

	// 	return (
	// 		<p className={styles.sub_label}>
	// 			<span style={{ color }}>{icon}</span>
	// 			<span>{label}</span>
	// 		</p>
	// 	);
	// };

	if (!showRoutes) {
		return (
			<div className={styles.no_routes}>
				<p className={styles.header}>
					search_routes
				</p>
				<p className={styles.description}>to_see_results</p>
			</div>
		);
	}

	// if (isEmpty(allRoutes)) {
	// 	return (
	// 		<div className={styles.no_routes}>
	// 			<p className={styles.header}>
	// 				{t('no_data_found')}
	// 			</p>
	// 			<p className={styles.description}>{t('search_routes')}</p>
	// 		</div>
	// 	);
	// }

	return (
		<>
			<div className={styles.route_details}>
				<p className={styles.route_text}>
					route_details
				</p>
				{loading ? (
					<>
						{/* { getLabel(tab) } */}
						{[...Array(6)].map((_, i) => (
							// eslint-disable-next-line react/no-array-index-key
							<div key={i} className={styles.placeholder_card}>
								<div className={styles.placeholder_cogo_assured}>
									<Placeholder height="25px" width="100px" />
								</div>
								<div className={styles.inner_card}>
									<div className={styles.location_container}>
										<Placeholder height="30px" width="40%" />
										<div className={styles.divider}>
											<div className={styles.line} />
											<IcMArrowRight />
										</div>
										<Placeholder height="30px" width="40%" />
									</div>
									<div className={styles.row}>
										<div className={styles.inner_row}>
											{['Price', 'Distance', 'Time'].map((item) => (
												<div key={item}>
													<p className={styles.label}>
														{item}
													</p>
													<Placeholder height="20px" width="100%" />
												</div>
											))}
										</div>
										<Placeholder height="30px" width="100px" />
									</div>
								</div>
							</div>
						))}
					</>
				)
					: (
						<div className={styles.inner_route_details}>
							{showDetails ? (
								<RouteInfo
									handleDetailsView={() => handleDetailsView(false)}
									lineString={routes[0]?.lineString}
									handleShow={() => setServiceModal(true)}
								/>
							) : (
								<div>
									{/* { getLabel(tab) } */}
									{rates?.map((rate) => {
										if ((isEmpty(rate) || isEmpty(rate.rates))) return null;
										return (
											<Card
												location={location}
												key={rate?.detail?.id}
												route={routes?.[0]}
												details={details}
												rate={tab === 'air' ? '' : rate?.rates?.[0]}
												handleDetailsView={() => handleDetailsView(true)}
												line={iconMapping.cogo_assured}
												containerSize={rate?.detail?.container_size}
												searchIds={{
													spot_search_id : rate?.detail?.id || '',
													rate_card_id   : rate?.rates?.[0]?.card || '',
												}}
											/>
										);
									})}
									{Object.entries(iconMapping[tab])?.map(([line, line_details]) => (
										<Card
											key={line}
											details={details}
											line={line_details}
											isBlur
											isDummy
										/>
									))}
								</div>
							)}
						</div>
					)}
			</div>
			{serviceModalShow && (
				<ServiePopupModal
					show={serviceModalShow}
					onClose={() => setServiceModal(false)}
				/>
			)}
		</>
	);
}

export default RouteDetails;
