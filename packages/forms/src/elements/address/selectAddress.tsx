import React, { useState } from 'react';
import { useForm } from 'react-final-form';
import { Address } from './address';
import { FFSelect } from '../select/select';
import { P, Button, Link, Flex } from '@tpr/core';
import { ArrowRight } from '@tpr/icons';
import PostcodeFormatter from './postcodeFormatter';
import elementStyles from '../elements.module.scss';
import styles from './addressLookup.module.scss';

type SelectAddressProps = {
	loading: boolean;
	testId?: string;
	postcode?: string;
	addresses: Address[];
	onChangePostcodeClick: () => void;
	onAddressSelected: (address: Address) => void;
	postcodeLookupLabel: string;
	changePostcodeButton: string;
	changePostcodeAriaLabel?: string;
	selectAddressLabel: string;
	selectAddressPlaceholder?: string;
	selectAddressButton: string;
	selectAddressRequiredMessage: string;
	noAddressesFoundMessage: string;
};

export const SelectAddress: React.FC<SelectAddressProps> = ({
	loading,
	testId,
	postcode,
	addresses,
	onChangePostcodeClick,
	onAddressSelected,
	postcodeLookupLabel,
	changePostcodeButton,
	changePostcodeAriaLabel,
	selectAddressLabel,
	selectAddressPlaceholder,
	selectAddressButton,
	selectAddressRequiredMessage,
	noAddressesFoundMessage,
}) => {
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

	const addressesToTransform = ensureNoUndefinedFields(addresses);
	let options = addressesToTransform.map((address) => {
		return {
			value: address,
			label: [
				address.addressLine1,
				address.addressLine2,
				address.addressLine3,
				address.postTown,
				address.county,
				address.postcode,
				address.country,
			]
				.filter((x) => (x ? true : false))
				.join(', '),
		};
	});

	const form = useForm();
	const postcodeFormatter = new PostcodeFormatter();

	// Setting a 'valid' object appears to be the only way to control validity of FFSelect.
	// validate() will run immediately. Initialise to null so that validate() can detect the initial load and set an initial value rather than validating.
	let [selectAddressValid, setSelectAddressValid] = useState(null);
	function getAddressIfValid(): Address | undefined {
		const selectedAddressField = form.getFieldState('selectedAddress');
		if (
			selectAddressValid &&
			selectAddressValid.touched &&
			!selectAddressValid.error &&
			selectedAddressField &&
			selectedAddressField.value.value
		) {
			return selectedAddressField.value.value;
		}
	}

	return (
		<>
			<Flex>
				<P className={`${styles.nonEditable} ${styles.selectedPostcode}`}>
					<strong
						id={(testId ? testId + '-' : '') + 'postcode'}
						className={`${elementStyles.labelText} ${styles.nonEditableLabel}`}
					>
						{postcodeLookupLabel}
					</strong>{' '}
					<span aria-labelledby={(testId ? testId + '-' : '') + 'postcode'}>
						{postcodeFormatter.formatPostcode(postcode)}
					</span>
				</P>
				<Link
					onClick={onChangePostcodeClick}
					testId={(testId ? testId + '-' : '') + 'change-postcode'}
					className={styles.changePostcode}
					aria-label={changePostcodeAriaLabel}
					disabled={loading}
				>
					{changePostcodeButton}
				</Link>
			</Flex>
			<FFSelect
				label={selectAddressLabel}
				name="selectedAddress"
				options={options}
				inputWidth={6}
				testId={(testId ? testId + '-' : '') + 'select-address-list'}
				validate={(value) => {
					// On initial load, setup the validation object
					if (!selectAddressValid) {
						setSelectAddressValid({ error: '', touched: false });
						return;
					}
					// On subsequent runs, update the validation object.
					// In this case it can only go from invalid (initial load) to valid (address selected).
					// You can't select an invalid option from the list because there aren't any, and if you don't select one this never runs.
					if (value) {
						setSelectAddressValid({ touched: true, error: '' });
					}
				}}
				meta={selectAddressValid}
				notFoundMessage={noAddressesFoundMessage}
				placeholder={selectAddressPlaceholder}
				readOnly={true}
				disabled={loading}
				selectedItem={{}} // don't reselect if the same address turns up again
			/>
			<Button
				disabled={loading || !getAddressIfValid()}
				testId={(testId ? testId + '-' : '') + 'select-address-button'}
				onClick={() => {
					// If validate() has set the 'valid' object to a valid state, continue; otherwise set it to an invalid state.
					const validAddress = getAddressIfValid();
					if (validAddress) {
						onAddressSelected(validAddress);
					} else {
						setSelectAddressValid({
							touched: true,
							error: selectAddressRequiredMessage,
						});
					}
				}}
				className={`${styles.button} ${styles.arrowButton}`}
			>
				<Flex
					cfg={{
						alignItems: 'center',
						pl: 4,
						pr: 2,
					}}
				>
					{selectAddressButton}
					<ArrowRight cfg={{ fill: 'white' }} width={'32'} />
				</Flex>
			</Button>
		</>
	);
};
