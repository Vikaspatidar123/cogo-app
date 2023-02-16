// import LoadingBtn from '../../../../common/icons/loading.svg';

import { LoaderContainer } from './styles';

function Loader() {
	return (
		<LoaderContainer>
			<LoadingBtn className="cogoloader" />
			<div className="modal" />
		</LoaderContainer>
	);
}

export default Loader;
