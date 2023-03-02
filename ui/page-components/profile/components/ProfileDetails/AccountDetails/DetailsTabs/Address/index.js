/* eslint-disable no-unused-vars */
import MobileHeader from '../../../../MobileHeader';

import BillingAddresses from './BillingAddresses';
import getAddress from './hooks/getOrganizationBillingAddress';
import OtherAddresses from './OtherAddresses';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Address() {
	const router = useRouter();

	const onClickBackButton = () => {
		router.push('/settings');
	};
	const { data, loading, addressesData, addressLoading } = getAddress();
	const organizationBillingAddressesList = data?.list || [];
	return (
		<>
			<MobileHeader heading="Addresses" onClickBackButton={onClickBackButton} />

			<BillingAddresses
				title="Billing Address"
				organizationBillingAddressesList={organizationBillingAddressesList}
				loading={loading}
			/>

			<OtherAddresses
				addressesData={addressesData}
				addressLoading={addressLoading}
			/>
		</>
	);
}

export default Address;
