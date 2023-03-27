import { ToolTip } from '@cogoport/front/components';
import formatDate from '@cogo/globalization/utils/formatDate';
import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals.json';
import { IcMInfo } from '@cogoport/icons-react';
import { Container, Section, Label, Value, EmptyMsg } from './styles';

function ScheduleDetails({ list }) {
	return (
		<Container>
			{(list || []).map((item) => (
				<div className="card">
					<Section>
						<Label>ETD</Label>
						<Value>
							{item.departure
								? formatDate({
										date: item.departure,
										dateFormat: GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
										formatType: 'date',
								  })
								: '-'}
						</Value>
					</Section>

					<Section>
						<Label>ETA</Label>
						<Value>
							{item.arrival
								? formatDate({
										date: item.arrival,
										dateFormat: GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
										formatType: 'date',
								  })
								: '-'}
						</Value>
					</Section>
					<Section>
						<Label>Transit Time</Label>
						<Value>{`${item.transit_time} Days`}</Value>
					</Section>
					<Section>
						<Label>No of stops</Label>
						<Value className="blue">
							{item.number_of_stops === 0
								? 'Direct'
								: `${item.number_of_stops} stops`}
						</Value>
					</Section>

					<Section>
						<Label> Gate-in (cut off)</Label>
						<Value>{item.gate_in_cutoff ? item.gate_in_cutoff : '-'}</Value>
					</Section>

					<Section>
						<Label>Reliability Score</Label>
						<Value className="green">
							{item.reliability_score ? `${item.reliability_score} %` : '-'}
							<ToolTip
								placement="top"
								theme="light"
								content="Reliability score is calculated on the basis of accuracy of schedules"
							>
								<div>
									<IcMInfo width="16px" height="16px" fill="black" />
								</div>
							</ToolTip>
						</Value>
					</Section>
				</div>
			))}
			{list.length === 0 && <EmptyMsg>No Schedule Found</EmptyMsg>}
		</Container>
	);
}

export default ScheduleDetails;
