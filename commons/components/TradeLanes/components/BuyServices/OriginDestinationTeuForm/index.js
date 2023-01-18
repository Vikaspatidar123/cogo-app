import Button from '@/commons/components/UI/Button';
import FormLayout from '@/temp/form/FormLayout';
import { useSelector } from '@cogoport/front/store';
import {
	SpinnerContainer,
	Container,
	Form,
	FormContainer,
	TradeLanesContainer,
	AddedTradelanesContainer,
	LoadingStateContainer,
	StyledArrowIcon,
	StyledDeleteIcon,
	ButtonContainer,
	CardContainer,
} from './styles';
import useOriginDestinationTeuForm from './hooks/useOriginDestinationTeuForm';
import Spinner from '../../../../Spinner';

function OriginDestinationTeuForm({
	props,
	serviceType = '',
	frieghtType = '',
	setShowServicesForm = () => {},
}) {
	const {
		general: { isMobile = false },
	} = useSelector((state) => state);

	const {
		controls = [],
		fields = {},
		errors = {},
		handleSubmit = () => {},
		onSubmit = () => {},
		addedTradeLanesArray = [],
		onClickDeleteIcon = () => {},
		loading = false,
		loadingGetPartnerUser = false,
		loadingDeleteIcon = false,
	} = useOriginDestinationTeuForm({
		props,
		serviceType,
		frieghtType,
		setShowServicesForm,
	});

	return (
		<Container>
			<CardContainer>
				<div className="title">
					In which trade lanes you need services the most?
				</div>

				<FormContainer>
					<Form>
						<FormLayout controls={controls} fields={fields} errors={errors} />
					</Form>

					<ButtonContainer
						style={{
							position: isMobile ? '' : 'absolute',
							bottom: isMobile ? '' : 18,
							right: isMobile ? '' : 0,
						}}
					>
						<Button
							className="secondary md"
							onClick={handleSubmit((values) => onSubmit({ values }))}
							disabled={loading}
						>
							{addedTradeLanesArray.length > 0 ? 'Add More' : 'Add'}
						</Button>
					</ButtonContainer>
				</FormContainer>

				{loadingGetPartnerUser ? (
					<SpinnerContainer>
						<Spinner size={30} />
					</SpinnerContainer>
				) : (
					addedTradeLanesArray.length > 0 && (
						<>
							<div className="tradeLaneHeader">Added Trade Lanes</div>

							<TradeLanesContainer>
								{addedTradeLanesArray.map((item, index) => {
									return (
										<AddedTradelanesContainer
											showBorderBottom={
												index !== addedTradeLanesArray.length - 1
											}
										>
											<div className="origin">{item.origin}</div>
											<StyledArrowIcon size={0.8} />
											<div className="destination">{item.destination}</div>
											<div className="teu">{item.teu}</div>
											<LoadingStateContainer>
												{loadingDeleteIcon ? (
													<Spinner size={20} style={{ flex: '1' }} />
												) : (
													<StyledDeleteIcon
														size={1.5}
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

export default OriginDestinationTeuForm;
