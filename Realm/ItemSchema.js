const ItemSchema = {
  name: 'Item',
  properties: {
    _id: 'string',
    id: 'int?',
    code: 'string',
    name: 'string',
    HSNCode: 'string',
    rate: 'float',
    UOMID: 'int?',
    cgst: {type: 'float', default: 2.5},
    sgst: {type: 'float', default: 2.5},
    discount: 'float?',
    remarks: 'string?',
  },
  primaryKey: '_id',
};

export default ItemSchema;
