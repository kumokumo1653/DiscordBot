function event(){
  Trigger();
  //スプレッドシートのid
  var spreadsheet = SpreadsheetApp.openById(ssid);
  var sheet = spreadsheet.getActiveSheet();
  let lr = sheet.getLastRow();
  let data = sheet.getRange(1,1,lr,4).getValues();
  let now = new Date();
  let today = new Date(now.getFullYear(),now.getMonth(),now.getDate());
  let three = new Date(now.getFullYear(),now.getMonth(),now.getDate());
  three.setDate(today.getDate() + 3);
  console.log(today);
  console.log(three);
  let status = "Apex Legends";
  for(let i = 0; i < lr; i++){
    let date = new Date(data[i][1], data[i][2] - 1, data[i][3]);
    if(date.getTime() == today.getTime()){
      var json = {
        "title":data[i][0],
        "type" : "event",
        "limit" : "today"
      };
      sendGlitch(GLITCH_URL, json);
    }
    if(date.getTime() == three.getTime()){
      var json = {
        "title":data[i][0],
        "type" : "event",
        "limit" : "three"
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
  setTime.setHours(8);
  setTime.setMinutes(00); 
  ScriptApp.newTrigger('event').timeBased().at(setTime).create();  
}