import React from 'react';
import { Bank, Barcode, CreditCard, Money, QrCode } from 'phosphor-react-native';
import { PaymentMethodLabel } from './PaymentMethodLabel';
import { PaymentMethodsDTO } from '@dtos/PaymentMethodsDTO';

const mapperPaymentMethods = new Map<string, any>([
	['bank_deposit', {
		title: 'Depósito Bancário',
		icon: <Bank size={16} />
	}],
	['boleto', {
		title: 'Boleto',
		icon: <Barcode size={16}/>
	}],
	['cash', {
		title: 'Dinheiro',
		icon: <Money size={16}/>
	}],
	['credit_card', {
		title: 'Cartão de Crédito',
		icon: <CreditCard size={16}/>
	}],
	['pix', {
		title: 'Pix',
		icon: <QrCode size={16}/>
	}],
]);

interface Props {
	data: PaymentMethodsDTO;
}

export function PaymentMethodLabels(data: Props) {
	
	const dataKeys = Object.keys(data.data);
	const filterKeys = dataKeys.filter(key => data.data[key as keyof PaymentMethodsDTO]);

	return(
		<>
			{filterKeys.map(key => {
				const mapperValue = mapperPaymentMethods.get(key);
				if(!mapperValue) return; 

				return(
					<PaymentMethodLabel key={key} title={mapperValue.title} icon={mapperValue.icon} />
				)
			})}
		</>
	)
}