import { Button, CheckBox, Skeleton } from '@cogoport/front/components/admin';
import React from 'react';

import {
	Container,
	TermsAndConditionsContainer,
	Title,
	TermsContainer,
} from './styles';
import useAcceptTermsAndConditions from './useAcceptTermsAndConditions';
import SuccessOnboardingModal from './SuccessOnboardingModal';

function TermsAndConditions() {
	const {
		onClickAcceptAgreement,
		onClickOkayButton,
		accepted,
		setAccepted,
		showModal,
		data = {},
		loading,
		submitLoading,
	} = useAcceptTermsAndConditions();

	const { list = [] } = data;

	return (
		<Container>
			{loading ? (
				<>
					<Skeleton width="15%" height="20px" margin="12px 0 0" />
					<Skeleton width="100%" height="48px" margin="24px 0 0 0" />
					<Skeleton width="100%" height="48px" margin="24px 0 0 0" />
					<Skeleton width="100%" height="48px" margin="24px 0 0 0" />
					<Skeleton width="100%" height="48px" margin="24px 0 0 0" />
					<Skeleton width="100%" height="48px" margin="24px 0 0 0" />
				</>
			) : (
				<TermsAndConditionsContainer>
					<Title>AGREEMENT</Title>
					{list[0]?.description.map((item) => {
						return (
							<div>
								<p>{item}</p>
							</div>
						);
					})}
				</TermsAndConditionsContainer>
			)}

			<TermsContainer style={{ paddingLeft: '24px' }}>
				<div style={{ display: 'flex' }}>
					<CheckBox checked={accepted} onChange={setAccepted} />
					<span style={{ marginLeft: 6 }}>I Accept all terms & conditions</span>
				</div>

				<Button
					className="primary md"
					disabled={submitLoading}
					onClick={onClickAcceptAgreement}
				>
					{submitLoading ? 'Submiting...' : 'Submit'}
				</Button>
			</TermsContainer>

			<SuccessOnboardingModal
				show={showModal || data?.list?.[0]?.tnc_accepted_at}
				onClickOkayButton={onClickOkayButton}
			/>
		</Container>
	);
}

export default TermsAndConditions;
