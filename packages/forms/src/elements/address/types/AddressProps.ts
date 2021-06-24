import { ReactNode } from 'react';
import { Address } from '../address';
import { AddressLookupProvider } from '../addressLookupProvider';
import { SubmitButtonProps } from './BaseProps';

export interface AddressProps {
	initialValue?: Address;
	loading: boolean;
	setLoading: (loading: boolean) => void;
	testId?: string;
	addressLookupProvider: AddressLookupProvider;
	invalidPostcodeMessage: string;
	postcodeLookupLabel: string;
	postcodeLookupButton: string;
	changePostcodeButton: string;
	changePostcodeAriaLabel?: string;
	selectAddressLabel: string;
	selectAddressPlaceholder?: string;
	selectAddressButton: string;
	selectAddressRequiredMessage: string;
	noAddressesFoundMessage: string;
	addressLine1Label: string;
	addressLine1RequiredMessage: string;
	addressLine2Label: string;
	addressLine3Label: string;
	townLabel: string;
	countyLabel: string;
	postcodeLabel: string;
	countryLabel: string;
	changeAddressButton: string;
	findAddressCancelledButton?: string;
	onFindAddressCancelled?: () => void;
	onValidatePostcode?: (isValid: boolean) => void | null;
	onAddressChanging?: (isValid: boolean) => void | null;
	submitButton: SubmitButtonProps;
	children?: ReactNode;
}
