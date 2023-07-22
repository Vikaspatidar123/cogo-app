import CheckKyc from './CheckKyc';
import PayLater from './PayLater';
import ProfileCompleted from './ProfileCompleted';
import Promotion from './Promotion';

function RightSection() {
	return (
		<div>
			{/* <ProfileCompleted /> */}
			<CheckKyc />
			<PayLater />
			<Promotion />
		</div>
	);
}
export default RightSection;
