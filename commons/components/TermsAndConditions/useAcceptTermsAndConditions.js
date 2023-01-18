import toast from '@cogoport/front/components/toast';
import { useState } from 'react';
import { useSelector } from '@cogoport/front/store';
import { useRouter } from '@/temp/next';
import useRequest from '@/temp/request/useRequest';

const useAcceptTermsAndConditions = () => {
	const { push } = useRouter();

	const {
		profile: { id = '' },
		general: {
			query: { scope = '' },
		},
	} = useSelector((state) => state);

	const [accepted, setAccepted] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const listApi = useRequest(
		'get',
		true,
		'partner',
	)('/list_terms_and_conditions', {
		params: {
			filters: {
				user_id: id,
				type: 'pre_approved_credit',
				status: 'active',
			},
		},
	});

	const acceptAgreementApi = useRequest(
		'post',
		false,
		'partner',
	)('/accept_credit_terms_and_condition');

	const onClickAcceptAgreement = async () => {
		if (!accepted) {
			toast.error('Kindly accept the terms and conditions before proceeding');
		} else {
			try {
				const payload = {
					id: listApi?.data?.list[0]?.id,
				};
				await acceptAgreementApi.trigger({ data: payload });
			} catch (error) {
				toast(error);
			}
			setShowModal(true);
		}
	};

	const onClickOkayButton = () => {
		if (scope === 'partner') {
			window.close();
		} else {
			push('/dashboard');
		}
	};

	return {
		onClickAcceptAgreement,
		onClickOkayButton,
		accepted,
		setAccepted,
		showModal,
		data: listApi?.data,
		loading: listApi?.loading,
		submitLoading: acceptAgreementApi?.loading,
	};
};

export default useAcceptTermsAndConditions;
