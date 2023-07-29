import data from '../../../data';

import Body from './Body';
import Header from './Header';
import Title from './Title';

function Table() {
	const { service_wise_data } = data || {};
	const services = Object.keys(service_wise_data);
	return (
		<div>
			{services.map((item) => {
				const info = service_wise_data?.[item];
				const header = info?.header;
				const values = info?.value;
				return (
					<div>
						<Title serviceName={item} values={values} />
						<Header header={header} values={values} />
						<Body values={values} header={header} />
					</div>
				);
			})}

		</div>
	);
}

export default Table;
