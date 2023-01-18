import { isEmpty, startCase } from '@cogoport/front/utils';
import FormLayout from '@/temp/form/FormLayout';
import {
	SpinnerContainer,
	Container,
	Form,
	FormIconContainer,
	TradeLanesContainer,
	AddedTradelanesContainer,
	LoadingStateContainer,
	StyledDeleteIcon,
	StyledAddIcon,
	CardContainer,
} from './styles';
import useFclCfsForm from './hooks/useFclCfsForm';
import Spinner from '../../../../Spinner';

function FclCfsForm({
	props,
	serviceType = '',
	frieghtType = '',
	setShowServicesForm = () => {},
}) {
	const {
		importControls = [],
		importFields = {},
		errorsImport = {},
		handleSubmit = () => {},
		onSubmit = () => {},
		onSubmitExport = () => {},
		addedTradeLanesArray = [],
		onClickDeleteIcon = () => {},
		exportControls,
		handleSubmitExport,
		fieldsExport,
		errorsExport,
		tileControls,
		fieldsTileControls,
		watchTileControlValues,
		loadingGetPartnerUser = false,
		loadingDeleteButton = false,
		loadingAddButton = false,
	} = useFclCfsForm({
		props,
		serviceType,
		frieghtType,
		setShowServicesForm,
	});

	return (
		<Container>
			<CardContainer>
				<Form>
					<FormLayout
						controls={tileControls}
						fields={fieldsTileControls}
						errors={{}}
					/>
				</Form>

				{watchTileControlValues.specializedService.includes('import') && (
					<FormIconContainer>
						<Form>
							<FormLayout
								controls={importControls}
								fields={importFields}
								errors={errorsImport}
							/>
						</Form>

						<LoadingStateContainer>
							{loadingAddButton ? (
								<SpinnerContainer>
									<Spinner size={20} style={{ flex: 1 }} />
								</SpinnerContainer>
							) : (
								<StyledAddIcon
									useRelativePosition={!isEmpty(errorsImport)}
									onClick={handleSubmit(onSubmit)}
								/>
							)}
						</LoadingStateContainer>
					</FormIconContainer>
				)}

				{watchTileControlValues.specializedService.includes('export') && (
					<FormIconContainer>
						<Form>
							<FormLayout
								controls={exportControls}
								fields={fieldsExport}
								errors={errorsExport}
							/>
						</Form>

						<LoadingStateContainer>
							{loadingAddButton ? (
								<SpinnerContainer>
									<Spinner size={20} style={{ flex: 1 }} />
								</SpinnerContainer>
							) : (
								<StyledAddIcon
									useRelativePosition={!isEmpty(errorsExport)}
									onClick={handleSubmitExport(onSubmitExport)}
								/>
							)}
						</LoadingStateContainer>
					</FormIconContainer>
				)}

				{loadingGetPartnerUser ? (
					<SpinnerContainer>
						<Spinner size={30} />
					</SpinnerContainer>
				) : (
					addedTradeLanesArray.length > 0 && (
						<>
							<div className="tradeLaneHeader">Added Regions</div>

							<TradeLanesContainer>
								{addedTradeLanesArray.map((item, index) => {
									return (
										<AddedTradelanesContainer
											showBorderBottom={
												index !== addedTradeLanesArray.length - 1
											}
										>
											<div className="serviceType">
												<div
													className={
														item.trade_type === 'import'
															? 'serviceTypeImport'
															: 'serviceTypeExport'
													}
												>
													{startCase(item.trade_type)}
												</div>
											</div>
											<div className="locationName">{item.name}</div>
											<div className="isAgentPresent">
												{item.is_cfs_agent_present ? 'YES' : 'NO'}
											</div>
											<LoadingStateContainer>
												{loadingDeleteButton ? (
													<Spinner size={20} style={{ flex: 1 }} />
												) : (
													<StyledDeleteIcon
														onClick={() => onClickDeleteIcon({ index })}
													/>
												)}
											</LoadingStateContainer>
										</AddedTradelanesContainer>
									);
								})}
							</TradeLanesContainer>
						</>
					)
				)}
			</CardContainer>
		</Container>
	);
}

export default FclCfsForm;
