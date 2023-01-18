import { Button } from '@cogoport/front/components/admin';
import { StyledHeader } from './styles';

function ApplyService({
	approvedService,
	handlePushToApplyService,
	heading,
	buttonText,
}) {
	return !approvedService.loading && !(approvedService?.active || []).length ? (
		<StyledHeader>
			{heading}
			<Button
				className="primary text md"
				onClick={handlePushToApplyService}
				style={{ marginTop: '4px' }}
			>
				{buttonText}
			</Button>
		</StyledHeader>
	) : null;
}
export default ApplyService;
