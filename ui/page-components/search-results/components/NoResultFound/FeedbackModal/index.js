import { Button, Modal } from '@cogoport/components';
import { useEffect } from 'react';

import commonControls from './controls';
import getPriorityAirlineOptions from './getPriorityAirlineOptions';
import styles from './styles.module.css';
import useRequestForRate from './useRequestForRate';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function FeedBackModal({
	onClose,
	show,
	details,
	requestService,
	proceeedWithFeedback = true,
}) {
	const { priorityAirlineOptions, airlineOptions } = getPriorityAirlineOptions();
	const initialControls = commonControls({ airlineOptions });
	const controls = initialControls[requestService?.service_type || details?.service_type];
	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const { loading, onSubmitFeedback } = useRequestForRate({
		onClose,
		reset,
		details,
		requestService,
	});

	const onSubmit = (values) => {
		onSubmitFeedback(values);
	};
	useEffect(() => {
		priorityAirlineOptions({
			origin_airport_id      : details.origin_airport_id,
			destination_airport_id : details.origin_airport_id,
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Modal
			placement="bottom-right"
			show={show}
			onClose={onClose}
			onOuterClick={onClose}
		>

			{proceeedWithFeedback ? (
				<form>
					<div className={styles.container}>
						<Modal.Header title="Rate Market Intelligence " />
						<div className={styles.layout}>
							{controls.map((item) => {
								const Element = getField(item.type);
								return (
									<div className={styles.field}>
										<div className={styles.lable}>{item.labelShow}</div>
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
						<Modal.Footer>
							<Button
								style={{ marginRight: 8 }}
								onClick={onClose}
								size="md"
								themeType="tertiary"
							>
								CANCEL
							</Button>

							<Button disabled={loading} onClick={handleSubmit(onSubmit)} size="md" themeType="primary">
								SUBMIT
							</Button>
						</Modal.Footer>
					</div>
				</form>
			) : (
				<div className={styles.container}>
					<div className={styles.header_text}>Add The Mandatory Additional Services First</div>
					<div className={styles.body}>
						<li>
							The Services Include:-
							<ul>Origin Transportation</ul>
							{details?.service_type === 'fcl_freight' ? (
								<ul>Origin Fcl Customs</ul>
							) : (
								<ul>Origin Air Customs</ul>
							)}
						</li>
					</div>
				</div>
			)}

		</Modal>
	);
}
export default FeedBackModal;
