import React, { useState } from 'react';
import { FieldProps } from '@tpr/forms';
import { useTrusteeContext } from '../../context';
import { TrusteeI18nProps } from '../../i18n';
import {
	RecursivePartial,
	cardType,
	cardTypeName,
} from '../../../common/interfaces';
import NameForm from '../../../common/views/nameForm/nameForm';

const getFields = (
	fields: RecursivePartial<TrusteeI18nProps['name']['fields']>,
): FieldProps[] => [
	{
		name: 'title',
		type: 'text',
		label: fields.title.label,
		inputWidth: 1,
		cfg: { mb: 4 },
	},
	{
		name: 'firstname',
		type: 'text',
		label: fields.firstName.label,
		error: fields.firstName.error,
		inputWidth: 6,
		cfg: { mb: 4 },
	},
	{
		name: 'lastname',
		type: 'text',
		label: fields.lastName.label,
		error: fields.lastName.error,
		inputWidth: 6,
	},
];

const Name: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const { current, send, i18n } = useTrusteeContext();
	const fields = getFields(i18n.name.fields);
	const state = current.context.trustee;

	const onSubmit = (values) => {
		setLoading(true);
		try {
			send('NEXT', { values });
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	return (
		<NameForm
			type={cardType.inHouseAdmin}
			typeName={cardTypeName.inHouseAdmin}
			onSubmit={onSubmit}
			fields={fields}
			initialValues={{
				title: state.title,
				firstname: state.firstname,
				lastname: state.lastname,
			}}
			loading={loading}
			nextStep={true}
		/>
	);
	// return (
	// 	<Content type={cardType.trustee} title="Name of the trustee">
	// 		<Form
	// 			onSubmit={onSubmit}
	// 			validate={validate(fields)}
	// 			initialValues={{
	// 				title: state.title,
	// 				firstname: state.firstname,
	// 				lastname: state.lastname,
	// 			}}
	// 		>
	// 			{({ handleSubmit }) => (
	// 				<form onSubmit={handleSubmit}>
	// 					{renderFields(fields)}
	// 					<Footer>
	// 						<ArrowButton
	// 							intent="special"
	// 							pointsTo="right"
	// 							iconSide="right"
	// 							type="submit"
	// 							title="Continue"
	// 						/>
	// 					</Footer>
	// 				</form>
	// 			)}
	// 		</Form>
	// 	</Content>
	// );
};

export default Name;
