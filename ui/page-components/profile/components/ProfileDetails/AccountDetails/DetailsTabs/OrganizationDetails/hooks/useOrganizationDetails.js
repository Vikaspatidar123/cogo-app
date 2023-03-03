import { useState } from 'react';

import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

const useOrganizationDetails = () => {
	const {
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
	};
};

export default useOrganizationDetails;
