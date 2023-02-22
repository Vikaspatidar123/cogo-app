import { useState } from 'react';

import useGetAccountTypes from '../../utils/useGetAccountTypes';

import useServicesTab from './hooks/useServicesTab';
import LoadingState from './LoadingState';
// import { ServicesDashboard } from './SellServices';
// import Services from './Services';
import styles from './styles.module.css';
// import TradeLanes from './TradeLanes';

// import SlidingTabs from '@/commons/components/UI/SlidingTabs';
// import MobileHeader from '@/components/Profile/components/MobileHeader';
import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

function ServicesTab() {
	const {
		loading = false,
		loadingComponent = false,
		setLoadingComponent = () => { },
		state = {},
		setState = () => { },
		CONSTANTS = {},
	} = useServicesTab();
	const { isImporterExporter, isBoth } = useGetAccountTypes();

	const {
		general: { query, isMobile },
	} = useSelector((val) => val);

	const router = useRouter();

	const [organizationType, setOrganizationType] = useState(
		isImporterExporter || query?.type === 'buy'
			? 'importer_exporter'
			: 'service_provider',
	);

	const onClickBackButton = () => {
		router.push('/profile');
	};

	if (loading) {
		return <LoadingState />;
	}

	return (
		<>
			{/* {isMobile && (
				<MobileHeader
					heading="Services"
					onClickBackButton={onClickBackButton}
				/>
			)} */}

			{/* {isBoth && (
				<ToggleContainer>
					<SlidingTabs
						options={[
							{
								label: t('services:slidingTabs.0.label'),
								value: 'importer_exporter',
							},
							{
								label: t('services:slidingTabs.1.label'),
								value: 'service_provider',
							},
						]}
						activeTab={organizationType}
						setActiveTab={setOrganizationType}
					/>
				</ToggleContainer>
			)} */}

			{organizationType === 'importer_exporter' && (
				<>
					<div className={styles.container}>
						<div className={styles.header_container}>
							<div className={styles.header_text}>services:texts.2</div>
						</div>

						{/* <ServicesContainer>
							<Services
								setLoadingComponent={setLoadingComponent}
								state={state}
								setState={setState}
								CONSTANTS={CONSTANTS}
								isProfile
							/>
						</ServicesContainer> */}
					</div>

					<div className={styles.container}>
						<div className={styles.header_container}>
							<div className={styles.header_text}>services:texts.2</div>
						</div>

						{/* <ServicesContainer>
							<TradeLanes
								loadingComponent={loadingComponent}
								state={state}
								setState={setState}
								CONSTANTS={CONSTANTS}
								isProfile
							/> */}
						{/* </ServicesContainer> */}
					</div>
				</>
			)}

			{/* {organizationType === 'service_provider' && <ServicesDashboard />} */}
		</>
	);
}

export default ServicesTab;
