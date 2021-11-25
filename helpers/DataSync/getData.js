import {
  getCustomers,
  getItems,
  getCustomerGroups,
  updateCustomer as updateExitingCustomers,
  createCustomer,
  deleteCustomer,
  invoiceList,
  saveInvoices,
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
                addedOn: cust.addedOn ? new Date(cust.addedOn) : null,
                changedBy: cust.changedBy,
                changedOn: cust.changedOn ? new Date(cust.changedOn) : null,
                remarks: cust.remarks,
                inActive: cust.inActive,
                isSynced: true,
              };
              realm.create('Customer', finalObj);
            }
          });
        }
        realm.close();
        resolve({
          status: true,
        });
      } else {
        resolve({
          status: false,
        });
      }
    } catch (error) {
      console.log('errorrr line 61=>', error);
      realm.close();
      return resolve({
        status: false,
      });
    }
  });
};

export const getUnSyncedCustomers = () => {
  return new Promise(async (resolve, reject) => {
    let realm = new Realm(customerOptions);
    try {
      const customers = realm.objects('Customer');
      const unSynced = customers.filtered(
        'isSynced == false && isDeleted == false',
      );
      if (unSynced && unSynced.length) {
        let newCustomerList = [];
        for (let cust of unSynced) {
          let newCust = {
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
            remarks: cust.remarks,
          };
          newCustomerList.push(newCust);
        }

        let result = await createCustomer(newCustomerList);
        if (result.response_type === 'success') {
          resolve({
            status: true,
          });
        } else {
          resolve({
            status: false,
          });
        }
      } else {
        resolve({
          status: true,
        });
      }
      realm.close();
    } catch (error) {
      console.log('errorrr line 84=>', error);
      realm.close();
      return resolve({
        status: false,
      });
    }
  });
};

export const getUpdatedCustomers = () => {
  return new Promise(async (resolve, reject) => {
    let realm = new Realm(customerOptions);
    try {
      const customers = realm.objects('Customer');
      const updated = customers.filtered(
        'isUpdated == true && isDeleted == false && isSynced == true',
      );
      if (updated && updated.length) {
        let updatedCustomerList = [];
        for (let cust of updated) {
          let updatedCust = {
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
            changedBy: cust.changedBy,
            remarks: cust.remarks,
          };
          updatedCustomerList.push(updatedCust);
        }

        let result = await updateExitingCustomers(updatedCustomerList);
        if (result.response_type === 'success') {
          resolve({
            status: true,
          });
        } else {
          resolve({
            status: false,
          });
        }
      } else {
        resolve({
          status: true,
        });
      }
      realm.close();
    } catch (error) {
      console.log('errorrr line 110=>', error);
      realm.close();
      return resolve({
        status: false,
      });
    }
  });
};

export const getDeletedCustomers = () => {
  return new Promise(async (resolve, reject) => {
    let realm = new Realm(customerOptions);
    try {
      const customers = realm.objects('Customer');
      const deleted = customers.filtered(
        'isDeleted == true && isSynced == true',
      );
      if (deleted && deleted.length) {
        let deletedCustomerList = [];
        for (let cust of deleted) {
          let deletedCust = {
            id: cust.id,
          };
          deletedCustomerList.push(deletedCust);
        }
        let result = await deleteCustomer(deletedCustomerList);
        if (result.response_type === 'success') {
          resolve({
            status: true,
          });
        } else {
          resolve({
            status: false,
          });
        }
      } else {
        resolve({
          status: true,
        });
      }
      realm.close();
    } catch (error) {
      console.log('errorrr line 110=>', error);
      realm.close();
      return resolve({
        status: false,
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
      selectedCustomers = selectedCustomers.filtered(
        'isDeleted == false && inActive == "N"',
      );
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
      //realm.close();
      return resolve({
        status: false,
        count: 0,
      });
    }
  });
};

export const updateCustomer = (customer) => {
  return new Promise(async (resolve, reject) => {
    let realm = new Realm(customerOptions);
    try {
      // create realm object
      realm.write(() => {
        realm.create('Customer', customer, 'modified');
      });
      realm.close();
      resolve(true);
    } catch (error) {
      console.log('errorrr line 295=>', error);
      realm.close();
      return resolve(false);
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
                HSNCode: item.HSNCode,
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
    let realm = null;
    try {
      realm = new Realm(customerGroupOptions);
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
      realm?.close();
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
          data: JSON.parse(JSON.stringify(sorted)),
        });
      } else {
        resolve({
          status: true,
          data: [],
        });
      }
      realm.close();
    } catch (error) {
      console.log('errorrr line 324=>', error);
      realm.close();
      return resolve({
        status: false,
        data: [],
      });
    }
  });
};

