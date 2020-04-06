import React from 'react';
import { Flex } from '../../../layout';
import { P } from '../../../typography';
import { useTrusteeContext } from '../../context';
import { Footer } from '../../components/card';
import { Toolbar } from '../../components/card';
import { Form, FFRadioButton } from '@tpr/forms';

const Type: React.FC = () => {
	const { current, send, onSave } = useTrusteeContext();
	const state = current.context;

	function onSubmit(values) {
		const professional = values.professional === 'yes' ? true : false;
		send('SAVE', {
			values: {
				...values,
				professional,
			},
		});
		onSave({
			...state,
			...values,
			professional,
		});
	}

	return (
		<Flex flex="1 1 auto" flexDirection="column">
			<Flex flexDirection="column">
				<Toolbar title="Type of trustee" />
				<Form
					onSubmit={onSubmit}
					initialValues={{
						trusteeType: state.trusteeType,
						professional: state.professional ? 'yes' : 'no',
					}}
				>
					{({ handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							<Flex flexDirection="column">
								<P mb={0} fontWeight={3}>
									Select the option that best describes the type of trustee.
								</P>
								<FFRadioButton
									name="trusteeType"
									type="radio"
									value="member-nominated"
									label="Member-nominated trustee"
								/>
								<FFRadioButton
									name="trusteeType"
									type="radio"
									value="employer-appointed"
									label="Employer-appointed trustee"
								/>
								<FFRadioButton
									name="trusteeType"
									type="radio"
									value="regulator-appointed"
									label="Regulator-appointed trustee"
								/>
							</Flex>
							<P my={0} fontWeight={3}>
								Is this individual a professional trustee?
							</P>
							<Flex>
								<FFRadioButton
									name="professional"
									type="radio"
									value="yes"
									label="Yes"
								/>
								<FFRadioButton
									name="professional"
									type="radio"
									value="no"
									label="No"
								/>
							</Flex>
							<Footer
								onSave={{
									type: 'submit',
									title: 'Save and close',
								}}
							/>
						</form>
					)}
				</Form>
			</Flex>
		</Flex>
	);
};

export default Type;
