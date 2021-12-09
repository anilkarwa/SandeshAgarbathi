const CompanySchema = {
    name: 'Company',
    properties: {
      _id: 'string',
      name: {type: 'string', indexed: true},
      address1: 'string?',
      address2: 'string?',
      address3: 'string?',
      address4: 'string?',
      address5: 'string?',
      phoneNo: 'string?',
      gstNo: 'string?',
    },
  };
  
  export default CompanySchema;
  