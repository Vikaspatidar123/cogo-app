import airCustomsTerms from '../configurations/TermsAndCondition/terms-default-air-customs.json';
import airTerms from '../configurations/TermsAndCondition/terms-default-air.json';
import fclCustomsTerms from '../configurations/TermsAndCondition/terms-default-fcl-customs.json';
import fclFreightLocalTerms from '../configurations/TermsAndCondition/terms-default-fcl-locals.json';
import fclTerms from '../configurations/TermsAndCondition/terms-default-fcl.json';
import ftlTerms from '../configurations/TermsAndCondition/terms-default-ftl.json';
import haulageTerms from '../configurations/TermsAndCondition/terms-default-haulage.json';
import lclCustomsTerms from '../configurations/TermsAndCondition/terms-default-lcl-customs.json';
import lclTerms from '../configurations/TermsAndCondition/terms-default-lcl.json';
import ltlTerms from '../configurations/TermsAndCondition/terms-default-ltl.json';
import trailerterms from '../configurations/TermsAndCondition/terms-default-trailer.json';

const getDefaultTncConfig = (mode) => {
	switch (mode) {
		case 'fcl_freight':
			return fclTerms;
		case 'air_freight':
			return airTerms;
		case 'lcl_freight':
			return lclTerms;
		case 'ftl_freight':
			return ftlTerms;
		case 'ltl_freight':
			return ltlTerms;
		case 'trailer_freight':
			return trailerterms;
		case 'haulage_freight':
			return haulageTerms;
		case 'fcl_freight_local':
			return fclFreightLocalTerms;
		case 'fcl_customs':
			return fclCustomsTerms;
		case 'lcl_customs':
			return lclCustomsTerms;
		case 'air_customs':
			return airCustomsTerms;
		default:
			return [];
	}
};

export default getDefaultTncConfig;
