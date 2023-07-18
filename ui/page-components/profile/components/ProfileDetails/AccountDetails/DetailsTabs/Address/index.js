import MobileHeader from '../../../../MobileHeader';

import BillingAddresses from './BillingAddresses';
import useGetBillingAddress from './hooks/getOrganizationBillingAddress';
import OtherAddresses from './OtherAddresses';

import { useRouter } from '@/packages/next';

function Address() {
	const router = useRouter();

	const onClickBackButton = () => {
		router.push('/settings');
	};
	const { data, loading, addressesData, addressLoading, getAddress, getAdd } = useGetBillingAddress();

	const organizationBillingAddressesList = data?.list || [];

	return (
		<>
			<MobileHeader heading="Addresses" onClickBackButton={onClickBackButton} />

			<BillingAddresses
				title="BILLING ADDRESS"
				organizationBillingAddressesList={organizationBillingAddressesList}
				loading={loading}
				getAddress={getAddress}
			/>

			<OtherAddresses
				addressesData={addressesData}
				addressLoading={addressLoading}
				getAdd={getAdd}
			/>
		</>
	);
}

export default Address;
