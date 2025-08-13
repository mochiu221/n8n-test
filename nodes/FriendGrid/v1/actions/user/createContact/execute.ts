import { IDataObject, IExecuteFunctions, INodeExecutionData, IRequestOptions } from "n8n-workflow";

export async function createContact(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	// Handle data coming from previous nodes
	const items = this.getInputData();
	let responseData;
	const returnData = [];
	const resource = this.getNodeParameter('resource', 0) as string;
	const operation = this.getNodeParameter('operation', 0) as string;

	// For each item, make an API call to create a contact
	for (let i = 0; i < items.length; i++) {
		if (resource === 'user') {
			if (operation === 'createContact') {
				// Get email input
				const email = this.getNodeParameter('email', i) as string;
				// Get additional fields input
				const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
				const data: IDataObject = {
					email,
				};

				Object.assign(data, additionalFields);

				// Make HTTP request according to https://sendgrid.com/docs/api-reference/
				const options: IRequestOptions = {
					headers: {
						'Accept': 'application/json',
					},
					method: 'PUT',
					body: {
						contacts: [
							data,
						],
					},
					uri: `https://api.sendgrid.com/v3/marketing/contacts`,
					json: true,
				};
				responseData = await this.helpers.requestWithAuthentication.call(this, 'friendGridApi', options);
				returnData.push(responseData);
			}
		}
	}
	// Map data to n8n data structure
	return [this.helpers.returnJsonArray(returnData)];
}
