import { Toast } from '@cogoport/components';
import { useState, useEffect, useContext } from 'react';

import { ShipmentDetailContext } from '../common/Context';

import { useRequest } from '@/packages/request';

const useExistingPocList = ({ utilities = {} }) => {
	const [pocList, setPocList] = useState([]);
	const [{ shipment_data }] = useContext(ShipmentDetailContext);
	const [{ loading }, trigger] = useRequest({
		url    : 'list_organization_users',
		method : 'get',
	}, { manual: true });
	const [{ loading: loadingPOC }, pocTrigger] = useRequest({
		url    : 'list_organization_pocs',
		method : 'get',
	}, { manual: true });

	useEffect(() => {
		(async () => {
			try {
				const res = await trigger({
					params: {
						filters: {
							organization_id : shipment_data?.importer_exporter_id,
							status          : 'active',
						},
						page_limit: 20,
					},
				});
				if (!res.hasError) {
					try {
						const res2 = await pocTrigger({
							params: {
								filters: {
									trade_party_id: utilities?.trade_party_id,
									object_type:
										utilities?.roleCheck === 'booking_party'
											? 'self'
											: utilities?.roleCheck,
									status: 'active',
								},
								page_limit: 20,
							},
						});
						if (!res2.hasError) {
							const list = [];
							(res?.data?.list || []).forEach((item) => {
								list.push({
									id                  : item?.id,
									name                : item?.name,
									email               : item?.email,
									mobile_country_code : item?.mobile_country_code,
									mobile_number       : item?.mobile_number,
									work_scopes         : item?.work_scopes || [],
								});
							});

							(res2?.data?.list || []).forEach((item) => {
								list.push({
									id                  : item?.id,
									name                : item?.name,
									email               : item?.email,
									mobile_country_code : item?.mobile_country_code,
									mobile_number       : item?.mobile_number,
									work_scopes         : item?.work_scopes || [],
								});
							});

							setPocList(list);
						} else {
							Toast.error('Something went wrong');
						}
					} catch (err) {
						console.log(err);
					}
				} else {
					Toast.error('Something went wrong');
				}
			} catch (err) {
				console.log(err);
			}
		})();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(shipment_data?.importer_exporter_id)]);

	return {
		pocList,
		loading: loading || loadingPOC,
	};
};

export default useExistingPocList;
