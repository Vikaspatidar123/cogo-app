import { forwardRef } from 'react';
import { Flex } from '@cogoport/front/components';
import CargoContainersDetailsForm from './CargoContainersDetailsForm';
import {
	Container,
	HeaderContainer,
	Title,
	ContainerDetailsListContainer,
	ContainerDetailsFormContainer,
	ContainerCountContainer,
} from './styles';
import useCargoContainersDetails from './useCargoContainersDetails';
import ContainerDetailsList from './ContainerDetailsList';
import CONSTANTS from './utils/constants';
import AddMoreContainerButton from './AddMoreContainerButton';

const {
	MAXIMUM_FULL_RAKE_CONTAINER_COUNT,
	MAXIMUM_PIECE_MILE_CONTAINER_COUNT,
} = CONSTANTS;

const CargoContainersDetails = (props, ref) => {
	const { containerLoadSubType } = props;

	const {
		showForm,
		setShowForm,
		savedFormList,
		formContainerRef,
		formImperativeHandleRef,
		onClickCancelButton,
		onSaveSuccess,
		editFormId,
		onClickListEditButton,
		onClickListDeleteButton,
		calculateTotalContainersCount,
	} = useCargoContainersDetails(props, ref);

	const totalContainerCounts = calculateTotalContainersCount({});

	let isValidTotalContainersCount = true;
	if (containerLoadSubType === 'full_rake') {
		isValidTotalContainersCount = MAXIMUM_FULL_RAKE_CONTAINER_COUNT?.find(
			(val) => val === totalContainerCounts,
		);
	}

	if (containerLoadSubType === 'piece_mile') {
		isValidTotalContainersCount =
			totalContainerCounts <= MAXIMUM_PIECE_MILE_CONTAINER_COUNT;
	}

	const formValues = savedFormList.find((item) => item.id === editFormId) || {};

	return (
		<Container>
			<HeaderContainer>
				<Title>Container & Commodity Details</Title>

				<ContainerCountContainer>
					<span className="container-count__label">Total Container: </span>
					<span className="container-count__value">
						<span
							className={`container-count__value--count ${
								isValidTotalContainersCount
									? ''
									: 'container-count__value--invalid'
							}`}
						>
							{totalContainerCounts || '0'}
						</span>

						{containerLoadSubType === 'full_rake' && (
							<span className="container-count__value--total-count">
								/{isValidTotalContainersCount || '(80 or 90)'}
							</span>
						)}

						{containerLoadSubType === 'piece_mile' && (
							<span className="container-count__value--total-count">
								/{MAXIMUM_PIECE_MILE_CONTAINER_COUNT}
							</span>
						)}
					</span>

					{!isValidTotalContainersCount &&
						containerLoadSubType === 'full_rake' && (
							<span className="container-count__value__text--invalid">
								Total containers count should be equal to 80 or 90
							</span>
						)}

					{!isValidTotalContainersCount &&
						containerLoadSubType === 'piece_mile' && (
							<span className="container-count__value__text--invalid">
								Total containers count should not be greater than 1000
							</span>
						)}
				</ContainerCountContainer>

				<Flex style={{ margin: 'auto 0 auto auto' }}>
					<AddMoreContainerButton
						showForm={showForm}
						editFormId={editFormId}
						containerLoadSubType={containerLoadSubType}
						totalContainerCounts={totalContainerCounts}
						setShowForm={setShowForm}
					/>
				</Flex>
			</HeaderContainer>

			{showForm && (
				<ContainerDetailsFormContainer ref={formContainerRef}>
					<CargoContainersDetailsForm
						key={editFormId}
						ref={formImperativeHandleRef}
						onSaveSuccess={onSaveSuccess}
						showCancelButton={!!editFormId || savedFormList.length > 0}
						onClickCancelButton={onClickCancelButton}
						formValues={formValues}
					/>
				</ContainerDetailsFormContainer>
			)}

			<ContainerDetailsListContainer>
				<ContainerDetailsList
					list={savedFormList}
					editFormId={editFormId}
					onClickListEditButton={onClickListEditButton}
					onClickListDeleteButton={onClickListDeleteButton}
					renderCargoContainerDetailsForm={
						editFormId ? (
							<ContainerDetailsFormContainer>
								<CargoContainersDetailsForm
									key={editFormId}
									ref={formImperativeHandleRef}
									onSaveSuccess={onSaveSuccess}
									showCancelButton={!!editFormId || savedFormList.length > 0}
									onClickCancelButton={onClickCancelButton}
									formValues={formValues}
								/>
							</ContainerDetailsFormContainer>
						) : null
					}
				/>
			</ContainerDetailsListContainer>
		</Container>
	);
};

export default forwardRef(CargoContainersDetails);
