import airFeedBackControls from '@cogo/app-search/configurations/search/air/feedback.js';
import airCustomsFeedBackControls from '@cogo/app-search/configurations/search/domestic/air-customs/feedback.js';
import fclCustomsFeedbackControls from '@cogo/app-search/configurations/search/domestic/fcl-customs/feedback.js';
import ftlFeedBackControls from '@cogo/app-search/configurations/search/domestic/ftl/feedback.js';
import haulageFreightFeedBackControls from '@cogo/app-search/configurations/search/domestic/haulage-freight/feedback.js';
import lclCustomsFeedBackControls from '@cogo/app-search/configurations/search/domestic/lcl-customs/feedback.js';
import ltlFeedBackControls from '@cogo/app-search/configurations/search/domestic/ltl/feedback.js';
import trailerFreightFeedBackControls from '@cogo/app-search/configurations/search/domestic/trailer/feedback.js';
import fclFeedBackControls from '@cogo/app-search/configurations/search/fcl/feedback.js';
import lclFeedBackControls from '@cogo/app-search/configurations/search/lcl/feedback.js';

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
