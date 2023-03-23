// import { Placeholder } from '@cogoport/components';

// function Route({ originDetails, destinationDetails, index, loading }) {
// 	function LocationCard({
// 		name,
// 		port_code: portCode,
// 		display_name: displayName,
// 	}) {
// 		return (
// 			<Location>
// 				{loading ? (
// 					<Placeholder width="150px" height="37px" />
// 				) : (
// 					<>
// 						<Name>
// 							<Port>{name}</Port>
// 							<Code>
// 								(
// 								{portCode}
// 								)
// 							</Code>
// 						</Name>
// 						<Country>{(displayName || '').split(',')[2]}</Country>
// 					</>
// 				)}
// 			</Location>
// 		);
// 	}

// 	return (
// 		<Container>
// 			<Index>{index + 1}</Index>
// 			<LocationCard {...originDetails} />
// 			<StyledArrow />
// 			<LocationCard {...destinationDetails} />
// 		</Container>
// 	);
// }

// export default Route;
