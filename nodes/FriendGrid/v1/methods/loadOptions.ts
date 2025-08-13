import { ILoadOptionsFunctions, INodePropertyOptions, NodeOperationError } from "n8n-workflow";
import { apiRequestAllItems } from "../transport";

export async function getUsers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const endpoint = 'users';
	const responseData = await apiRequestAllItems.call(this, 'GET', endpoint, {});

	if (responseData === undefined) {
		throw new NodeOperationError(this.getNode(), 'No data got returned');
	}

	const returnData: INodePropertyOptions[] = [];
	for (const data of responseData) {
		if (data.delete_at !== 0) {
			continue;
		}

		returnData.push({
			name: data.username as string,
			value: data.id as string,
		});
	}

	returnData.sort((a, b) => {
		if (a.name < b.name) {
			return -1;
		}
		if (a.name > b.name) {
			return 1;
		}
		return 0;
	});

	return returnData;
}
