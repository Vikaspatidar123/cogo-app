import Premium from '../asset/premium.svg';
import Standard from '../asset/standard.svg';

const logoMapping = () => {
	const Mapping = {
		1 : <Standard height={40} width={40} />,
		2 : <Premium height={40} width={40} />,
	};
	return Mapping;
};
export default logoMapping;
