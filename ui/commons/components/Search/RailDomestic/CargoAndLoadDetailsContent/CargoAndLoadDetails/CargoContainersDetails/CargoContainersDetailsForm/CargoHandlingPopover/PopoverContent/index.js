import { Button } from '@cogoport/components';
import { useRef } from 'react';

import DoorPickupForm from '../../DoorPickupForm';
import DoorstepDeliveryForm from '../../DoorstepDeliveryForm';

import { Container, Header, ActionsButton, Main } from './styles';

const CONTROL_NAME_COMPONENT_MAPPING = {
	is_door_pickup       : DoorPickupForm,
	is_doorstep_delivery : DoorstepDeliveryForm,
};

function PopoverContent({
	show,
	formValues,
	onSubmitSuccess,
	onClose,
	controlName,
}) {
	if (!show) {
		return null;
	}

	const ref = useRef({});

	const onSave = async () => {
		const { handleSubmit } = ref.current;

		const response = await handleSubmit();

		const { hasError, values } = response;

		if (hasError) {
			return;
		}

		onSubmitSuccess?.({ controlName, values });
	};

	const Component = CONTROL_NAME_COMPONENT_MAPPING[controlName];
	if (!Component) {
		return null;
	}

	return (
		<Container>
			<Header>
				<ActionsButton>
					<Button
						type="button"
						className="primary sm"
						style={{ marginRight: 8 }}
						onClick={onSave}
					>
						Save
					</Button>

					<Button
						type="button"
						className="secondary sm"
						onClick={() => onClose({ controlName })}
					>
						Close
					</Button>
				</ActionsButton>
			</Header>

			<Main>
				<Component key={controlName} ref={ref} formValues={formValues} />
			</Main>
		</Container>
	);
}

export default PopoverContent;
