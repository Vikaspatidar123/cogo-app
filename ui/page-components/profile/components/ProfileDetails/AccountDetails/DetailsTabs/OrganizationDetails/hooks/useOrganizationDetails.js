import { useState } from 'react';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
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
		router.push('/settings');
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
