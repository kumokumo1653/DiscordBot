function doPost(e) {
  
  //スプレッドシートのid
  var spreadsheet = SpreadsheetApp.openById(ssid);
  var sheet = spreadsheet.getActiveSheet();
  var params = JSON.parse(e.postData.getDataAsString());
  let addflag = true;
  let delflag = false;
  let lr = sheet.getLastRow();
  let data;
  if(lr != 0){
    data = sheet.getRange(1,1,lr,4).getValues();
    for(let i = 0; i < lr; i++){
      if(data[i][0] == params.title){
        addflag = false;
        delflag = true;
      }
    }
  }else{
    addflag = true;
    delflag = false;
  }
  if(params.type == "add"){
    if(addflag){
      let data = new Array(4);
      data[0] = params.title;
      data[1] = params.year;
      data[2] = params.month;
      data[3] = params.day;
      sheet.appendRow(data);
      var range = sheet.getRange(1,1,lr + 1,4);
      range.sort([2, 3, 4]);
      var response = {
        data: params.title,
        meta: { status: 'success' }
      };
      return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
    }else{
      var response = {
        data: params.title,
        meta: { status: 'failed' }
      };
      return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  if(params.type == "delete"){
    if(delflag){
      //A列の最終行を取得
      console.log(params.title);
      for(let i = 0; i < lr; i++){
        if(data[i][0] == params.title){
          sheet.deleteRows(i + 1);
          sheet.insertRows(lr + 1);
          break;
        }
      }
        var response = {
          data: params.title,
          meta: { status: 'success' }
        };
        return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
    }else{
      var response = {
        data: params.title,
        meta: { status: 'failed' }
      };
      return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
    }
  }
  var response = {
    data: params.title,
    meta: { status: 'failed' }
    };
    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
  
}

function doGet(e){
  //スプレッドシートのid
  var spreadsheet = SpreadsheetApp.openById(ssid);
  var sheet = spreadsheet.getActiveSheet();
  let lr = sheet.getLastRow();
  let data = sheet.getRange(1,1,lr,4).getValues();
  var response = {
    data: JSON.stringify(data),
    meta: { status: 'success' }
  };
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
}