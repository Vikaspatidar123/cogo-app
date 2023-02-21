import MobileHeader from '../../../../MobileHeader';

import BillingAddresses from './BillingAddresses';
import getAddress from './hooks/getOrganizationBillingAddress';
import OtherAddresses from './OtherAddresses';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

function Address() {
	const {
		general: { isMobile },
		profile: { organization = {} },
	} = useSelector((state) => state);

	const router = useRouter();

	const onClickBackButton = () => {
		router.push('/settings');
	};
	const {
		data, loading, addressesData, addressLoading,
	} = getAddress();
	const organizationBillingAddressesList = data?.list || [];
	return (
		<>
			{isMobile && (
				<MobileHeader
					heading="Addresses"
					onClickBackButton={onClickBackButton}
				/>
			)}

			<BillingAddresses
				title="Billing Address"
				organizationBillingAddressesList={organizationBillingAddressesList}
				loading={loading}
			/>

			<OtherAddresses addressesData={addressesData} addressLoading={addressLoading} />
		</>
	);
}

export default Address;
