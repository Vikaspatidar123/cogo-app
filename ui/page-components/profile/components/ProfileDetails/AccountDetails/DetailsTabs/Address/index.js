import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import BillingAddresses from './BillingAddresses';
import OtherAddresses from './OtherAddresses';
import styles from './styles.module.css';

// import SlidingTabs from '@/commons/components/UI/SlidingTabs';
// import MobileHeader from '@/components/Profile/components/MobileHeader';
import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

function Address() {
	const {
		general: { isMobile },
		profile: { organization = {} },
	} = useSelector((state) => state);

	const router = useRouter();

	const onClickBackButton = () => {
		router.push('/profile');
	};

	return (
		<>
			{/* {isMobile && (
				<MobileHeader
					heading={t('profile:accountDetails.tabOptions.address.mobileHeading')}
					onClickBackButton={onClickBackButton}
				/>
			)} */}

			{/* {is_importer_exporter && is_service_provider && (
				<div className={styles.toggle_container}> */}
			{/* <SlidingTabs
						options={[
							{
								label: t(
									'profile:accountDetails.tabOptions.address.toggle.buy',
								),
								value: 'importer_exporter',
							},
							{
								label: t(
									'profile:accountDetails.tabOptions.address.toggle.sell',
								),
								value: 'service_provider',
							},
						]}
						activeTab={organizationType}
						setActiveTab={setOrganizationType}
					/> */}
			{/* hello
				</div>
			)} */}

			<BillingAddresses

				title="Billing Address"
			/>

			<OtherAddresses />
		</>
	);
}

export default Address;
