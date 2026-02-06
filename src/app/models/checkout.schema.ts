export interface FormFieldConfig {
	key: string;
	label: string;
	type: 'text' | 'number' | 'email';
	placeholder: string;
	widthClass: string;
	required: boolean;
}

export interface CheckoutData {
	fullName: string;
	address: string;
	city: string;
	zip: string;
	paymentMethod: string;
}
