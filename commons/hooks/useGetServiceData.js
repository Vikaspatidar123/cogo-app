import { useState } from 'react';

import { useRouter } from '@/packages/next';

const useGetServiceData = () => {
	const [approvedService, setApprovedService] = useState({ loading: true });
	const router = useRouter();
	const handlePushToApplyService = () => {
		router.push('/profile?activeTab=services');
	};
	let heading = '';
	let buttonText = '';
	if (
		!(approvedService.active || []).length
		&& !(approvedService.pending || []).length
	) {
		heading = 'You Have Not Applied For Any Services';
		buttonText = 'Apply Now';
	} else if (
		!(approvedService.active || []).length
		&& (approvedService.pending || []).length
	) {
		heading = 'You Have Services Approval Pending';
		buttonText = 'Check Now';
	}
	return {
		approvedService,
		setApprovedService,
		handlePushToApplyService,
		heading,
		buttonText,
	};
};

export default useGetServiceData;
