import {
  getCustomers,
  getItems,
  getCustomerGroups,
} from '../../services/TableData';
import CustomerSchema from '../../Realm/CustomerSchema';
import ItemSchema from '../../Realm/ItemSchema';
import CustomerGroupSchema from '../../Realm/CustomerGroup';
import {InvoiceSchema, SelectedItemSchema} from '../../Realm/Invoice';
import Realm from 'realm';

const customerOptions = {
  path: 'myrealm',
  schema: [CustomerSchema],
};

const customerGroupOptions = {
  path: 'myrealm',
  schema: [CustomerGroupSchema],
};

const itemOptions = {
  path: 'myrealm',
  schema: [ItemSchema],
};

const invoiceOptions = {
  path: 'myrealm',
  schema: [InvoiceSchema, SelectedItemSchema],
};

export const getAllCustomers = () => {
  return new Promise(async (resolve, reject) => {
    let realm = new Realm(customerOptions);
    try {
      let result = await getCustomers();
      if (result.response_type === 'success') {
        const {data} = result.response;
        if (data && data.length) {
          // create realm object
          realm.write(() => {
            realm.deleteAll();
            for (let cust of data) {
              let finalObj = {
                _id: Realm.BSON.ObjectId().toHexString(),
                id: cust.id,
                name: cust.name,
                code: cust.code,
                email: cust.email,
                addressLine1: cust.addressLine1,
                addressLine2: cust.addressLine2,
                addressLine3: cust.addressLine3,
                city: cust.city,
                state: cust.state,
                country: cust.country,
                pincode: cust.pincode,
                groupId: cust.groupId,
                phoneNumber: cust.phoneNumber,
                mobileNumber: cust.mobileNumber,
                contactPerson: cust.contactPerson,
                gstNo: cust.gstNo,
                addedBy: cust.addedBy,
                changedBy: cust.changedBy,
                remarks: cust.remarks,
                isSynced: true,
              };
              realm.create('Customer', finalObj);
            }
          });
        }
        realm.close();
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      console.log('errorrr line 61=>', error);
      realm.close();
      return resolve(false);
    }
  });
};

export const getUnSyncedCustomers = () => {
  return new Promise(async (resolve, reject) => {
    let realm = new Realm(customerOptions);
    try {
      const customers = realm.objects('Customer');
      const unSynced = customers.filtered('isSynced == false');
      if (unSynced && unSynced.length) {
        resolve({
          status: true,
          data: JSON.parse(JSON.stringify(unSynced)),
        });
      } else {
        resolve({
          status: true,
          data: [],
        });
      }
      realm.close();
    } catch (error) {
      console.log('errorrr line 84=>', error);
      realm.close();
      return resolve({
        status: false,
        data: [],
      });
    }
  });
};

export const getUpdatedCustomers = () => {
  return new Promise(async (resolve, reject) => {
    let realm = new Realm(customerOptions);
    try {
      const customers = realm.objects('Customer');
      const updated = customers.filtered('isUpdated == true');
      if (updated && updated.length) {
        resolve({
          status: true,
          data: JSON.parse(JSON.stringify(updated)),
        });
      } else {
        resolve({
          status: true,
          data: [],
        });
      }
      realm.close();
    } catch (error) {
      console.log('errorrr line 110=>', error);
      realm.close();
      return resolve({
        status: false,
        data: [],
      });
    }
  });
};

export const getCustomerList = (skip, size, search) => {
  return new Promise(async (resolve, reject) => {
    let realm = new Realm(customerOptions);
    try {
      const start = skip;
      const end = size + skip;
      const customers = realm.objects('Customer');
      let selectedCustomers = customers;
      if (search && search !== '') {
        selectedCustomers = customers.filtered(
          'name CONTAINS[c] $0 OR code CONTAINS[c] $0',
          search,
        );
      }
      selectedCustomers = selectedCustomers.filtered('isDeleted == false');
      const sorted = selectedCustomers.sorted('name');
      if (sorted && sorted.length) {
        let final = sorted.slice(start, end);
        resolve({
          status: true,
          data: {
            count: sorted.length,
            rows: JSON.parse(JSON.stringify(final)),
          },
        });
      } else {
        resolve({
          status: true,
          data: {
            count: 0,
            rows: [],
          },
        });
      }
      realm.close();
    } catch (error) {
      console.log('errorrr line 153=>', error);
      realm.close();
      return resolve({
        status: false,
        data: {
          count: 0,
          rows: [],
        },
      });
    }
  });
};

export const getCustomersCount = () => {
  return new Promise(async (resolve, reject) => {
    let realm = new Realm(customerOptions);
    try {
      const customers = realm.objects('Customer');
      console.log('itemss=>', customers.length);
      if (customers && customers.length) {
        resolve({
          status: true,
          count: customers.length,
        });
      } else {
        resolve({
          status: true,
          count: 0,
        });
      }
      realm.close();
    } catch (error) {
      console.log('errorrr line 181=>', error);
      realm.close();
      return resolve({
        status: false,
        count: 0,
      });
    }
  });
};

export const getAllItems = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let realm = new Realm(itemOptions);
      let result = await getItems();
      if (result.response_type === 'success') {
        const {data} = result.response;
        if (data && data.length) {
          // create realm object
          realm.write(() => {
            realm.deleteAll();
            for (let item of data) {
              let finalObj = {
                _id: Realm.BSON.ObjectId().toHexString(),
                id: item.id,
                name: item.name,
                code: item.code,
                rate: item.rate,
                discount: item.discount,
                remarks: item.remarks,
              };
              realm.create('Item', finalObj);
            }
          });
        }
        realm.close();
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      console.log('errorrr line 219=>', error);
      //realm.close();
      return resolve(false);
    }
  });
};

