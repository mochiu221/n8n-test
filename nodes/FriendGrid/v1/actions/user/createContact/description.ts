import type { UserProperties } from '../../interfaces';

export const userCreateDescription: UserProperties = [
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'createContact',
				],
				resource: [
					'user',
				],
			},
		},
		default:'',
		placeholder: 'name@email.com',
		description:'Primary email for the contact',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: [
					'user',
				],
				operation: [
					'createContact',
				],
			},
		},
		options: [
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
			},
		],
	}
];
