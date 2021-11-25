import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, IconButton } from 'react-native-paper';
import { theme } from '../../../config/theme';
import moment from 'moment';
//import for print html
import RNPrint from 'react-native-print';
import { print } from 'react-native-print';
//import end

function InvoiceDetails(props) {
  const { invoice } = props.route.params;

  const [invoiceDetails] = useState({
    invoiceNo: invoice.invoiceNo,
    invoiceDate: moment(new Date(invoice.invoiceDate)).format('DD/MM/YYYY'),
    time: invoice.time,
    partyName: invoice.partyName,
    addressLine1: invoice.addressLine1,
    addressLine2: invoice.addressLine2,
    addressLine3: invoice.addressLine3,
    city: invoice.city,
    state: invoice.state,
    country: invoice.country,
    pinCode: invoice.pindcode,
    grossAmt: Number(invoice.grossAmt.toFixed(2)),
    cgstAmt: Number(invoice.cgstAmt.toFixed(2)),
    sgstAmt: Number(invoice.sgstAmt.toFixed(2)),
    totalAmt: Number(invoice.totalAmt.toFixed(2)),
    grandTotolAmt: Number(invoice.grandTotolAmt.toFixed(2)),
    roundOff: Number(invoice.roundOff.toFixed(2)),
    discAmt: Number(invoice.discAmt.toFixed(2)),
    agent: invoice.agent,
    remarks: invoice.remarks,
    items: invoice.items,
    itemId: invoice.itemId,
    custId: invoice.custId
  });
  let data = invoiceDetails.items.map((data) => {
    return (`
          
            <div style="justify-content: space-between; display: flex;padding: 2px;">
            <div class="itemdetail">${data.itemName}</div>
            <div class="itemdetail">${data.rate}</div>
            </div>
            
            <div style="justify-content: space-between; display: flex;">
            <div class="qty">33074100</div>
            <div class="qty">${data.qty}</div>
            <div class="qty">${invoiceDetails.discAmt}</div>
            <div style="display: inline-block;">${data.grossAmt}</div>
            </div><br>
        
            <div class="qty1">CGST</div>
            <div class="qty1">${data.cgstPer}%</div>
            <div class="qty1">${Number(data.cgstAmt.toFixed(2))}</div><br>

            <div class="qty1">SGST</div>
            <div class="qty1">${data.sgstPer}%</div>
            <div class="qty1">${Number(data.sgstAmt.toFixed(2))}</div>
            
    `
    )
  })
  // console.log(data)

  //print pdf file start**************************************************************************
  const printHtmls = async () => {
    try {
      await RNPrint.print({
        html: `
      <html>
          <head>
              <style>
              @page
                  {
                      size:  auto;   
                      margin: 0mm;  
                  }

              html
              {
                  background-color: #FFFFFF;
                  margin: 1px; 
              }

                    body
                    {
                        margin: 0mm; 
                    }
                  * {
                      margin: 0px;
                      padding: 0px;
                  }
          
                  .container {
                      height: 900px;
                      width: 278px;
                      border: 1px solid black;
                      display: inline-block;
                      padding:2px;
                      margin: 2px;
                  }
          
                  p {
                      margin-top: 8px;
                      font-size: small;
                  }
                  .itemdetail{
                    font-family: Verdana, sans-serif;
                    font-size:small; 
                    display: inline-block;
                    margin-top: 5px;
                  }
                  .qty{
                    
                    display: inline-block;
                  }
                  .qty1{
                    margin-left: 25px;
                    display: inline-block;
                  }
              </style>
          </head>
          
          <body>
              <div class="container">
                  <div style="text-align: center; margin: 8px;">
                      <h3>SANDESH AGARBATHI CO.</h3>
                      <p>
                          9310 7th Main Road, J.C Industrial Estate Banglore-560062
                      </p>
                      <p>
                          GSTIN: 29AADFS6799R1ZU
                      </p>
                      <p>
                          ph: 080-26666474/26666477
                      </p>
                      <p>
                          Sales Person: Varadaraju
                      </p>
                      <div style="margin-top: 10px;">
                          <h3>! TAX Invoice</h3>
                      </div>
                      <p>************************************************</p>
                      <div style="justify-content: space-between; display: flex;>
                          <p style="display: inline-block;">${invoiceDetails.invoiceDate}</p>
                          <p style="display: inline-block;">${invoiceDetails.time}</p>
                          <p style="display: inline-block;">${invoiceDetails.invoiceNo}</p>
                      </div>
                  </div>
          
                  <div style="padding:2px">
                      <p>
                          Client Name: ${invoiceDetails.partyName}
                      </p>
                      <p>
                          Unique Id  : ${invoiceDetails.custId}
                      </p>
                      <p>
                          Phone No   : 1234
                      </p>
                      <p>
                          GST No     : NO
                      </p>
                      <p>
                          Address    : ${invoiceDetails.addressLine2} 
                      </p>
                  </div>
                  <div style="margin-top: 30px;display:'space-between">
                      <div style="display: inline-block; margin-right:90px;" >
                          <p>
                              SN  DESCRIPTION
                          </p>
                      </div>
                      <div style="display: inline-block;margin-left:40px"><p">Rate</p></div>
                      
                      <div style="justify-content: space-between; display: flex;">
                      <div style="display: inline-block;"><p>HSN NO</p></div>
                      <div style="display: inline-block;"><p>QTY</p></div>
                      <div style="display: inline-block;"><p>DISC</p></div>
                      <div style="display: inline-block;"><p>AMT</p></div>
                      </div>
                  </div>
                  <div style="text-align: center;"><p>**************************************************</p></div>
                  <div>
                      <p>${data}</p>
                  </div>
                  <div style="text-align: center;"><p>**************************************************</p></div>
                  <div style="justify-content: space-between; display: flex;padding: 2px;">
                      <p style="font-family: Verdana, sans-serif;font-size:medium;">Sub Total:</p>
                      <p style="font-family: Verdana, sans-serif;font-size:medium;">${invoiceDetails.grossAmt}</p>
                  </div>
                  <div style="text-align: center;"><p>**************************************************</p></div>
                  <div style="justify-content: space-between; display: flex;padding: 2px;">
                      <p style="font-family: Verdana, sans-serif;font-size:medium;">Rs.:</p>
                      <p style="font-family: Verdana, sans-serif;font-size:medium;">${invoiceDetails.grossAmt}</p>
                  </div>
                  <div style="justify-content: space-between; display: flex;padding: 2px;">
                      <p style="font-family: Verdana, sans-serif;font-size:medium;">T CGST Amt:</p>
                      <p style="font-family: Verdana, sans-serif;font-size:medium;">${invoiceDetails.cgstAmt}</p>
                  </div>
                  <div style="justify-content: space-between; display: flex;padding: 2px;">
                      <p style="font-family: Verdana, sans-serif;font-size:medium;">T SGST Amt:</p>
                      <p style="font-family: Verdana, sans-serif;font-size:medium;">${invoiceDetails.sgstAmt}</p>
                  </div>
                  <div style="justify-content: space-between; display: flex;padding: 2px;">
                      <p style="font-family: Verdana, sans-serif;font-size:medium;">Round Off:</p>
                      <p style="font-family: Verdana, sans-serif;font-size:medium;">${invoiceDetails.roundOff}</p>
                  </div>
                  <div style="justify-content: space-between; display: flex;padding: 2px;">
                      <p style="font-family: Verdana, sans-serif;font-size:medium;">Grand Total:</p>
                      <p style="font-family: Verdana, sans-serif;font-size:medium;">${invoiceDetails.grandTotolAmt}</p>
                  </div>
              </div>
          </body>
          
          </html>`
      })
    } catch (error) {
      console.log('error is :=>', error)
    }

  }
  //end of print pdf file************************************************************************


  return (
    <View style={{flex:1,backgroundColor:'white'}}>

      <ScrollView style={styles.constainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Invoice</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.space}>
            <Text style={styles.label}>Invoice No:</Text>{' '}
            {invoiceDetails.invoiceNo}
          </Text>
          <Text style={styles.space}>
            <Text style={styles.label}>Date:</Text>{' '}
            {moment(invoiceDetails.invoiceDate).format('DD/MM/YYYY')}{' '}
            {invoiceDetails.time}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={[styles.label, styles.space]}>
            {invoiceDetails.partyName}
          </Text>
          <Text style={styles.smallSpace}>
            {invoiceDetails.addressLine1} {invoiceDetails.addressLine2}{' '}
            {invoiceDetails.addressLine3} {invoiceDetails.city}{' '}
            {invoiceDetails.state} {invoiceDetails.country}{' '}
            {invoiceDetails.pinCode}
          </Text>
        </View>
        {invoiceDetails.items.map((item, index) => (
          <View style={[styles.section, styles.itemContainer]} key={item.itemId}>
            <View style={styles.itemDetails}>
              <Text numberOfLines={1} style={[styles.label, styles.space]}>
                {index + 1}). {item.itemName}
              </Text>
              <Text style={styles.smallSpace}>Qty: {parseInt(item.qty, 10)}</Text>
              <Text style={styles.smallSpace}>
                Rate: {parseFloat(item.rate).toFixed(2)}
              </Text>
            </View>
            <View style={styles.itemTotal}>
              <Text>Total: {parseFloat(item.rate * item.qty).toFixed(2)}</Text>
            </View>
          </View>
        ))}
        <View style={styles.finalAmountContainer}>
          <Text style={styles.finalAmount}>
            Total Amount: {parseFloat(invoiceDetails.grossAmt).toFixed(2)}
          </Text>
          <Text style={styles.finalAmount}>
            SGST: {parseFloat(invoiceDetails.sgstAmt).toFixed(2)}
          </Text>
          <Text style={styles.finalAmount}>
            CGST: {parseFloat(invoiceDetails.cgstAmt).toFixed(2)}
          </Text>
          <Text style={styles.finalAmount}>
            Grant Total: {parseFloat(invoiceDetails.grandTotolAmt).toFixed(2)}
          </Text>
        </View>
        <View style={styles.remarksContainer}>
          <Text>Remarks: {invoiceDetails.remarks}</Text>
        </View>

      </ScrollView>
      <View style={styles.invoiceBtn}>
        <Button mode="contained" onPress={() => printHtmls()}>Print Invoice</Button>
      </View>
    </View>
  );
}
export default InvoiceDetails;

