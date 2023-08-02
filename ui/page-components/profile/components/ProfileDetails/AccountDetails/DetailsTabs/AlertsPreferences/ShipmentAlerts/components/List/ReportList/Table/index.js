import { useRef, forwardRef } from 'react';

import data from '../../../data';

import Body from './Body';
import Header from './Header';
import Title from './Title';

export const SCROLL_VALUE = 220;

function Table({ props }) {
	const scrollRef = useRef({ header: {}, body: {} });

	const { service_wise_data } = data || {};

	const services = Object.keys(service_wise_data);

	const scrollHandlerLeft = (index) => () => {
		if (scrollRef.current.header[index]) {
			scrollRef.current.header[index].scrollLeft += SCROLL_VALUE;

			Object.keys(scrollRef.current.body[index]).forEach((ele) => {
				scrollRef.current.body[index][ele].scrollLeft += SCROLL_VALUE;
			});
		}
	};
	const scrollHandlerRight = (index) => () => {
		if (scrollRef.current.header[index]) {
			scrollRef.current.header[index].scrollLeft -= SCROLL_VALUE;

			Object.keys(scrollRef.current.body[index]).forEach((ele) => {
				scrollRef.current.body[index][ele].scrollLeft -= SCROLL_VALUE;
			});
		}
	};

	return (
		<div>
			{(services || []).map((item, index) => {
				const info = service_wise_data?.[item];
				const { header, value, options } = info || {};

				return (
					<div key={`${index + 1}`}>
						<Title serviceName={item} options={options} props={props} />
						<Header
							header={header}
							values={value}
							serviceName={item}
							scrollHandler={scrollHandlerLeft(index)}
							scrollHandlerRight={scrollHandlerRight(index)}
							props={props}
							ref={(r) => {
								scrollRef.current.header[index] = r;
							}}
						/>
						<Body
							values={value}
							header={header}
							index={index}
							ref={scrollRef}
							props={props}
						/>
					</div>
				);
			})}

		</div>
	);
}

export default forwardRef(Table);
