const InvoiceSchema = {
  name: 'Invoice',
  properties: {
    _id: 'string',
    id: 'int?',
    invoiceNo: 'string',
    invoiceDate: {type: 'date', default: new Date()},
    partyName: 'string?',
    addressLine1: 'string?',
    addressLine2: 'string?',
    addressLine3: 'string?',
    city: 'string?',
    state: 'string?',
    country: 'string?',
    pinCode: 'string?',
    addedBy: 'int?',
    grossAmt: {type: 'float?', default: 0.0},
    cgstAmt: {type: 'float?', default: 0.0},
    sgstAmt: {type: 'float?', default: 0.0},
    totalAmt: {type: 'float?', default: 0.0},
    grandTotolAmt: {type: 'float?', default: 0.0},
    roundOff: {type: 'float?', default: 0.0},
    discAmt: {type: 'float?', default: 0.0},
    agent: 'string?',
    remarks: 'string?',
    prefix: 'string?',
    isSyned: {type: 'bool', default: false},
    items: {type: 'list', objectType: 'SelectedItem'},
  },
  primaryKey: '_id',
};

const SelectedItemSchema = {
  name: 'SelectedItem',
  properties: {
    itemId: 'int?',
    itemName: 'string?',
    qty: 'int?',
    rate: 'float?',
    grossAmt: {type: 'float?', default: 0.0},
    disPer: {type: 'float?', default: 0.0},
    disAmt: {type: 'float?', default: 0.0},
    netAmt: {type: 'float?', default: 0.0},
    cgstPer: {type: 'float?', default: 0.0},
    cgstAmt: {type: 'float?', default: 0.0},
    sgstPer: {type: 'float?', default: 0.0},
    sgstAmt: {type: 'float?', default: 0.0},
    totalAmt: {type: 'float?', default: 0.0},
  },
};

export {SelectedItemSchema, InvoiceSchema};

export default InvoiceSchema;
