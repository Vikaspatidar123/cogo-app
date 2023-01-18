import RejectedIcon from '../../../icons/rejected-icon.svg';
import PendingIcon from '../../../icons/pending-icon.svg';
import IncompleteIcon from '../../../icons/incomplete-icon.svg';
import {
	IncompleteTag,
	PendingTag,
	RejectedTag,
	VerifiedTag,
} from '../../styles';
import VerifiedIcon from '../../../icons/verified-icon.svg';

const TAG_COMPONENT_MAPPING = {
	verified: (
		<VerifiedTag>
			<VerifiedIcon style={{ width: 12, height: 12, marginRight: 8 }} />
			Verified
		</VerifiedTag>
	),
	rejected: (
		<RejectedTag>
			<RejectedIcon style={{ width: 12, height: 12, marginRight: 8 }} />
			Rejected
		</RejectedTag>
	),
	pending: (
		<PendingTag>
			<PendingIcon style={{ width: 12, height: 12, marginRight: 8 }} />
			Pending verification
		</PendingTag>
	),
	incomplete: (
		<IncompleteTag>
			<IncompleteIcon style={{ width: 12, height: 12, marginRight: 8 }} />
			Incomplete
		</IncompleteTag>
	),
};

export default TAG_COMPONENT_MAPPING;