export const getItemList = (skip, size, search) => {
  return new Promise(async (resolve, reject) => {
    let realm = new Realm(itemOptions);
    try {
      const start = skip;
      const end = size + skip;
      const Items = realm.objects('Item');
      let selectedItems = Items;
      if (search && search !== '') {
        selectedItems = Items.filtered(
          'name CONTAINS[c] $0 OR code CONTAINS[c] $0',
          search,
        );
      }
      const sorted = selectedItems.sorted('name');
      if (sorted && sorted.length) {
        let final = sorted.slice(start, end);
        resolve({
          status: true,
          data: {
            count: sorted.length,
            rows: JSON.parse(JSON.stringify(final)),
          },
        });
      } else {
        resolve({
          status: true,
          data: {
            count: 0,
            rows: [],
          },
        });
      }
      realm.close();
    } catch (error) {
      console.log('errorrr line 258=>', error);
      realm.close();
      return resolve({
        status: false,
        data: {
          count: 0,
          rows: [],
        },
      });
    }
  });
};

export const getAllCustomerGroups = () => {
  return new Promise(async (resolve, reject) => {
    let realm = new Realm(customerGroupOptions);
    try {
      let result = await getCustomerGroups();
      if (result.response_type === 'success') {
        const {data} = result.response;
        if (data && data.length) {
          // create realm object
          realm.write(() => {
            realm.deleteAll();
            for (let item of data) {
              let finalObj = {
                _id: Realm.BSON.ObjectId().toHexString(),
                id: item.id,
                name: item.name,
              };
              realm.create('CustomerGroup', finalObj);
            }
          });
        }
        realm.close();
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      console.log('errorrr line 295=>', error);
      realm.close();
      return resolve(false);
    }
  });
};

export const getCustomerGroupList = () => {
  return new Promise(async (resolve, reject) => {
    let realm = new Realm(customerGroupOptions);
    try {
      const Items = realm.objects('CustomerGroup');
      const sorted = Items.sorted('name');
      if (sorted && sorted.length) {
        resolve({
          status: true,
          data: {
            count: sorted.length,
            rows: JSON.parse(JSON.stringify(sorted)),
          },
        });
      } else {
        resolve({
          status: true,
          data: {
            count: 0,
            rows: [],
          },
        });
      }
      realm.close();
    } catch (error) {
      console.log('errorrr line 324=>', error);
      realm.close();
      return resolve({
        status: false,
        data: {
          count: 0,
          rows: [],
        },
      });
    }
  });
};

export const addNewInvoice = (newInvoice) => {
  return new Promise(async (resolve, reject) => {
    let realm = new Realm(invoiceOptions);
    newInvoice._id = Realm.BSON.ObjectId().toHexString();
    try {
      // create realm object
      realm.write(() => {
        realm.create('Invoice', newInvoice);
      });
      realm.close();
      resolve(true);
    } catch (error) {
      console.log('errorrr line 388=>', error);
      realm.close();
      return resolve(false);
    }
  });
};

export const getLastInvoiceNumber = (userPrefix = 'AN') => {
  return new Promise(async (resolve, reject) => {
    console.log('preeff=>', userPrefix);
    let realm = new Realm(invoiceOptions);
    try {
      const invoiceList = realm.objects('Invoice').sorted('invoiceDate', true);
      const filteted = invoiceList.filtered('prefix == $0', userPrefix);
      const sorted = filteted.sorted('invoiceDate', true);
      if (sorted && sorted.length) {
        resolve({
          status: true,
          data: sorted[0].invoiceNo,
        });
      } else {
        resolve({
          status: false,
          data: null,
        });
      }
      realm.close();
    } catch (error) {
      console.log('errorrr line 414=>', error);
      realm.close();
      return resolve({
        status: false,
        data: null,
      });
    }
  });
};
