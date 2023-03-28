import Layout from '@cogo/business-modules/form/Layout';
import { Flex } from '@cogoport/front/components';
import { Button } from '@cogoport/front/components/admin';
import Grid from '@cogoport/front/components/Grid';
import { forwardRef } from 'react';

import CargoHandlingPopover from './CargoHandlingPopover';
import CargoHandlingPopoverSavedContent from './CargoHandlingPopoverSavedContent';
import { Container, ButtonContainer } from './styles';
import useCargoContainersDetailsForm from './useCargoContainersDetailsForm';

const layouts = {
	0: [
		'container_size',
		'container_type',
		'cargo_weight_per_container',
		'container_count',
	],
	1: ['commodity_type', 'commodity_subtype', 'packaging_type'],
	// 2: ['is_door_pickup', 'is_doorstep_delivery'],
};

const { Row, Col } = Grid;

function CargoContainersDetailsForm(props, ref) {
	const { showCancelButton, onClickCancelButton } = props;

	const { controls, formProps, cargoHandlingPopover, onSubmit, state } =		useCargoContainersDetailsForm(props, ref);

	const {
		fields,
		formState: { errors },
		handleSubmit,
		getValues,
	} = formProps;

	return (
		<Container>
			{Object.entries(layouts).map(([layout, layoutControlsName]) => {
				const layoutControls = controls.filter((control) => layoutControlsName.includes(control.name));

				const isPickupAndDelivery = layoutControlsName.every((controlName) => {
					const controlNames = ['is_door_pickup', 'is_doorstep_delivery'];
					return controlNames.includes(controlName);
				});

				if (!isPickupAndDelivery) {
					return (
						<Layout
							key={layout}
							controls={layoutControls}
							fields={fields}
							errors={errors}
						/>
					);
				}

				return (
					<Row key={layout}>
						{layoutControlsName.map((controlName) => {
							const controlObj = layoutControls.find((control) => control.name === controlName);

							if (!controlObj) {
								return null;
							}

							const {
								onSubmitSuccess,
								onClose,
								onClickOutside,
								onClickShowPopover,
							} = cargoHandlingPopover;

							const { [controlName]: cargoHandlingState } = state || {};

							const { showPopover, data } = cargoHandlingState || {};

							const { [controlName]: cargoHandling } = getValues();
							const isCargoHandlingChecked = (cargoHandling || []).includes(
								true,
							);

							return (
								<Col key={`${layout}__${controlName}`} xs={12} md={3}>
									<Flex direction="row">
										<CargoHandlingPopover
											key={`${layout}__${controlName}`}
											show={showPopover}
											control={controlObj}
											field={fields[controlName]}
											formValues={data || {}}
											onSubmitSuccess={onSubmitSuccess}
											onClose={onClose}
											onClickOutside={onClickOutside}
										/>
									</Flex>

									{isCargoHandlingChecked && (
										<CargoHandlingPopoverSavedContent
											data={data}
											onClickShowPopover={() => onClickShowPopover({ controlName })}
										/>
									)}
								</Col>
							);
						})}
					</Row>
				);
			})}

			<ButtonContainer>
				{showCancelButton && (
					<Button
						type="button"
						className="secondary md"
						onClick={() => onClickCancelButton?.()}
						style={{ marginRight: 16 }}
					>
						Cancel
					</Button>
				)}

				<Button
					type="button"
					className="primary md"
					onClick={handleSubmit(onSubmit)}
				>
					Save
				</Button>
			</ButtonContainer>
		</Container>
	);
}

export default forwardRef(CargoContainersDetailsForm);