export const getAllInvoice = (payload) => {
  return new Promise(async (resolve, reject) => {
    let realm = null;
    try {
      realm = new Realm(invoiceOptions);
      let result = await invoiceList(payload);
      if (result.response_type === 'success') {
        const {data} = result.response;
        if (data && data.length) {
          // create realm object
          realm.write(() => {
            realm.deleteAll();
            for (let item of data) {
              let invoiceItems = [];
              for (let iv of item.items) {
                let obj = {
                  itemId: iv.invoiceItemId,
                  itemName: iv.itemName,
                  qty: iv.quantity,
                  rate: iv.rate,
                  grossAmt: iv.grossAmt,
                  disPer: iv.discPer,
                  disAmt: iv.discAmt,
                  netAmt: iv.netAmt,
                  cgstPer: iv.cgstPer,
                  cgstAmt: iv.cgstAmt,
                  sgstPer: iv.sgstPer,
                  sgstAmt: iv.sgstAmt,
                  totalAmt: iv.totalAmt,
                };
                invoiceItems.push(obj);
              }

              let finalObj = {
                _id: Realm.BSON.ObjectId().toHexString(),
                id: item.id,
                invoiceNo: item.invoiceNo,
                invoiceDate: new Date(item.invoiceDate),
                time: item.time,
                custId: item.custId,
                partyName: item.partyName,
                addressLine1: item.addressLine1,
                addressLine2: item.addressLine2,
                addressLine3: item.addressLine3,
                city: item.city,
                state: item.state,
                country: item.country,
                pinCode: item.pincode,
                grossAmt: item.grossAmt,
                cgstAmt: item.totalCGSTAmt,
                sgstAmt: item.totalSGSTAmt,
                totalAmt: item.totalAmt,
                grandTotolAmt: item.grandTotalAmt,
                roundOff: item.roundOffAmt,
                discAmt: item.discAmt,
                agent: item.agent,
                remarks: item.remarks,
                prefix: item.prefix,
                isSyned: true,
                items: invoiceItems,
              };
              realm.create('Invoice', finalObj);
            }
          });
        }
        resolve({
          status: true,
        });
      } else {
        resolve({
          status: true,
        });
      }
      realm.close();
    } catch (error) {
      console.log('errorrr line 572=>', error);
      realm.close();
      return resolve({
        status: false,
      });
    }
  });
};

