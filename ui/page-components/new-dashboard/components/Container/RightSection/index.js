import CheckKyc from './CheckKyc';
import PayLater from './PayLater';
import ProfileCompleted from './ProfileCompleted';

function RightSection() {
	return (
		<div>
			<ProfileCompleted />
			<CheckKyc />
			<PayLater />
		</div>
	);
}
export default RightSection;
