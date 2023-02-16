import { useState } from 'react';

import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

const useOrganizationDetails = () => {
	const {
		general: { isMobile },
		profile: { organization = {} },
	} = useSelector((state) => state);

	const router = useRouter();

	const [showEditOrganizationDetails, setShowEditOrganizationDetails] = useState(false);

	const organizationData = organization;

	const onClickBackButton = () => {
		router.push('/profile');
	};

	return {

		organizationData,
		onClickBackButton,
		setShowEditOrganizationDetails,
		showEditOrganizationDetails,
		isMobile,
	};
};

export default useOrganizationDetails;
