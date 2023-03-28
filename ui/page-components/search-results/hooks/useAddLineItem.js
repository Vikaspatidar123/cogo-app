import { useRequest } from '@cogo/commons/hooks';
import { useSelector } from '@cogo/store';
import { toast } from '@cogoport/front/components';
import { useFormCogo } from '@cogoport/front/hooks';

import getControls from '../utils/lineItemControls';

const useAddLineItem = ({ service, spotBookingDetails, getCheckout }) => {
	const { scope } = useSelector(({ general }) => ({
		scope: general?.scope,
	}));

	const controls = getControls();

	const updateCheckoutCustomizeQuotation = useRequest(
		'post',
		false,
		scope,
	)('/update_checkout_customize_quotation');

	const {
		fields,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useFormCogo(controls);

	const handleSave = async (values) => {
		const service_id = service?.id;

		const line_item_arr = (values?.line_items || []).map((line_item) => {
			const line_item_object = {
				code     : line_item?.code,
				unit     : line_item?.unit,
				currency : line_item?.currency,
				price    : Number(line_item?.sell_price),
			};

			if (line_item_object?.unit === 'per_wm') {
				line_item_object.cbm_weight_ratio = 1;
			}

			return line_item_object;
		});

		const body = {
			id                : spotBookingDetails?.checkout_id,
			line_items_to_add : {
				[service_id]: line_item_arr,
			},
		};

		try {
			const res = await updateCheckoutCustomizeQuotation.trigger({
				data: body,
			});
			if (!res.hasError) {
				toast.success('Line Item(s) Added Successfully');
				getCheckout.trigger({
					params: {
						id             : spotBookingDetails?.checkout_id,
						quotation_type : 'customize',
					},
				});
			}
		} catch (err) {
			const error_message = Object.values(err?.data || {});
			toast.error(error_message[0]);
		}
	};

	const deleteLineItem = async (values) => {
		const service_id = service?.id;

		const body = {
			id                   : spotBookingDetails?.checkout_id,
			line_items_to_delete : {
				[service_id]: [values?.code],
			},
		};

		try {
			const res = await updateCheckoutCustomizeQuotation.trigger({
				data: body,
			});
			if (!res.hasError) {
				toast.success('Line Item Deleted Successfully');
				getCheckout.trigger({
					params: {
						id             : spotBookingDetails?.checkout_id,
						quotation_type : 'customize',
					},
				});
			}
		} catch (err) {
			const error_message = Object.values(err?.data || {});
			toast.error(error_message[0]);
		}
	};

	return {
		errors,
		controls,
		fields,
		handleSubmit,
		watch,
		setValue,
		handleSave,
		deleteLineItem,
		loading: updateCheckoutCustomizeQuotation?.loading,
	};
};

export default useAddLineItem;
