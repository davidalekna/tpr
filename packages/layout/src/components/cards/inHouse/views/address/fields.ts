import { FieldProps } from '@tpr/forms';
import { InHouseAdminI18nProps } from '../../i18n';
import { RecursivePartial } from '../../context';

function validPostcode(postcode: string) {
	const PC = postcode.replace(/\s/g, '');
	const regex = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
	return regex.test(PC);
}

export const getFields = (
	labels: RecursivePartial<
		InHouseAdminI18nProps['address']['manual']['fields']
	>,
): FieldProps[] => [
	{
		name: 'addressLine1',
		type: 'text',
		label: labels.addressLine1.label,
		error: (value: string) => {
			if (!value) return labels.addressLine1.emptyError;
			return value.length < 3 ? labels.addressLine1.invalidError : undefined;
		},
		inputWidth: 6,
		cfg: { mb: 3 },
	},
	{
		name: 'addressLine2',
		type: 'text',
		label: labels.addressLine2.label,
		error: labels.addressLine2.error,
		inputWidth: 6,
		cfg: { mb: 3 },
	},
	{
		name: 'addressLine3',
		value: ' ',
		type: 'text',
		label: labels.addressLine3.label,
		error: labels.addressLine3.error,
		inputWidth: 6,
		cfg: { mb: 3 },
	},
	{
		name: 'postTown',
		label: labels.postTown.label,
		type: 'text',
		inputWidth: 6,
		cfg: { mb: 3 },
	},
	{
		name: 'postcode',
		label: labels.postcode.label,
		type: 'text',
		error: (postcode: string) => {
			if (!postcode) return labels.postcode.emptyError;
			return validPostcode(postcode) ? undefined : labels.postcode.invalidError;
		},
		inputWidth: 6,
		cfg: { mb: 3 },
	},
	{
		name: 'county',
		label: labels.county.label,
		type: 'text',
		error: labels.county.error,
		inputWidth: 6,
		cfg: { mb: 3 },
	},
];