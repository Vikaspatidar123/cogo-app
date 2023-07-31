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

	return (
		<div>
			{services.map((item) => {
				const info = service_wise_data?.[item];
				const { header, value, options } = info || {};

				return (
					<div>
						<Title serviceName={item} options={options} props={props} />
						<Header
							header={header}
							values={value}
							scrollHandler={scrollHandler}
							// ref={scrollRef}
							ref={(r) => {
								scrollRef.current = r;
							}}
						/>
						<Body
							values={value}
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
