import EnquiryAppCard from './EnquiryAppCard';

function EnquiryCard({ detail = {} }) {
	const notShowFtlEnq = detail?.rates_count > 0
        && ['ftl_freight', 'ltl_freight'].includes(detail?.search_type);

	return !notShowFtlEnq && <EnquiryAppCard />;
}

export default EnquiryCard;
