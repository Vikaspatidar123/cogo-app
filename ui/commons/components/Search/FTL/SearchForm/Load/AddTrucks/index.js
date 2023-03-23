import React, { forwardRef } from 'react';
import { Container } from './styles';
import Multitruck from './MultiTruck';

function AddTruck({ setLoadData, loadData, setShowPopover, location }, ref) {
	return (
		<Container>
			<Multitruck
				setLoadData={setLoadData}
				loadData={loadData}
				setShowPopover={setShowPopover}
				ref={ref}
				location={location}
			/>
		</Container>
	);
}

export default forwardRef(AddTruck);
