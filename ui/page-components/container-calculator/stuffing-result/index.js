import React, { useState } from 'react';

// import ArrowLeft from '../../../common/icons/arrow-left.svg';
import useCalaculation from '../hooks/useCalaculation';

import ChildComponent from './childComponent';
import styles from './styles.module.css';
import ThreedView from './ThreedView';

function StuffingResult({
	show, formValue, setShow, checked, checkedData,
}) {
	const [showModal, setShowModal] = useState(false);
	const { multipleContaionerData } = useCalaculation({ formValue, checked, checkedData });

	const handelGoBack = () => {
		setShow(false);
	};

	// const twentyFeetPercentage = `${((sumTotal / 33.13735) * 100).toFixed(2)}%`;
	// const fourtyFeetPercentage = `${((sumTotal / 67.566495) * 100).toFixed(2)}%`;
	// const fourtyFeetHighPercentage = `${((sumTotal / 76.33035) * 100).toFixed(2)}%`;
	// const containerWeight = quantity * sumWidth;
	// const handleModal = () => {};

	return (
		<>
			{show && (
				<>
					<div className={styles.back} onClick={() => handelGoBack()}>
						{/* <ArrowLeft style={{ margin: '-3px 10px' }} /> */}
						Stuffing Result
					</div>

					{multipleContaionerData.map((x) => (
						<ChildComponent x={x} />
					))}
				</>
			)}

			{showModal && <ThreedView isOpen={showModal} setShowModal={setShowModal} />}
		</>
	);
}

export default StuffingResult;
