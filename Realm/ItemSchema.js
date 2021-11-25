const ItemSchema = {
  name: 'Item',
  properties: {
    _id: 'string',
    id: 'int?',
    code: 'string',
    name: 'string',
    HSNCode: 'string',
    rate: 'float',
    cgst: {type: 'int', default: 2},
    sgst: {type: 'int', default: 2},
    discount: 'float?',
    remarks: 'string?',
  },
  primaryKey: '_id',
};

export default ItemSchema;
