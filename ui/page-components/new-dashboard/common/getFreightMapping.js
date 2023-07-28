import {
	IcCFlcl,
	IcMShip,
	IcCLcl,
	IcCAir,
	IcMAirport,
	IcMTrailorFull,
	IcCFcl,
	IcAAirflight,
} from '@cogoport/icons-react';

const getFreightMapping = () => ({
	lcl_freight: {
		name          : 'LCL',
		icon          : <IcCFlcl width={22} height={22} />,
		freightLogo   : <IcCLcl style={{ marginRight: '12.8px', marginTop: '8px' }} />,
		secondaryIcon : <IcMShip style={{ width: '15px', marginRight: '10px' }} />,
	},
	fcl_freight: {
		name          : 'FCL',
		icon          : <IcMShip width={18} height={18} fill="white" />,
		bgColor       : '#356EFD',
		freightLogo   : <IcCFcl width={18} height={18} />,
		secondaryIcon : <IcMShip style={{ width: '15px', marginRight: '10px' }} />,
	},
	air_freight: {
		name        : 'AIR',
		icon        : <IcAAirflight width={22} height={22} />,
		bgColor     : '#EF9B9B',
		freightLogo : (
			<IcCAir
				style={{
					width       : '22px',
					height      : '22px',
					marginRight : '12.8px',
					marginTop   : '8px',
				}}
			/>
		),
		secondaryIcon: <IcMAirport style={{ width: '15px', marginRight: '10px' }} />,
	},
	trailer_freight: {
		name        : 'Trailer',
		icon        : <IcMTrailorFull width={22} height={22} />,
		bgColor     : '#EAEAEA',
		freightLogo : (
			<IcMTrailorFull
				width={22}
				height={22}
				style={{
					marginRight : '12.8px',
					marginTop   : '8px',
				}}
			/>
		),
		secondaryIcon: <IcMTrailorFull style={{ width: '15px', marginRight: '10px' }} />,
	},
	ltl_freight: {
		name        : 'LTL',
		icon        : <IcMTrailorFull width={22} height={22} />,
		bgColor     : '#EAEAEA',
		freightLogo : (
			<IcMTrailorFull
				style={{
					width       : '22px',
					height      : '22px',
					marginRight : '12.8px',
					marginTop   : '8px',
				}}
			/>
		),
		secondaryIcon: <IcMTrailorFull style={{ width: '15px', marginRight: '10px' }} />,
	},
	ftl_freight: {
		name        : 'FTL',
		icon        : <IcMTrailorFull width={22} height={22} style={{ marginRight: '10px' }} />,
		bgColor     : '#EAEAEA',
		freightLogo : (
			<IcMTrailorFull
				style={{
					width       : '22px',
					height      : '22px',
					marginRight : '12.8px',
					marginTop   : '8px',
				}}
			/>
		),
		secondaryIcon: <IcMTrailorFull style={{ width: '15px', marginRight: '10px' }} />,
	},
	haulage_freight: {
		name        : 'Haulage',
		icon        : <IcMTrailorFull width={22} height={22} />,
		bgColor     : '#EAEAEA',
		freightLogo : (
			<IcMTrailorFull
				style={{
					width       : '22px',
					height      : '22px',
					marginRight : '12.8px',
					marginTop   : '8px',
				}}
			/>
		),
		secondaryIcon: <IcMTrailorFull style={{ width: '15px', marginRight: '10px' }} />,
	},
	fcl_customs: {
		name          : 'FCL Customs',
		icon          : <IcMShip width={22} height={22} fill="white" />,
		bgColor       : '#356EFD',
		freightLogo   : <IcCFcl style={{ width: '21px', marginRight: '.12.8px', marginTop: '8px' }} />,
		secondaryIcon : <IcMShip width={15} style={{ marginRight: '10px' }} />,
	},
	fcl_cfs: {
		name          : 'FCL CFS',
		icon          : <IcMShip width={22} height={22} fill="white" />,
		bgColor       : '#356EFD',
		freightLogo   : <IcCFcl style={{ width: '21px', marginRight: '12.8px', marginTop: '8px' }} />,
		secondaryIcon : <IcMShip style={{ width: '15px', marginRight: '10px' }} />,
	},
	lcl_customs: {
		name          : 'LCL Customs',
		icon          : <IcCFlcl width={22} height={22} />,
		freightLogo   : <IcCLcl style={{ marginRight: '.12.8px', marginTop: '8px' }} />,
		secondaryIcon : <IcMShip style={{ width: '15px', marginRight: '10px' }} />,
	},
	air_customs: {
		name          : 'AIR Customs',
		icon          : <IcAAirflight width={22} height={22} fill="#EF9B9B" />,
		bgColor       : '#EF9B9B',
		freightLogo   : <IcCAir />,
		secondaryIcon : <IcMAirport style={{ width: '15px', marginRight: '10px' }} />,
	},
});
export default getFreightMapping;
