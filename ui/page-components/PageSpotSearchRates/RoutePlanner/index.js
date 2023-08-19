import { IcMArrowLeft } from '@cogoport/icons-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import SidePanel from '../SidePanel';

import styles from './styles.module.css';

import Loader from '@/ui/page-components/PageSpotSearchRates/Loader';

const Maps = dynamic(() => import('../Maps'), {
	ssr: false,
});

function RoutePlanner({ rateData, data, location, executeCaptcha, recaptchaRef }) {
	const router = useRouter();
	const isMobile = false;
	const [isFull, setIsFull] = useState(false);
	const [loading, setLoading] = useState(false);
	const [tab, setTab] = useState('search_routes');

	useEffect(() => {
		const handleRouteChange = () => {
			setLoading(true);
		};

		const handleRouteChangeComplete = () => {
			setLoading(false);
		};

		router.events.on('routeChangeStart', handleRouteChange);

		router.events.on('routeChangeComplete', handleRouteChangeComplete);

		return () => {
			router.events.off('routeChangeStart', handleRouteChange);
			router.events.off('routeChangeComplete', handleRouteChangeComplete);
		};
	}, [router.events]);

	return (
		<div className={styles.container}>
			<div
				className={[styles.side_panel,
					isFull ? styles.minimise : '',
					isMobile && !isFull ? styles.move_top : ''].join(' ')}
			>
				<SidePanel
					rateData={rateData}
					isMobile={isMobile}
					location={location}
					setIsFull={setIsFull}
					isFull={isFull}
					tab={tab}
					setTab={setTab}
					data={data}
					executeCaptcha={executeCaptcha}
					recaptchaRef={recaptchaRef}
					loading={loading}
				/>

				{!isMobile ? (
					<button
						className={`${styles.toggle_icon} ${isFull ? styles.rotate_toggle : ''}`}
						onClick={() => setIsFull(!isFull)}
					>
						<IcMArrowLeft />
					</button>
				) : null}
			</div>
			<div style={{ zIndex: 0 }} className={isFull ? styles.full_map : styles.half_map}>
				{loading && router.route.includes('/discovery-rates') ? <Loader isFull={isFull} /> : null}
				<Maps
					data={data}
					loading={loading}
					isMobile={isMobile}
				/>
			</div>
		</div>
	);
}

export default RoutePlanner;
