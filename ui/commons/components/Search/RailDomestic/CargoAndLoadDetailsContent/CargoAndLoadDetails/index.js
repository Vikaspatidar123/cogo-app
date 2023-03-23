import { Button } from '@cogoport/front/components/admin';
import { get } from '@cogoport/front/utils';
import CargoContainersDetails from './CargoContainersDetails';
import CargoDetails from './CargoDetails';
import {
	Container,
	HeaderContainer,
	Title,
	ActionButtonContainer,
	MainContainer,
	CargoDetailsContainer,
	CargoContainersDetailsContainer,
} from './styles';
import useCargoAndLoadDetails from './useCargoAndLoadDetails';

const CargoAndLoadDetails = (props) => {
	const { formValues } = props;

	const {
		containerLoadSubType,
		setContainerLoadSubType,
		imperativeHandleRef,
		onClickSaveButton,
		onClickCloseButton,
	} = useCargoAndLoadDetails(props);

	return (
		<Container>
			<HeaderContainer>
				<Title>Cargo & Load Details</Title>

				<ActionButtonContainer>
					<Button
						type="button"
						className="primary md"
						style={{ marginRight: 16 }}
						onClick={() => onClickSaveButton()}
					>
						Save
					</Button>

					<Button
						type="button"
						className="secondary md"
						onClick={() => onClickCloseButton()}
					>
						Close
					</Button>
				</ActionButtonContainer>
			</HeaderContainer>

			<MainContainer>
				{/* <Text color="#cb6464" size={14} bold={500} marginRight={12}>
						*** Please Confirm Your Changes ***
					</Text> */}

				<CargoDetailsContainer>
					<CargoDetails
						ref={(r) => {
							imperativeHandleRef.current.cargoDetails = r;
						}}
						onChangeContainerSubType={setContainerLoadSubType}
						formValues={get(formValues, 'cargoDetails') || {}}
					/>
				</CargoDetailsContainer>

				<CargoContainersDetailsContainer>
					<CargoContainersDetails
						ref={(r) => {
							imperativeHandleRef.current.cargoContainersDetails = r;
						}}
						containerLoadSubType={containerLoadSubType}
						formValuesList={get(formValues, 'cargoContainersDetails') || []}
					/>
				</CargoContainersDetailsContainer>
			</MainContainer>
		</Container>
	);
};

export default CargoAndLoadDetails;
