import React from 'react';
import { DivFlex, DivRow, Dot, Label, Line } from '../../style';

const STEPPER = [
	{
		key: 'description',
		title: 'Description',
	},
	{
		key: 'section',
		title: 'Section',
	},
	{
		key: 'chapter',
		title: 'Chapter',
	},
	{
		key: 'hsCode',
		title: 'HS Code',
	},
];

const Stepper = ({ activeStepper }) => {
	return (
		<>
			<DivRow>
				{STEPPER?.map(({ key = '', title = '' }) => (
					<div key={key}>
						<DivFlex>
							<Dot color={activeStepper[key]} />
							{key !== 'hsCode' && <Line color={activeStepper[key]} />}
						</DivFlex>
						<Label color={activeStepper[key]}>{title}</Label>
					</div>
				))}
			</DivRow>
		</>
	);
};

export default Stepper;
