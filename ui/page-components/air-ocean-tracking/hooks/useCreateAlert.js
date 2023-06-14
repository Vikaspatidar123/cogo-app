import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useMemo } from 'react';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCreateAlert = ({
	tableValue, setTableValue, prevAlertData = [], selectContactList, alertList = [],
	shipmentId = '',
}) => {
	const { userId } = useSelector((state) => ({
		userId: state.profile?.id,
	}));
	const { query } = useRouter();
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/create_update_saas_container_alert',
	}, { manual: true });

	const contactList = useMemo(() => {
		const prevSelectedContact = (prevAlertData || []).map((item) => item?.poc_details);
		const uniqueContactList = selectContactList.filter((item) => (
			!prevSelectedContact.some((ele) => ele?.id === item?.id)
		));

		return [...prevSelectedContact, ...uniqueContactList];
	}, [prevAlertData, selectContactList]);

	const createPayload = () => {
		const { shipper = [], consignee = [], dsr = [], ...alertKey } = tableValue || {};

		const alert_configuration = contactList.map((contact) => {
			const pocId = contact?.id;

			const eventList = alertList.map((alert) => {
				const { milestone = '', alert_name = '', alert_types = [], alert_medium = [] } = alert || {};
				const currentAlertValue = alertKey?.[alert_name] || [];
				const isAlertActive = currentAlertValue?.includes(pocId);

				let alertId;

				if (!isEmpty(prevAlertData)) {
					const pocSub = prevAlertData.find((item) => item?.poc_details?.id === pocId) || {};
					const pocSubAlert = pocSub?.alerts_configured?.find(
						(prevAlert) => prevAlert?.alert_name === alert_name,
					);
					if (pocSubAlert) {
						alertId = pocSubAlert?.id;
					}
				}

				return {
					milestone,
					alert_name,
					alert_types,
					alert_medium,
					is_active : isAlertActive,
					id        : alertId,
				};
			});

			return {
				poc_id     : pocId,
				dsr_report : dsr.includes(pocId),
				event      : eventList,
			};
		});

		return {
			shipper                        : shipper[0],
			consignee                      : consignee[0],
			alert_configuration,
			saas_container_subscription_id : shipmentId,
			performed_by_id                : userId,
			organization_branch_id         : query?.branch_id,
		};
	};

	const createAlertHandler = () => {
		const payloadData = createPayload();
		try {
			trigger({
				data: payloadData,
			});
		} catch (err) {
			console.log(err);
		}
	};

	const submitHandler = () => {
		const { shipper = [], consignee = [] } = tableValue || {};

		if (isEmpty(shipper) && isEmpty(consignee)) {
			Toast.error('Please select either shipper or consignee');
			return;
		}
		createAlertHandler();
	};

	const checkboxChangeHandler = ({ name, contactInfo }) => (e) => {
		let values = tableValue?.[name] || [];
		if (e.target.checked) {
			if ((name === 'shipper' || name === 'consignee')) {
				values = [contactInfo?.id];
			} else {
				values.push(contactInfo?.id);
			}
		} else {
			const matchIndex = values.findIndex((item) => item === contactInfo?.id);
			values.splice(matchIndex, 1);
		}
		setTableValue((prev) => ({
			...prev,
			[name]: values,
		}));
	};

	return {
		loading, submitHandler, checkboxChangeHandler, contactList,
	};
};

export default useCreateAlert;
