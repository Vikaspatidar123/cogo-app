import React from 'react';

const FilledForm = ({ message }) => (
	<div title="Survey">
		{message.fields.map(({ id, label, answer, type }) => (
			<p key={id}>
				{type === 'radio' ? (
					<span>
						<b>{label} </b> {answer.label}{' '}
					</span>
				) : (
					<span>
						<b>{label}</b> {answer}
					</span>
				)}
			</p>
		))}
	</div>
);

export default FilledForm;
