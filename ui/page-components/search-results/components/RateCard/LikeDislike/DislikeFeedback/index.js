import { useEffect, useState } from 'react';

import { useFormCogo } from '@cogoport/front/hooks';
import { Button } from '@cogoport/front/components/admin';

import FormElements from './FormElements';
import useDislikeFeedback from './useDislikeFeedback';
import SuccessModal from '../SuccessModal';
import getFeedbackConfig from '../../../../helpers/getFeedbackConfig';

import { Container, Footer, DislikeModal, HeaderText } from './styles';

const DislikeFeedbackModal = ({ details, rate, updateRate, show, onClose }) => {
	const [showSuccess, setShowSuccess] = useState(false);

	const controls = getFeedbackConfig(rate.service_type);

	const {
		fields,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
		setValue,
	} = useFormCogo(controls);

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
			name === 'preferred_airline_ids' &&
			!(formValues.feedbacks || []).includes('unpreferred_airlines')
		) {
			showElement = false;
		}

		if (
			name === 'preferred_shipping_line_ids' &&
			!(formValues.feedbacks || []).includes('unpreferred_shipping_lines')
		) {
			showElement = false;
		}

		if (
			name === 'preferred_detention_free_days' &&
			!(formValues.feedbacks || []).includes(
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
				name === 'feedbacks' &&
				!value[name].includes('unsatisfactory_rate')
			) {
				setValue('preferred_freight_rate_currency', '');
				setValue('preferred_freight_rate', '');
			}

			if (
				name === 'feedbacks' &&
				!value[name].includes('unpreferred_airlines')
			) {
				setValue('preferred_airline_ids', '');
			}

			if (
				name === 'feedbacks' &&
				!value[name].includes('unsatisfactory_destination_detention')
			) {
				setValue('preferred_detention_free_days', '');
			}

			if (
				name === 'feedbacks' &&
				!value[name].includes('unpreferred_shipping_lines')
			) {
				setValue('preferred_shipping_line_ids', '');
			}
		});

		return () => subscription.unsubscribe();
	}, [watch]);

	return (
		<>
			{show ? (
				<DislikeModal
					position="bottom-right"
					className="md"
					show={show}
					onClose={onClose}
					onOuterClick={onClose}
					styles={{ dialog: { paddingBottom: 0 } }}
				>
					<Container onSubmit={handleSubmit(onSubmit)}>
						<HeaderText>Reason for dislike</HeaderText>

						<FormElements
							showElements={showElements}
							formValues={formValues}
							fields={fields}
							errors={errors}
						/>

						<Footer>
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
						</Footer>
					</Container>
				</DislikeModal>
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
};

export default DislikeFeedbackModal;
