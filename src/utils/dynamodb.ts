// Create a DocumentClient that represents the query to add an item
import DynamoDB from "aws-sdk/clients/dynamodb";

// Declare some custom client just to illustrate how TS will include only used files into lambda distribution
export default class DynamoDatabaseClient {
  table: string;
  docClient: DynamoDB.DocumentClient;

  constructor(table = process.env.SAMPLE_TABLE) {
    this.docClient = new DynamoDB.DocumentClient();
    this.table = table;
  }

  async findAll() {
    const data = await this.docClient.scan({ TableName: this.table }).promise();
    return data.Items;
  }

  async read(keyValueObj: any) {
    const params = {
      TableName: this.table,
      Key: keyValueObj,
    };
    const data = await this.docClient.get(params).promise();
    return data.Item;
  }

  async add(Item: object) {
    const params = {
      TableName: this.table,
      Item,
    };
    return await this.docClient.put(params).promise();
  }
  async update (item, idAttributeName){
    const params = {
        TableName: this.table,
        Key: {},
        ExpressionAttributeValues: {},
        ExpressionAttributeNames: {},
        UpdateExpression: "",
        ReturnValues: "UPDATED_NEW"
    };

    params["Key"][idAttributeName] = item[idAttributeName];
    let prefix = "set ";
    let attributes = Object.keys(item);

    for (let i=0; i<attributes.length; i++) {
        let attribute = attributes[i];
        if (attribute != idAttributeName) {
            params["UpdateExpression"] += prefix + "#" + attribute + " = :" + attribute;
            params["ExpressionAttributeValues"][":" + attribute] = item[attribute];
            params["ExpressionAttributeNames"]["#" + attribute] = attribute;
            prefix = ", ";
        }
    }
    return await this.docClient.update(params).promise();
  }

}
