import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import useAddLineItem from '../../../../../../hooks/useAddLineItem';

import RenderLineItems from './RenderLineItems';
import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

function AddLineItem({ service, spotBookingDetails, getCheckout }) {
	const line_items = service?.line_items;

	const {
		controls,
		control,
		handleSubmit,
		errors,
		handleSave,
		deleteLineItem,
		loading,
	} = useAddLineItem({ service, spotBookingDetails, getCheckout });

	const showLineItems = () => {
		if (service?.line_items?.length > 0) {
			return (
				<RenderLineItems
					deleteLineItem={deleteLineItem}
					lineItems={line_items}
					loading={loading}
				/>
			);
		}

		return (
			<div className={styles.detail_icon}>
				<div className={styles.header_container}>
					{controls.map((item) => {
						const Element = getField(item.type);
						return (

							<div className={styles.field} key={item.name}>
								<div className={styles.lable}>{item.label}</div>
								<Element {...item} control={control} />
								{errors && (
									<div className={styles.errors}>
										{errors[item?.name]?.message}
									</div>
								)}
							</div>
						);
					})}

				</div>
			</div>
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.text}>
				{startCase(service?.service_type)}
				{' '}
				(
				{service?.container_size}
				{' '}
				FT)
			</div>
			<div className={styles.detail_icon}>
				<div className={styles.row}>
					<div className={styles.col}>
						Line Item
					</div>
					<div className={styles.col}>
						Unit
					</div>
					<div className={styles.col}>
						Currency
					</div>
					{/* <Col xs={12} md={12} lg={2} xl={2}>
						Buy Price
					</Col> */}
					<div className={styles.col}>
						Sell Price
					</div>
				</div>
			</div>
			{showLineItems()}
			<div className={styles.gray_line} />
			<div className={styles.button_container}>
				<Button
					disabled={loading || service?.line_items?.length > 0}
					onClick={handleSubmit(handleSave)}
				>
					Save
				</Button>
			</div>
		</div>
	);
}

export default AddLineItem;
