import { useState, useRef, forwardRef } from 'react';

import data from '../../../data';

import Body from './Body';
import Header from './Header';
import Title from './Title';

export const SCROLL_VALUE = 220;
function Table({ props }) {
	const scrollRef = useRef({});

	const { service_wise_data } = data || {};
	const services = Object.keys(service_wise_data);

	const scrollHandler = () => {
		console.log('hehrer');
		// scrollRef.current.header.scrollLeft += SCROLL_VALUE;
		// scrollRef.current.body.scrollLeft += SCROLL_VALUE;
		scrollRef.current.scrollLeft += SCROLL_VALUE;
	};

	console.log(scrollRef, 'scrollRef');

	return (
		<div>
			{services.map((item) => {
				const info = service_wise_data?.[item];
				const header = info?.header;
				const values = info?.value;
				return (
					<div>
						<Title serviceName={item} values={values} props={props} />
						<Header
							header={header}
							values={values}
							scrollHandler={scrollHandler}
							// ref={scrollRef}
							ref={(r) => {
								scrollRef.current = r;
							}}
						/>
						<Body
							values={values}
							header={header}
							ref={scrollRef}
							// ref={(r) => {
							// 	scrollRef.current.body = r;
							// }}
						/>
					</div>
				);
			})}

		</div>
	);
}

export default forwardRef(Table);
