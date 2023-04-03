import { Button, Modal } from '@cogoport/components';
import { useEffect, useState } from 'react';

import getFeedbackConfig from '../../../../helpers/getFeedbackConfig';
import SuccessModal from '../SuccessModal';

import FormElements from './FormElements';
import styles from './styles.module.css';
import useDislikeFeedback from './useDislikeFeedback';

import { useForm } from '@/packages/forms';

function DislikeFeedbackModal({ details, rate, updateRate, show, onClose }) {
	const [showSuccess, setShowSuccess] = useState(false);

	const controls = getFeedbackConfig(rate.service_type);

	const {
		handleSubmit,
		formState: { errors },
		watch,
		reset,
		control,
		setValue,
	} = useForm();

	const formValues = watch();

	const onSuccess = (card, values) => {
		setShowSuccess(true);
		updateRate(card, values);
	};

	const { loading, onSubmitFeedback } = useDislikeFeedback({
		rate,
		updateRate: onSuccess,
		onClose,
		details,
		reset,
	});

	const onSubmit = (values) => {
		onSubmitFeedback(values);
	};

	const showElements = controls.reduce((previousControls, currentControls) => {
		const { name = '' } = currentControls;

		let showElement = true;
		if (
			name === 'preferred_airline_ids'
			&& !(formValues.feedbacks || []).includes('unpreferred_airlines')
		) {
			showElement = false;
		}

		if (
			name === 'preferred_shipping_line_ids'
			&& !(formValues.feedbacks || []).includes('unpreferred_shipping_lines')
		) {
			showElement = false;
		}

		if (
			name === 'preferred_detention_free_days'
			&& !(formValues.feedbacks || []).includes(
				'unsatisfactory_destination_detention',
			)
		) {
			showElement = false;
		}

		return {
			...previousControls,
			[name]: showElement,
		};
	}, {});

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (
				name === 'feedbacks'
				&& !value[name].includes('unsatisfactory_rate')
			) {
				setValue('preferred_freight_rate_currency', '');
				setValue('preferred_freight_rate', '');
			}

			if (
				name === 'feedbacks'
				&& !value[name].includes('unpreferred_airlines')
			) {
				setValue('preferred_airline_ids', '');
			}

			if (
				name === 'feedbacks'
				&& !value[name].includes('unsatisfactory_destination_detention')
			) {
				setValue('preferred_detention_free_days', '');
			}

			if (
				name === 'feedbacks'
				&& !value[name].includes('unpreferred_shipping_lines')
			) {
				setValue('preferred_shipping_line_ids', '');
			}
		});

		return () => subscription.unsubscribe();
	}, [watch]);

	return (
		<>
			{show ? (
				<Modal
					position="bottom-right"
					className="md"
					show={show}
					onClose={onClose}
					onOuterClick={onClose}
					styles={{ dialog: { paddingBottom: 0 } }}
				>
					<div className={styles.container} onSubmit={handleSubmit(onSubmit)}>
						<div className={styles.header_text}>Reason for dislike</div>

						<FormElements
							showElements={showElements}
							formValues={formValues}
							fields={control}
							errors={errors}
						/>

						<div className={styles.footer}>
							<Button
								disabled={loading}
								style={{ marginRight: 8 }}
								className="secondary sm"
								onClick={onClose}
							>
								CANCEL
							</Button>

							<Button type="submit" disabled={loading} className="primary sm">
								SUBMIT
							</Button>
						</div>
					</div>
				</Modal>
			) : null}

			<SuccessModal
				show={showSuccess}
				setShow={setShowSuccess}
				title="Thanks for your valuable feedback!"
				description="We appreciate your feedback. We assure to send you an email with the
				updated rates."
			/>
		</>
	);
}

export default DislikeFeedbackModal;
