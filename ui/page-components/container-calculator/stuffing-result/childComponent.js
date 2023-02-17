import React from 'react';

import styles from './styles.module.css';
// import LoadContainerIcon from '../../../common/icons/containerLoadedIcon.svg';
// import ContainerIcon from '../../../common/icons/loadingContainer.svg';

const mappign = {
	twentyFeet     : '20 Feet Container',
	fourtyFeet     : '40 Feet Container',
	fourtyHighCube : '40 High Feet Container',
};

function ChildComponent({ x = [] }) {
	return (
		<>
			{x.map((y) => (
				<div className={styles.main_container}>
					<div style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
						{(y.res || []).map((item) => (
							<div className={styles.card_container}>
								<div className={styles.container_image}>
									<div className={styles.text}>{mappign[item.containerFeet]}</div>
									{/* <ContainerIcon width="290" height="170" /> */}
									{/* <Button onClick={() => handleModal()}>3d view</Button> */}
								</div>
								<div className={styles.border} />
								<div className={styles.card_details}>
									<div className={styles.details}>
										<div
											style={{
												padding : '19px 30px 0px',
												display : 'flex',
											}}
										>
											Total
											<div style={{ marginLeft: '155px' }}>
												{item.packageCount}
												{' '}
												Packages
											</div>
										</div>
										<div
											style={{
												padding : '19px 30px 0px',
												display : 'flex',
											}}
										>
											Cargo Volume
											<div style={{ marginLeft: '96px' }}>
												{item.totalUsedVolume}
												m3 &nbsp; (
												{item.volumeUsedByContainer}
												{' '}
												of
												volume )
											</div>
										</div>
										<div
											style={{
												padding : '19px 30px 0px',
												display : 'flex',
											}}
										>
											Cargo Weight
											<div style={{ marginLeft: '100px' }}>
												{item.totalWeight}
												Kg &nbsp; (
												{`${((item.totalWeight / 28130) * 100).toFixed(
													2,
												)}% of max weight`}
												)
											</div>
										</div>
									</div>
									<div className={styles.vertical_border} />
									<div className={styles.header}>
										<div>Name</div>
										<div>Packages</div>
										<div>Volume</div>
										<div>Weight</div>
									</div>
									<div className={styles.header}>
										<div>{item.type}</div>
										<div>{item.packageCount}</div>
										<div>
											{item.totalUsedVolume}
											{' '}
											m3
										</div>
										<div>
											{item.packageCount * item.typeWeight}
											{' '}
											kg
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className={styles.side_container}>
						<div className={styles.text}>{mappign[y.containerName]}</div>
						{/* <LoadContainerIcon width="300" height="110" /> */}
						<div className={styles.vertical_border} />
						<div style={{ display: 'flex' }}>
							<div className={styles.unit}>
								{y.res.length}
										&nbsp;Units
							</div>
							<div className={styles.border} />
							<div className={styles.total_count}>
								<div style={{ display: 'flex' }}>
									<div className={styles.count}>Weight</div>
									<div className={styles.count}>
										{y.totalWeight}
										.00 kg
									</div>
								</div>
								<div className={styles.vertical_border} />
								<div style={{ display: 'flex' }}>
									<div className={styles.count}>Volume</div>
									<div className={styles.count}>
										{y.totalVolume}
										.00 m3
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	);
}

export default ChildComponent;