export const getinvoiceList = (skip, size, search) => {
  return new Promise(async (resolve, reject) => {
    let realm = new Realm(invoiceOptions);
    try {
      const start = skip;
      const end = size + skip;
      const invoices = realm.objects('Invoice');
      let selectedInvoices = invoices;
      if (search && search !== '') {
        selectedInvoices = invoices.filtered(
          'invoiceNo CONTAINS[c] $0 OR partyName CONTAINS[c] $0',
          search,
        );
      }

      const sorted = selectedInvoices.sorted('invoiceNo', true);
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
      console.log('errorrr line 613=>', error);
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

export const getUnSyncedInvoice = () => {
  return new Promise(async (resolve, reject) => {
    let realm = null;
    try {
      realm = new Realm(invoiceOptions);
      const invoices = realm.objects('Invoice');
      const unSynced = invoices.filtered('isSyned == false');
      if (unSynced && unSynced.length) {
        let newInvoice = [];
        for (let inv of unSynced) {
          let itemObj = [];
          for (let item of inv.items) {
            itemObj.push({
              itemId: item.itemId,
              itemName: item.itemName,
              quantity: item.qty,
              rate: parseFloat(parseFloat(item.rate).toFixed(2)),
              grossAmt: parseFloat(parseFloat(item.grossAmt).toFixed(2)),
              disPer: item.disPer,
              disAmt: item.discAmt
                ? parseFloat(parseFloat(item.discAmt).toFixed(2))
                : 0,
              netAmt: parseFloat(parseFloat(item.netAmt).toFixed(2)),
              cgstPer: item.cgstPer,
              cgstAmt: parseFloat(parseFloat(item.cgstAmt).toFixed(2)),
              sgstPer: item.sgstPer,
              sgstAmt: parseFloat(parseFloat(item.sgstAmt).toFixed(2)),
              totalAmt: parseFloat(parseFloat(item.totalAmt).toFixed(2)),
            });
          }
          let newCust = {
            invoiceNo: inv.invoiceNo,
            invoiceDate: new Date(inv.invoiceDate),
            time: inv.time,
            custId: inv.custId,
            custCode: inv.custCode,
            partyName: inv.partyName,
            addressLine1: inv.addressLine1,
            addressLine2: inv.addressLine2,
            addressLine3: inv.addressLine3,
            city: inv.city,
            state: inv.state,
            country: inv.country,
            pincode: inv.pinCode ? inv.pinCode : '',
            grossAmt: parseFloat(parseFloat(inv.grossAmt).toFixed(2)),
            totalCGSTAmt: parseFloat(parseFloat(inv.cgstAmt).toFixed(2)),
            totalSGSTAmt: parseFloat(parseFloat(inv.sgstAmt).toFixed(2)),
            totalAmt: parseFloat(parseFloat(inv.totalAmt).toFixed(2)),
            grandTotalAmt: parseFloat(parseFloat(inv.grandTotolAmt).toFixed(2)),
            roundOffAmt: parseFloat(parseFloat(inv.roundOff).toFixed(2)),
            discAmt: inv.disAmt ? inv.discAmt : 0,
            agent: inv.agent,
            remarks: inv.remarks,
            prefix: inv.prefix,
            items: itemObj,
            addedBy: inv.addedBy,
            addedOn: new Date(inv.addedOn),
          };
          newInvoice.push(newCust);
        }
        let result = await saveInvoices(newInvoice);
        if (result.response_type === 'success') {
          resolve({
            status: true,
          });
        } else {
          resolve({
            status: false,
          });
        }
      } else {
        resolve({
          status: true,
        });
      }
      realm.close();
    } catch (error) {
      console.log('errorrr line 724=>', error);
      realm.close();
      return resolve({
        status: false,
      });
    }
  });
};

export const updateInvoiceCustomerData = () => {
  return new Promise(async (resolve, reject) => {
    let realm = null;
    let unSyned = [];
    let custCodes = [];
    let custIds = [];
    try {
      realm = new Realm(invoiceOptions);
      const unSyncedInvoiceList = realm
        .objects('Invoice')
        .filtered('isSyned == false');
      if (unSyncedInvoiceList && unSyncedInvoiceList.length) {
        unSyned = JSON.parse(JSON.stringify(unSyncedInvoiceList));
        custCodes = unSyned.map((inv) => {
          return inv.custCode;
        });
      } else {
        return resolve({
          status: true,
        });
      }
      realm.close();
    } catch (error) {
      console.log('error line 543=>', error);
      realm.close();
      return resolve({
        status: false,
      });
    }

    let realm2 = new Realm(customerOptions);
    try {
      const cust = realm2
        .objects('Customer')
        .filtered(
          custCodes.map((_id, index) => `code = $${index}`).join(' OR '),
          ...custCodes,
        );
      if (cust && cust.length) {
        custIds = cust.map((e) => {
          return {code: e.code, id: e.id};
        });
      } else {
        return resolve({
          status: true,
        });
      }
      realm2.close();
    } catch (error) {
      console.log('error line 568=>', error);
      realm2.close();
      return resolve({
        status: false,
      });
    }

    let realm3 = new Realm(invoiceOptions);
    try {
      for (let cust of custIds) {
        unSyned = unSyned.map((e) => {
          if (e.custCode === cust.code) {
            return {...e, custId: cust.id};
          } else {
            return e;
          }
        });
      }
      realm3.write(() => {
        for (let inv of unSyned) {
          realm3.create('Invoice', inv, 'modified');
        }
      });
      realm3.close();
      return resolve({
        status: true,
      });
    } catch (error) {
      console.log('error line 596=>', error);
      realm3.close();
      return resolve({
        status: false,
      });
    }
  });
};

export const getLastInvoiceNumber = (userPrefix) => {
  return new Promise(async (resolve, reject) => {
    let realm = new Realm(invoiceOptions);
    try {
      const invoicesList = realm.objects('Invoice');
      const filteted = invoicesList.filtered('prefix == $0', userPrefix);
      const sorted = filteted.sorted('invoiceNo', true);
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

export const getUnsyncedData = () => {
  return new Promise(async (resolve, reject) => {
    let realm = new Realm(customerOptions);
    let customers = [];
    let invoices = [];
    try {
      let customer = realm.objects('Customer');
      customers = JSON.parse(
        JSON.stringify(
          customer.filtered(
            'isSynced == false || isDeleted == true || isUpdated == true',
          ),
        ),
      );
      realm.close();
    } catch (error) {
      console.log('errror 862=>', error);
      realm.close();
      return resolve({
        status: true,
        data: {
          customer: 0,
          invoice: 0,
        },
      });
    }
    let realm2 = new Realm(invoiceOptions);
    try {
      let invoice = realm2.objects('Invoice');
      invoices = JSON.parse(
        JSON.stringify(invoice.filtered('isSyned == false')),
      );
      realm2.close();
      return resolve({
        status: true,
        data: {
          customer: customers.length,
          invoice: invoices.length,
        },
      });
    } catch (error) {
      console.log('errror 884=>', error);
      realm2.close();
      return resolve({
        status: true,
        data: {
          customer: 0,
          invoice: 0,
        },
      });
    }
  });
};
