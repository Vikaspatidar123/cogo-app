import { IcCTick } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import { RightIcon, Right, Maping, Config } from '../constants';

import styles from './styles.module.css';

function SideStepper({ activeStepper }) {
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
			<div className={styles.wrapper}>
				{(Config || []).map((x) => (
					<div key={x?.step} className={styles.container}>
						<div className={styles.mobile_view}>
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
										? styles.line_active
										: styles.line}
								/>
							)}
						</div>
						<div className={styles.text_div}>
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
export default SideStepper;
