import { Popover, Button } from '@cogoport/components';
import { useState } from 'react';

import ContainerInfo from '../CargoDetailPills';

import styles from './styles.module.css';

function MultiServiceDetails({
	children,
	mainServices,
	renderBody: renderBodyProp = null,
	showSingle = false,
	placement = null,
	withButton = true,
}) {
	const [show, setShow] = useState(false);

	if (mainServices?.length <= 1 && !showSingle) {
		return null;
	}

	const renderBody = () => (
		<div>
			{mainServices?.map((item) => (
				<div className={styles.service}>
					<ContainerInfo detail={item} className="details" />
				</div>
			))}
		</div>
	);

	return (
		<Popover
			theme="light"
			show={show}
			placement={placement || 'bottom'}
			interactive
			onOuterClick={() => setShow(false)}
			trigger="mouseenter"
			content={renderBodyProp ? renderBodyProp() : renderBody()}
		>
			{withButton ? (
				<Button
					style={{
						background : 'none',
						padding    : 2,
						color      : '#366EFD',
						border     : 'none',
						height     : 'auto',
					}}
					onClick={() => setShow(false)}
				>
					{children}
				</Button>
			) : (
				<div>{children}</div>
			)}
		</Popover>
	);
}
export default MultiServiceDetails;