const styles = StyleSheet.create({
  constainer: {
    padding: 10,
    backgroundColor: theme.colors.background,
    flex:0.9,
    // position:'relative',
  },
  headingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontFamily: theme.fonts.medium.fontFamily,
  },
  section: {
    borderTopWidth: 1.5,
    borderTopColor: theme.colors.divider,
    padding: 10,
    paddingTop: 20,
  },
  space: {
    marginBottom: 10,
  },
  smallSpace: {
    marginBottom: 6,
    marginLeft: 8,
  },
  label: {
    fontFamily: theme.fonts.medium.fontFamily,
    fontSize: 18,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTotal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  finalAmountContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'column',
    paddingTop: 20,
    borderTopWidth: 2,
    borderTopColor: theme.colors.divider,
    alignItems: 'flex-end',
    marginRight: 10,
  },
  finalAmount: {
    fontFamily: theme.fonts.medium.fontFamily,
    fontSize: 16,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
    marginBottom: 30,
  },
  cancelBtn: {
    width: '45%',
    backgroundColor: theme.colors.warning_red,
    color: theme.colors.background,
  },
  saveBtn: {
    width: '45%',
    backgroundColor: theme.colors.primary,
  },
  cancelContainer: {
    backgroundColor: theme.colors.background,
    padding: 10,
    paddingBottom: 40,
    paddingTop: 20,
    margin: 5,
    alignItems: 'center',
  },
  modalContainer: {
    margin: 0,
  },
  IconBtn: {
    alignSelf: 'center',
  },
  itemDetails: {
    width: '65%',
  },
  modalBtnContainer: {
    marginTop: 30,
  },
  remarksContainer: {
    marginTop: 40,
  },
  deleteBtn: {
    marginTop: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 200,
    backgroundColor: theme.colors.warning_red,
  },
  confirmBtn: {
    marginTop: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 200,
    backgroundColor: theme.colors.primary,
  },
  invoiceBtn: {
    width: 270,
    height: 60,
    borderColor: 'gainsboro',
    borderRadius: 6,
    marginTop: 22,
    marginLeft: 64,
    flex:0.1,
  }
});
