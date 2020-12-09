import React, { useState } from 'react';
import { Address } from './address';
import { PostcodeLookup } from './postcodeLookup';
import { SelectAddress } from './selectAddress';
import { EditAddress } from './editAddress';

export type AddressProps = {
	initialValue?: Address;
	loading: boolean;
	testId?: string;
	onPostcodeChanged: (postcode: string) => Address[];
	onAddressSaved: (address: Address) => void;
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
	changeAddressAriaLabel?: string;
	saveAddressButton: string;
};

enum AddressView {
	PostcodeLookup,
	SelectAddress,
	EditAddress,
}

export const AddressLookup: React.FC<AddressProps> = ({
	initialValue,
	loading,
	testId,
	onPostcodeChanged,
	invalidPostcodeMessage,
	postcodeLookupLabel,
	postcodeLookupButton,
	changePostcodeButton,
	changePostcodeAriaLabel,
	selectAddressLabel,
	selectAddressPlaceholder,
	selectAddressButton,
	selectAddressRequiredMessage,
	noAddressesFoundMessage,
	addressLine1Label,
	addressLine1RequiredMessage,
	addressLine2Label,
	addressLine3Label,
	townLabel,
	countyLabel,
	postcodeLabel,
	countryLabel,
	changeAddressButton,
	changeAddressAriaLabel,
}) => {
	// Start in postcode lookup view, unless there's already an address in which case start in edit address view
	let initialView = AddressView.PostcodeLookup;
	if (
		initialValue &&
		(initialValue.addressLine1 ||
			initialValue.addressLine2 ||
			initialValue.addressLine3 ||
			initialValue.postTown ||
			initialValue.county ||
			initialValue.postcode)
	) {
		initialView = AddressView.EditAddress;
	}
	const [addressView, setAddressView] = useState<AddressView>(initialView);
	const [addresses, setAddresses] = useState<Address[]>([]);
	const [address, setAddress] = useState<Address | null>(null);
	const [postcode, setPostcode] = useState<string>(null);

	// if missing fields are undefined rather than empty string they remain at their previous values
	function ensureNoUndefinedFields(addresses: Address[]) {
		return addresses && addresses.length
			? addresses.map((address) => {
					return {
						addressLine1: address.addressLine1 || '',
						addressLine2: address.addressLine2 || '',
						addressLine3: address.addressLine3 || '',
						postTown: address.postTown || '',
						county: address.county || '',
						postcode: address.postcode || '',
						nationId: address.nationId || null,
						country: address.country || '',
						countryId: address.countryId || null,
						uprn: address.uprn || null,
					};
			  })
			: [];
	}

	// Render a different child component depending on the state
	return (
		<>
			{addressView === AddressView.PostcodeLookup && (
				<PostcodeLookup
					postcode={postcode}
					loading={loading}
					testId={testId}
					onPostcodeChanged={(newPostcode) => {
						setPostcode(newPostcode);
						const matchingAddresses = onPostcodeChanged(newPostcode);
						setAddresses(ensureNoUndefinedFields(matchingAddresses));
						setAddressView(AddressView.SelectAddress);
					}}
					invalidPostcodeMessage={invalidPostcodeMessage}
					postcodeLookupLabel={postcodeLookupLabel}
					postcodeLookupButton={postcodeLookupButton}
				/>
			)}
			{addressView === AddressView.SelectAddress && (
				<SelectAddress
					testId={testId}
					loading={loading}
					postcode={postcode}
					addresses={addresses}
					onChangePostcodeClick={() =>
						setAddressView(AddressView.PostcodeLookup)
					}
					onAddressSelected={(selectedAddress) => {
						setAddress(selectedAddress);
						setAddressView(AddressView.EditAddress);
					}}
					postcodeLookupLabel={postcodeLookupLabel}
					changePostcodeButton={changePostcodeButton}
					changePostcodeAriaLabel={changePostcodeAriaLabel}
					selectAddressLabel={selectAddressLabel}
					selectAddressPlaceholder={selectAddressPlaceholder}
					selectAddressButton={selectAddressButton}
					selectAddressRequiredMessage={selectAddressRequiredMessage}
					noAddressesFoundMessage={noAddressesFoundMessage}
				/>
			)}
			{addressView === AddressView.EditAddress && (
				<EditAddress
					initialValue={initialValue}
					loading={loading}
					value={address}
					testId={testId}
					onChangeAddressClick={() =>
						setAddressView(AddressView.PostcodeLookup)
					}
					addressLine1Label={addressLine1Label}
					addressLine1RequiredMessage={addressLine1RequiredMessage}
					addressLine2Label={addressLine2Label}
					addressLine3Label={addressLine3Label}
					townLabel={townLabel}
					countyLabel={countyLabel}
					postcodeLabel={postcodeLabel}
					countryLabel={countryLabel}
					changeAddressButton={changeAddressButton}
					changeAddressAriaLabel={changeAddressAriaLabel}
				/>
			)}
		</>
	);
};