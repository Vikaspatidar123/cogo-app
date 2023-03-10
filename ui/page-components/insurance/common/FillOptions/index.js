import { IcCTick } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import { RightIcon, Right, Maping, Config } from '../constants';

// import {
// 	Container,
// 	Dot,
// 	Line,
// 	Div,
// 	Main,
// 	Heading,
// 	Text,
// 	TextDiv,
// 	Count,
// 	Image,
// 	Wrapper,
// 	NumberWrapper,
// } from './styles';

import styles from './styles.module.css';

function FillOptaions({ activeStepper, isMobile }) {
	const [url, setUrl] = useState();
	useEffect(() => {
		setTimeout(
			() => {
				setUrl(Right);
			},
			2000,
			setUrl(RightIcon),
		);
	}, [activeStepper]);
	return (
		<div className={styles.main}>
			<div className={styles.heading}>Easy steps for Insurance</div>
			<div className={isMobile ? styles.wrapper_mobile : styles.wrapper}>
				{(Config || []).map((x) => (
					<div key={x?.step} className={isMobile ? styles.container_mobile : styles.container}>
						<div className={isMobile && styles.mobile_view}>
							{activeStepper.svg !== x.step ? (
								<div
									className={x.active || Maping[activeStepper[x.step]] !== 'Pending'
										? styles[`dot_active_${activeStepper[x.step]}`]
										: styles[`dot_${activeStepper[x.step]}`]}
								>
									<div className={styles.count}>
										{Maping[activeStepper[x.step]] === 'Completed' ? (
											<IcCTick height={30} width={30} />
										) : (
											x.step
										)}
									</div>
								</div>
							) : (
								<img className={styles.image} src={url} alt="" />
							)}
							{x.step !== 3 && (
								<div
									className={Maping[activeStepper[x.step]] === 'Completed'
										? `${isMobile ? styles.line_mobile_active : styles.line_active}`
										: `${isMobile ? styles.line_mobile : styles.line}`}
								/>
							)}
						</div>
						<div className={isMobile ? styles.text_div_mobile : styles.text_div}>
							<div>
								<div className={Maping[activeStepper[x.step]] === 'Completed'
									? styles.text_active
									: styles.text}
								>
									{x.details}
								</div>
								<div className={`div_${activeStepper[x.step]}`}>
									{Maping[activeStepper[x.step]]}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
export default FillOptaions;
