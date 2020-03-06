import React from 'react';
import { Form } from '../utils/forms';
import { render } from '@testing-library/react';
import ThemeProvider from '@tpr/theming';
import { FormRenderProps } from 'react-final-form';
import '@testing-library/jest-dom/extend-expect';

type FormProviderProps = {
	onSubmit?: any;
	render?: any;
	initialValues?: any;
	validate?: any;
};
const FormProvider: React.FC<FormProviderProps> = ({
	onSubmit = () => {},
	initialValues,
	children,
	validate,
}) => (
	<ThemeProvider>
		<Form onSubmit={onSubmit} validate={validate} initialValues={initialValues}>
			{children}
		</Form>
	</ThemeProvider>
);

export function formSetup({
	render: renderFn = () => <div />,
	onSubmit,
	initialValues = {},
	validate,
}: FormProviderProps) {
	let renderArg: FormRenderProps;
	const childrenSpy = jest.fn(controllerArg => {
		renderArg = controllerArg;
		return (
			<form onSubmit={controllerArg.handleSubmit}>
				{renderFn}
				<button type="submit">Submit</button>
			</form>
		);
	});

	const utils = render(
		<FormProvider
			onSubmit={onSubmit}
			validate={validate}
			initialValues={initialValues}
		>
			{childrenSpy}
		</FormProvider>,
	);

	return { ...renderArg, ...utils };
}
