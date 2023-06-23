import LoaderCard from './LoaderCard';

function ListLoader() {
	return (
		<div>
			{[...Array(3)].map(() => (
				<LoaderCard />
			))}
		</div>
	);
}

export default ListLoader;
