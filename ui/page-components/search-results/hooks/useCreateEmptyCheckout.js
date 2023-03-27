import { useSelector } from '@cogo/store';
import { useRequest } from '@cogo/commons/hooks';
import { useRouter } from '@cogo/next';
import { toast } from '@cogoport/front/components';
import getGeoConstants from '@cogo/globalization/constants/geo';
import formatSwbPayload from '../utils/format-swb-payload';

const geo = getGeoConstants();

const cogoVerseTeamIDS = [
	geo.uuid.cogoverse_admin_id,
	geo.uuid.cogoverse_executive_id,
	geo.uuid.cogoverse_kam_id,
];

const useCreateEmptyCheckout = ({ data, touch_points, wayToBook }) => {
	const router = useRouter();

	const {
		scope,
		query = {},
		userRoleIDs = [],
	} = useSelector(({ general, profile }) => ({
		scope: general.scope,
		query: general?.query,
		userRoleIDs: profile?.partner?.user_role_ids,
	}));
	const { service_details } = data;

	const CreateCheckoutApi = useRequest(
		'post',
		false,
		scope,
	)('/create_checkout');

	const handleSave = async (values) => {
		try {
			const service_payload = formatSwbPayload({
				service_details,
				touch_points,
				values,
				wayToBook,
			});

			const service_payload_final = {};
			Object.keys(service_payload).forEach((service) => {
				if (service_payload[service].length !== 0) {
					service_payload_final[service] = service_payload?.[service];
				}
			});

			const primary_service =
				data?.search_type === 'trailer_freight'
					? 'haulage_freight'
					: data?.search_type;

			const isCogoVerseMember = userRoleIDs.some((elem) =>
				cogoVerseTeamIDS.includes(elem),
			);

			const payload = {
				source: wayToBook === 'spot_booking' ? 'spot_line_booking' : 'direct',
				source_id: data?.id,
				primary_service,
				importer_exporter_id: data?.importer_exporter_id,
				importer_exporter_branch_id: data?.importer_exporter_branch_id,
				user_id: data?.user?.id,
				quotation_type: 'customize',
				existing_shipment_id:
					data?.source === 'upsell' ? data?.source_id : undefined,
				tags:
					scope === 'partner' &&
					(query?.source === 'communication' || isCogoVerseMember)
						? ['cogoverse']
						: undefined,
				...service_payload_final,
			};

			const res = await CreateCheckoutApi.trigger({ data: payload });

			if (!res.hasError) {
				router.push(
					'/customize-checkout/[checkout_id]',
					`/customize-checkout/${res?.data?.id}`,
				);
			}
		} catch (err) {
			toast.error(err?.data || 'Something went wrong!');
		}
	};
	return {
		handleSave,
		loading: CreateCheckoutApi.loading,
	};
};

export default useCreateEmptyCheckout;
