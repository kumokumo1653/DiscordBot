function event(){
  Trigger();
  //スプレッドシートのid
  var spreadsheet = SpreadsheetApp.openById(ssid);
  var sheet = spreadsheet.getSheetByName("c");
  let lr = sheet.getLastRow();
  let data = sheet.getRange(1,1,lr,5).getValues();
  let now = new Date();
  let today = new Date(now.getFullYear(),now.getMonth(),now.getDate());
  let tomorrow = new Date(now.getFullYear(),now.getMonth(),now.getDate());
  tomorrow.setDate(today.getDate() + 1);


  for(let i = 0; i < lr; i++){
    let date = new Date(data[i][1], data[i][2] - 1, data[i][3]);
    if(date.getTime() == tomorrow.getTime()){
      var json = {
        "title":data[i][0],
        "year" : data[i][1],
        "month" : data[i][2],
        "day" : data[i][3],
        "koma": data[i][4],
        "type" : "class_c",
        "limit" : "tomorrow"
      };
      sendGlitch(GLITCH_URL, json);
    }
    if(date.getTime() == today.getTime()){
      var json = {
        "title":data[i][0],
        "year" : data[i][1],
        "month" : data[i][2],
        "day" : data[i][3],
        "koma": data[i][4],
        "type" : "class_c",
        "limit" : "tomorrow"
      };
      sendGlitch(GLITCH_URL, json);

    }
  }
  sheet = spreadsheet.getSheetByName("s");
  lr = sheet.getLastRow();
  data = sheet.getRange(1,1,lr,5).getValues();
  for(let i = 0; i < lr; i++){
    let date = new Date(data[i][1], data[i][2] - 1, data[i][3]);
    if(date.getTime() == tomorrow.getTime()){
      var json = {
        "title":data[i][0],
        "year":data[i][1],
        "month":data[i][2],
        "day":data[i][3],
        "koma": data[i][4],
        "type" : "class_s",
        "limit" : "tomorrow"
      };
      sendGlitch(GLITCH_URL, json);
    }
    if(date.getTime() == today.getTime()){
      var json = {
        "title":data[i][0],
        "year":data[i][1],
        "month":data[i][2],
        "day":data[i][3],
        "koma": data[i][4],
        "type" : "class_s",
        "limit" : "tomorrow"
      };
      sendGlitch(GLITCH_URL, json);
    }
  }
}
function sendGlitch(uri, json){
 var params = {
   'contentType' : 'application/json; charset=utf-8',
   'method' : 'post',
   'payload' : json,
   'muteHttpExceptions': true
 };
 response = UrlFetchApp.fetch(uri, params);
}



function Trigger(){
  var setTime = new Date();
  setTime.setDate(setTime.getDate() + 1)
  setTime.setHours(6);
  setTime.setMinutes(00); 
  ScriptApp.newTrigger('event').timeBased().at(setTime).create();  
}