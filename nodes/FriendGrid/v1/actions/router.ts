import { IDataObject, IExecuteFunctions, INodeExecutionData } from "n8n-workflow";

import * as user from './user';
import { FriendGrid } from "./interfaces";

export async function router(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const operationResult: INodeExecutionData[] = [];
	let responseData: IDataObject | IDataObject[] = [];

	for (let i = 0; i < items.length; i++) {
		const resource = this.getNodeParameter<FriendGrid>('resource', i);
		const operation = this.getNodeParameter('operation', i);

		const friendGrid = {
			resource,
			operation,
		} as FriendGrid;

		try {
			if (friendGrid.resource === 'user') {
				responseData = (await user[friendGrid.operation].execute.call(this))[i];
			}

			const executionData = this.helpers.constructExecutionMetaData(
				this.helpers.returnJsonArray(responseData),
				{ itemData: { item: i } },
			);
			operationResult.push(...executionData);
		} catch (err) {
			if (this.continueOnFail()) {
				operationResult.push({ json: this.getInputData(i)[0].json, error: err });
			} else {
				if (err.context) err.context.itemIndex = i;
				throw err;
			}
		}
	}

	return [operationResult];
}
