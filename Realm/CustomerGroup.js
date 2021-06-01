const CustomerGroupSchema = {
  name: 'CustomerGroup',
  properties: {
    _id: 'string',
    id: 'int?',
    name: 'string',
  },
  primaryKey: '_id',
};

export default CustomerGroupSchema;
