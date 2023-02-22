import { useRouter, dynamic } from '@cogo/next';
import { IcMCfs } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import { useWindowDimensions } from '../../../../common/utils/getMobileView';
import SecureIcon from '../../assets/secure-profile-icon.svg';
import PaymentStatusModal from '../../common/PaymentStatusModal';
import useCheckStatus from '../../hooks/useCheckStatus';
import usePostTradeEngine from '../../hooks/usePostTradeEngine';
import {
	ListColumn, MapColumn, Wrapper, MapColumn2,
} from '../Content/styles';
import {
	Container, ContentWrapper, SVG, Heading,
} from '../styles';

import {
	ListWrapper,
	Card,
	NameColumn,
	Column,
	Percentage,
	ScoreText,
	Heading2,
	Text2,
	Wrapper2,
	StyledRow,
	Title,
	Label,
	StyledSkeleton,
	Column2,
	Column3,
} from './styles';

const Map = dynamic(() => import('../Map'), { ssr: false });

function ListPage() {
	const { query, push } = useRouter();
	const { billId = '', draftIdFromAddon = '' } = query || {};
	const [paymentStatusModal, setPaymentStatusModal] = useState(false);
	const { createTradeEngine, tradeEngineResponse, getTradeEngineListLoading } =		usePostTradeEngine();
	const {
		checkPaymentStatus, checkLoading, stop, paymentStatus,
	} = useCheckStatus({
		query,
		setPaymentStatusModal,
		createTradeEngine,
	});
	const { screeningRequestResponse, screeningPartyName = '' } = tradeEngineResponse || {};
	const [isMobile, setIsMobile] = useState(false);

	const { width } = useWindowDimensions();
	useEffect(() => {
		if (width < 1154) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	}, [width]);
	useEffect(() => {
		if (billId) {
			checkPaymentStatus();
		} else if (draftIdFromAddon) {
			createTradeEngine({ draftIdFromAddon });
		}
	}, []);

	return (
		<>
			{isMobile && (
				<MapColumn2 xs={12}>
					<Map isMobile={isMobile} />
				</MapColumn2>
			)}
			<Wrapper2>
				<Container isMobile={isMobile}>
					{!isMobile && (
						<>
							<Column2
								xs={2}
								onClick={() => push('/saas/premium-services/trader-eligibility-check')}
							>
								<IcMCfs fill="#034afd" />
								<div className="text">Go to home page</div>
							</Column2>
							<Heading xs={7}>
								<SVG />
								Trader Eligibilty Check
							</Heading>
						</>
					)}
					{isMobile && (
						<>
							<Column3
								xs={1}
								onClick={() => push('/saas/premium-services/trader-eligibility-check')}
							>
								<IcMCfs fill="#034afd" />
							</Column3>
							<Heading xs={11}>
								<SVG />
								Trader Eligibilty Check
							</Heading>
						</>
					)}
				</Container>
				<ContentWrapper isMobile={isMobile}>
					<Wrapper>
						<ListColumn xs={isMobile ? 12 : 4}>
							{!getTradeEngineListLoading
								&& !screeningRequestResponse
								&& paymentStatus === 'PAID'
								&& new Array(3).fill(1).map(() => (
									<div>
										<StyledSkeleton>
											<rect width="350px" height="200px" />
										</StyledSkeleton>
									</div>
								))}
							{getTradeEngineListLoading
								&& new Array(3).fill(1).map(() => (
									<div>
										<StyledSkeleton>
											<rect width="350px" height="200px" />
										</StyledSkeleton>
									</div>
								))}
							{!getTradeEngineListLoading && screeningRequestResponse?.length > 0 && (
								<>
									<Title>
										Total Results (
										{screeningRequestResponse.length}
										)
									</Title>
									<ListWrapper>
										{(screeningRequestResponse || []).map((item) => (
											<Card key={`${item?.screeningName}_${item?.screeningAka}`}>
												<StyledRow>
													<NameColumn xs={10}>
														{item?.screeningName?.toUpperCase()}
													</NameColumn>
													<Column xs={2}>
														<Percentage weight={item?.screeningMatchWeight}>
															{item?.screeningMatchWeight * 100}
															%
														</Percentage>
														<ScoreText>Matching score</ScoreText>
													</Column>
												</StyledRow>
												<StyledRow>
													<Column>
														<Heading2>Listing Name</Heading2>
														<Text2>{item?.screeningListName}</Text2>
													</Column>
												</StyledRow>
												<StyledRow>
													<Column>
														<Heading2>Department Name</Heading2>
														<Text2>{item?.screeningDept}</Text2>
													</Column>
													<Column>
														<Heading2>Registered Date</Heading2>
														<Text2>{item?.screeningFedRegDate}</Text2>
													</Column>
												</StyledRow>
											</Card>
										))}
									</ListWrapper>
								</>
							)}
							{!getTradeEngineListLoading && screeningRequestResponse?.length === 0 && (
								<ListWrapper>
									<SecureIcon height={300} width={300} />
									<Label>
										<div className="bold">{screeningPartyName.toUpperCase()}</div>
										<div>is a verified user</div>
									</Label>
								</ListWrapper>
							)}
						</ListColumn>
						{!isMobile && (
							<MapColumn xs={isMobile ? 12 : 8}>
								<Map />
							</MapColumn>
						)}
					</Wrapper>
				</ContentWrapper>
				{paymentStatusModal && (
					<PaymentStatusModal
						checkLoading={checkLoading}
						stop={stop}
						paymentStatus={paymentStatus}
						paymentStatusModal={paymentStatusModal}
						setPaymentStatusModal={setPaymentStatusModal}
					/>
				)}
			</Wrapper2>
		</>
	);
}
export default ListPage;
