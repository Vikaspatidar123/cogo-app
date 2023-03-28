import Layout from '@cogo/business-modules/form/Layout';
import { Button } from '@cogoport/front/components/admin';
import { useFormCogo } from '@cogoport/front/hooks';
import { useEffect } from 'react';

import commonControls from './controls';
import getPriorityAirlineOptions from './getPriorityAirlineOptions';
import { Container, Footer, DislikeModal, HeaderText, Body } from './styles';
import useRequestForRate from './useRequestForRate';

function FeedBackModal({
	onClose,
	show,
	details,
	requestService,
	proceeedWithFeedback = true,
}) {
	const { priorityAirlineOptions, airlineOptions } =		getPriorityAirlineOptions();
	const initialControls = commonControls({ airlineOptions });
	const controls =		initialControls[requestService?.service_type || details?.service_type];
	const {
		fields,
		handleSubmit,
		formState: { errors },
		reset,
	} = useFormCogo(controls);
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
	}, []);

	return (
		<DislikeModal
			position="bottom-right"
			className="md"
			show={show}
			onClose={onClose}
			onOuterClick={onClose}
			styles={{ dialog: { paddingBottom: 0 } }}
		>
			{proceeedWithFeedback ? (
				<Container onSubmit={handleSubmit(onSubmit)}>
					<HeaderText>Rate Market Intelligence</HeaderText>

					<Layout
						fields={fields}
						controls={controls}
						errors={errors}
						themeType="admin"
					/>

					<Footer>
						<Button
							style={{ marginRight: 8 }}
							className="secondary sm"
							onClick={onClose}
						>
							CANCEL
						</Button>

						<Button disabled={loading} type="submit" className="primary sm">
							SUBMIT
						</Button>
					</Footer>
				</Container>
			) : (
				<Container>
					<HeaderText>Add The Mandatory Additional Services First</HeaderText>
					<Body>
						<li>
							The Services Include:-
							<ul>Origin Transportation</ul>
							{details?.service_type === 'fcl_freight' ? (
								<ul>Origin Fcl Customs</ul>
							) : (
								<ul>Origin Air Customs</ul>
							)}
						</li>
					</Body>
				</Container>
			)}
		</DislikeModal>
	);
}
export default FeedBackModal;
