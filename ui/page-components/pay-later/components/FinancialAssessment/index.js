import ESignTracking from './ESignTracking';

function FinancialAssessment({ getCreditRequestResponse = () => {} }) {
	return <ESignTracking getCreditRequestResponse={getCreditRequestResponse} />;
}

export default FinancialAssessment;
