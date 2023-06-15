import React from 'react';
import { Barcode, CreditCard, Money, QrCode } from 'phosphor-react-native';
import { PaymentMethodLabel } from './PaymentMethodLabel';

const labels = new Set([
	{
		title: 'Boleto',
		icon: <Barcode size={16}/>
	},
	{
		title: 'Pix',
		icon: <QrCode size={16}/>
	},
	{
		title: 'Dinheiro',
		icon: <Money size={16}/>
	},
	{
		title: 'Cartão de Crédito',
		icon: <CreditCard size={16}/>
	},
]);

const values = Array.from(labels.values())

export function PaymentMethodLabels() {
	return(
		<>
			{values.map(c => <PaymentMethodLabel key={c.title} title={c.title} icon={c.icon} />)}
		</>
	)
}