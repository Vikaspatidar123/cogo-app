import { IcMArrowUp } from '@cogoport/icons-react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// import RateLimitExceeded from './RateLimitExceeded';
import RouteDetails from './RouteDetails';
import SearchRoutes from './SearchRoutes';
import styles from './styles.module.css';

// import { useTranslation } from '@/ui/components/LocaleTranslationContext';

function SidePanel({
	rateData,
	data,
	location,
	isMobile,
	setIsFull,
	isFull,
	loading,
	executeCaptcha,
	recaptchaRef,
}) {
	const router = useRouter();
	const { id, origin, destination } = router.query;

	// const { t } = useTranslation(['spot_search']);

	const [tab, setTab] = useState(id);

	const newTab = tab === 'sea' ? 'ocean' : tab;
	const allRoutes = data?.all_routes?.filter(({ main_service }) => main_service === newTab);
	const lineString = 	allRoutes?.[0]?.routes?.[0]?.lineString;
	const journeyData = (lineString || [])
		.flatMap((line) => line.waypoints || [])
		.filter((_, i, waypts) => i === 0 || i === waypts.length - 1)
		.map((item, i) => ({
			...item,
			port_code: i === 0 ? origin : destination,
		}));

	const showRoutes = (tab === id);

	useEffect(() => {
		setTab(id);
	}, [id, setTab, origin, destination]);

	return (
		<div
			className={styles.container}
		>
			{isMobile ? (
				<div
					role="presentation"
					className={styles.red}
					onClick={() => setIsFull((s) => !s)}
				>
					<IcMArrowUp
						height={24}
						width={24}
						className={[styles.toggle_icon, !isFull ? styles.inverse : ''].join(' ')}
					/>
				</div>
			) : null}

			<SearchRoutes
				showRoutes={showRoutes}
				tab={tab}
				setTab={setTab}
				loading={loading}
				executeCaptcha={executeCaptcha}
				recaptchaRef={recaptchaRef}
				setIsFull={setIsFull}
			/>
			<RouteDetails
				location={location}
				showRoutes={showRoutes}
				tab={tab}
				journeyData={journeyData}
				data={data}
				rateData={rateData}
				loading={loading}
			/>
			{/* {data && !data.error ? ( */}
			{/* 	<RouteDetails */}
			{/* 		location={location} */}
			{/* 		showRoutes={showRoutes} */}
			{/* 		tab={tab} */}
			{/* 		journeyData={journeyData} */}
			{/* 		data={data} */}
			{/* 		rateData={rateData} */}
			{/* 		loading={loading} */}
			{/* 	/> */}
			{/* ) : ( */}
			{/* 	<div className={styles.rate_limit_container}> */}
			{/* 		{data?.error */}
			{/* 			? <RateLimitExceeded /> */}
			{/* 			: ( */}
			{/* 				<div className={styles.no_data_available}> */}
			{/* 					{t('no_data_available')} */}
			{/* 				</div> */}
			{/* 			)} */}
			{/* 	</div> */}
			{/* )} */}
		</div>
	);
}

export default SidePanel;
