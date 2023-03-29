import airFeedBackControls from '../../discover_rates/configurations/search/air/feedback';
import airCustomsFeedBackControls from '../../discover_rates/configurations/search/domestic/air-customs/feedback';
import fclCustomsFeedbackControls from '../../discover_rates/configurations/search/domestic/fcl-customs/feedback';
import ftlFeedBackControls from '../../discover_rates/configurations/search/domestic/ftl/feedback';
import haulageFreightFeedBackControls from
	'../../discover_rates/configurations/search/domestic/haulage-freight/feedback';
import lclCustomsFeedBackControls from '../../discover_rates/configurations/search/domestic/lcl-customs/feedback';
import ltlFeedBackControls from '../../discover_rates/configurations/search/domestic/ltl/feedback';
import trailerFreightFeedBackControls from '../../discover_rates/configurations/search/domestic/trailer/feedback';
import fclFeedBackControls from '../../discover_rates/configurations/search/fcl/feedback';
import lclFeedBackControls from '../../discover_rates/configurations/search/lcl/feedback';

const getFeedbackConfig = (mode) => {
	switch (mode) {
		case 'fcl_freight':
			return fclFeedBackControls;
		case 'air_freight':
			return airFeedBackControls;
		case 'lcl_freight':
			return lclFeedBackControls;
		case 'ftl_freight':
			return ftlFeedBackControls;
		case 'ltl_freight':
			return ltlFeedBackControls;
		case 'fcl_customs':
			return fclCustomsFeedbackControls;
		case 'lcl_customs':
			return lclCustomsFeedBackControls;
		case 'air_customs':
			return airCustomsFeedBackControls;
		case 'haulage_freight':
			return haulageFreightFeedBackControls;
		case 'trailer_freight':
			return trailerFreightFeedBackControls;
		default:
			return [];
	}
};

export default getFeedbackConfig;
