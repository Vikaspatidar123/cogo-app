import {
	IcCFlcl,
	IcMShip,
	IcCLcl,
	IcCAir,
	IcMAirport,
	IcMTrailorFull,
	IcCBookmark,
} from '@cogoport/icons-react';

const getFreightMapping = () => ({
	lcl_freight: {
		name        : 'LCL',
		icon        : <IcCFlcl style={{ width: '25px', height: '25px' }} />,
		freightLogo : (
			<IcCLcl style={{ marginRight: '.8rem', marginTop: '0.5rem' }} />
		),
		secondaryIcon: <IcMShip style={{ width: '15px', marginRight: '10px' }} />,
	},
	fcl_freight: {
		name        : 'FCL',
		icon        : <IcMShip style={{ width: '18px', height: '18px' }} fill="white" />,
		bgColor     : '#356EFD',
		freightLogo : (
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/containerIcon_new.svg"
				alt="container"
				style={{ width: '21px', marginRight: '.8rem', marginTop: '0.5rem' }}
			/>
		),
		secondaryIcon: <IcMShip style={{ width: '15px', marginRight: '10px' }} />,
	},
	air_freight: {
		name        : 'AIR',
		icon        : <IcCBookmark fill="#EF9B9B" />,
		bgColor     : '#EF9B9B',
		freightLogo : (
			<IcCAir
				style={{
					width       : '22px',
					height      : '22px',
					marginRight : '.8rem',
					marginTop   : '0.5rem',
				}}
			/>
		),
		secondaryIcon: (
			<IcMAirport style={{ width: '15px', marginRight: '10px' }} />
		),
	},
	trailer_freight: {
		name : 'Trailer',
		icon : (
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/truck_new.svg"
				alt="truck Icon"
				style={{ width: '20px', height: '20px' }}
			/>
		),

		bgColor     : '#EAEAEA',
		freightLogo : (
			<IcMTrailorFull
				style={{
					width       : '22px',
					height      : '22px',
					marginRight : '.8rem',
					marginTop   : '0.5rem',
				}}
			/>
		),
		secondaryIcon: (
			<IcMTrailorFull style={{ width: '15px', marginRight: '10px' }} />
		),
	},
	ltl_freight: {
		name : 'LTL',
		icon : (
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/truck_new.svg"
				alt="truck Icon"
				style={{ width: '18px', height: '18px' }}
			/>
		),
		bgColor     : '#EAEAEA',
		freightLogo : (
			<IcMTrailorFull
				style={{
					width       : '22px',
					height      : '22px',
					marginRight : '.8rem',
					marginTop   : '0.5rem',
				}}
			/>
		),
		secondaryIcon: (
			<IcMTrailorFull style={{ width: '15px', marginRight: '10px' }} />
		),
	},
	ftl_freight: {
		name : 'FTL',
		icon : (
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/truck_new.svg"
				alt="truck Icon"
				style={{ width: '18px', height: '18px' }}
			/>
		),
		bgColor     : '#EAEAEA',
		freightLogo : (
			<IcMTrailorFull
				style={{
					width       : '22px',
					height      : '22px',
					marginRight : '.8rem',
					marginTop   : '0.5rem',
				}}
			/>
		),
		secondaryIcon: (
			<IcMTrailorFull style={{ width: '15px', marginRight: '10px' }} />
		),
	},
	haulage_freight: {
		name : 'Haulage',
		icon : (
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/truck_new.svg"
				alt="truck Icon"
				style={{ width: '18px', height: '18px' }}
			/>
		),
		bgColor     : '#EAEAEA',
		freightLogo : (
			<IcMTrailorFull
				style={{
					width       : '22px',
					height      : '22px',
					marginRight : '.8rem',
					marginTop   : '0.5rem',
				}}
			/>
		),
		secondaryIcon: (
			<IcMTrailorFull style={{ width: '15px', marginRight: '10px' }} />
		),
	},
	fcl_customs: {
		name        : 'FCL Customs',
		icon        : <IcMShip style={{ width: '18px', height: '18px' }} fill="white" />,
		bgColor     : '#356EFD',
		freightLogo : (
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/containerIcon_new.svg"
				alt="container"
				style={{ width: '21px', marginRight: '.8rem', marginTop: '0.5rem' }}
			/>
		),
		secondaryIcon: <IcMShip style={{ width: '15px', marginRight: '10px' }} />,
	},
	fcl_cfs: {
		name        : 'FCL CFS',
		icon        : <IcMShip style={{ width: '18px', height: '18px' }} fill="white" />,
		bgColor     : '#356EFD',
		freightLogo : (
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/containerIcon_new.svg"
				alt="container"
				style={{ width: '21px', marginRight: '.8rem', marginTop: '0.5rem' }}
			/>
		),
		secondaryIcon: <IcMShip style={{ width: '15px', marginRight: '10px' }} />,
	},
	lcl_customs: {
		name        : 'LCL Customs',
		icon        : <IcCFlcl style={{ width: '25px', height: '25px' }} />,
		freightLogo : (
			<IcCLcl style={{ marginRight: '.8rem', marginTop: '0.5rem' }} />
		),
		secondaryIcon: <IcMShip style={{ width: '15px', marginRight: '10px' }} />,
	},
	air_customs: {
		name          : 'AIR Customs',
		icon          : <IcCBookmark fill="#EF9B9B" />,
		bgColor       : '#EF9B9B',
		freightLogo   : <IcCAir />,
		secondaryIcon : (
			<IcMAirport style={{ width: '15px', marginRight: '10px' }} />
		),
	},
});
export default getFreightMapping;
