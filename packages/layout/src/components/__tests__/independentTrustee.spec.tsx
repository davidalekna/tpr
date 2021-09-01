import React from 'react';
import { render } from '@testing-library/react';
import { IndependentTrusteeCard } from '../cards/independentTrustee/independentTrustee';
import { IndependentTrustee } from '../cards/independentTrustee/context';
import { axe } from 'jest-axe';
import { cleanup } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import {
	assertThatASectionExistsWithAnAriaLabel,
	assertThatButtonHasAriaExpanded,
} from '../testHelpers/testHelpers';

const noop = () => Promise.resolve();

const independentTrustee: IndependentTrustee = {
	id: '',
	schemeRoleId: 222,
	effectiveDate: '',
	organisationName: 'Pensions Are Us Limited',
	appointedByRegulator: true,
	address: {
		addressLine1: 'The Pensions Regulator',
		addressLine2: 'Napier House',
		addressLine3: 'Trafalgar Pl',
		postTown: 'Brighton',
		postcode: 'BN1 4DW',
		county: 'East Sussex',
		country: 'UK',
		countryId: 2,
	},
};

describe('Professional / Independent Trustee Card', () => {
	describe('Preview', () => {
		let component,
			findByText,
			findAllByText,
			findByTitle,
			findByRole,
			findByTestId,
			findAllByTestId;
		beforeEach(() => {
			const {
				container,
				getByText,
				getAllByText,
				queryByTitle,
				getByRole,
				getByTestId,
				getAllByTestId,
			} = render(
				<IndependentTrusteeCard
					independentTrustee={independentTrustee}
					complete={true}
					onCorrect={() => {}}
					onRemove={noop}
					onSaveAppointed={noop}
				/>,
			);

			component = container;
			findByText = getByText;
			findAllByText = getAllByText;
			findByTitle = queryByTitle;
			findByRole = getByRole;
			findByTestId = getByTestId;
			findAllByTestId = getAllByTestId;
		});

		test('no Violations', async () => {
			const results = await axe(component);
			expect(results).toHaveNoViolations();
		});

		test('it renders sections correctly', () => {
			expect(component.querySelector('button')).not.toBe(null);

			expect(findByText('Corporate Trustee')).toBeDefined();
			expect(findByTestId('card-main-heading')).toBeDefined();

			expect(findByText('Remove')).toBeDefined();
			expect(findByTestId('card-not-heading')).toBeDefined();

			const h4Headings = findAllByTestId('card-heading');
			expect(h4Headings).toBeDefined();
			expect(h4Headings.length).toBe(1);
			expect(h4Headings[0]).toHaveTextContent('Address');

			const h4Buttons = findAllByTestId('card-heading-button');
			expect(h4Buttons).toBeDefined();
			expect(h4Buttons.length).toBe(1);
			expect(h4Buttons[0]).toHaveTextContent('Appointed by the regulator');
			assertThatButtonHasAriaExpanded(
				findByText,
				'Appointed by the regulator',
				false,
			);
		});

		test('initial status is correct', () => {
			expect(findAllByText('Confirmed').length).toEqual(1);
			expect(findByTitle('Confirmed')).toBeDefined();
		});

		test('Organisation block displays values correctly', () => {
			expect(findByText('Pensions Are Us Limited')).toBeDefined();
			expect(findByText('Professional / Independent Trustee')).toBeDefined();
		});

		test('Address block displays values correctly', () => {
			const addressPreview = findByTestId('address-preview');
			const addressExpected = `${independentTrustee.address.addressLine1}<br>${independentTrustee.address.addressLine2}<br>${independentTrustee.address.addressLine3}<br>${independentTrustee.address.postTown}<br>${independentTrustee.address.county}<br>${independentTrustee.address.postcode}<br>${independentTrustee.address.country}`;
			expect(addressPreview).toBeDefined();
			expect(addressPreview.innerHTML).toEqual(addressExpected);
		});

		test('Appointed by the regulator block displays value correctly', () => {
			expect(findByText('Yes')).toBeDefined();
		});

		test('renders with a section containing an aria label', () => {
			assertThatASectionExistsWithAnAriaLabel(
				findByRole,
				`${independentTrustee.organisationName} Professional / Independent Trustee`,
			);
		});

		test('replaces __NAME__ in the checkbox label', () => {
			expect(
				findByText(
					`Confirm '${independentTrustee.organisationName}' is correct.`,
				),
			).toBeDefined();
		});
	});

	describe('editing Appointed by the regulator', () => {
		let component, findByText, findByTestId;
		beforeEach(async () => {
			const { container, getByText, getByTestId } = render(
				<IndependentTrusteeCard
					independentTrustee={independentTrustee}
					complete={true}
					onCorrect={() => {}}
					onRemove={noop}
					onSaveAppointed={noop}
				/>,
			);

			component = container;
			findByText = getByText;
			findByTestId = getByTestId;

			findByText('Appointed by the regulator').click();
			const results = await axe(component);
			expect(results).toHaveNoViolations();
		});

		test('indicating if trustee was appointed by the regulator', () => {
			expect(findByTestId('independent-regulator-form')).not.toBe(null);
			expect(
				findByText(
					'Was this trustee appointed to this scheme by the regulator?',
				),
			).toBeDefined();
			expect(findByText('Yes')).toBeDefined();
			expect(findByText('No')).toBeDefined();
			expect(findByText('Save and close')).toBeDefined();
		});
	});

	describe('Remove Corporate Group Trustee', () => {
		let component, findByText, findByTestId;
		beforeEach(async () => {
			const { container, getByText, getByTestId } = render(
				<IndependentTrusteeCard
					independentTrustee={independentTrustee}
					complete={true}
					onCorrect={() => {}}
					onRemove={noop}
					onSaveAppointed={noop}
				/>,
			);

			component = container;
			findByText = getByText;
			findByTestId = getByTestId;

			findByText('Remove').click();
			const results = await axe(component);
			expect(results).toHaveNoViolations();
		});

		afterEach(() => {
			cleanup();
		});

		test('remove Independent Trustee - reason', () => {
			expect(findByTestId('remove-trustee-form')).not.toBe(null);
			expect(findByText('Remove this trustee')).toBeDefined();
			expect(findByText('Why are you removing this trustee?')).toBeDefined();
			expect(findByText('They have left the scheme')).toBeDefined();
			expect(findByText('They were never part of the scheme.')).toBeDefined();
			expect(findByText('Continue')).toBeDefined();
		});

		test('remove Independent Trustee - confirm', async () => {
			await act(async () => {
				findByText('They were never part of the scheme.').click();
				const results = await axe(component);
				expect(results).toHaveNoViolations();
			});

			await act(async () => {
				findByText('Continue').click();
				const results = await axe(component);
				expect(results).toHaveNoViolations();
				expect(
					findByText('Are you sure you want to remove this trustee?'),
				).toBeDefined();
				expect(findByText("This can't be undone.")).toBeDefined();
				expect(findByText('Remove Trustee')).toBeDefined();
				expect(findByText('Cancel')).toBeDefined();
			});

			// Removed => confirmation banner
			await act(async () => {
				findByText('Remove Trustee').click();
				const results = await axe(component);
				expect(results).toHaveNoViolations();
				expect(
					findByText('Professional / Independent Trustee removed successfully'),
				).toBeDefined();
			});
		});
	});
});
