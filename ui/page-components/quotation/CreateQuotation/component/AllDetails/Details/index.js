import ContainerDetails from './ContainerDetails';
import PackageDetails from './PackageDetails';

function Details({ transportMode = 'AIR' }) {
	return (
		<>
			{ transportMode === 'OCEAN' && <ContainerDetails />}
			{transportMode === 'AIR' && <PackageDetails />}
		</>

	);
}

export default Details;
