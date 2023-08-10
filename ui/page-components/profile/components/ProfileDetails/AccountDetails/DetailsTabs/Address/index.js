import { useTranslation } from 'next-i18next';

import MobileHeader from '../../../../MobileHeader';

import BillingAddresses from './BillingAddresses';
import useGetBillingAddress from './hooks/getOrganizationBillingAddress';
import OtherAddresses from './OtherAddresses';

import { useRouter } from '@/packages/next';

function Address() {
	const router = useRouter();

	const { t } = useTranslation(['settings']);

	const onClickBackButton = () => {
		router.push('/settings');
	};
	const { data, loading, addressesData, addressLoading, getAddress, getAdd } = useGetBillingAddress();

	const organizationBillingAddressesList = data?.list || [];

	return (
		<>
			<MobileHeader heading={t('settings:mobile_heading_for_addresses')} onClickBackButton={onClickBackButton} />

			<BillingAddresses
				title={t('settings:heading_title_address_section')}
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
