function scraping(){
    Trigger();
    var spreadsheet = SpreadsheetApp.openById(ssid);
    var csheet = spreadsheet.getSheetByName("c");
    let clr = csheet.getLastRow();
    let cdata = csheet.getRange(1,1,clr,5).getValues();
    let ssheet = spreadsheet.getSheetByName("s");
    let slr = ssheet.getLastRow();
    let sdata = ssheet.getRange(1,1,slr,5).getValues();
    var response = UrlFetchApp.fetch(RSS_URL);
    var xml = XmlService.parse(response.getContentText());
    var entries = xml.getRootElement().getChildren("channel")[0].getChildren("item");
    var length = entries.length;
    for(var i = 0; i < length; i++) {
        var title = entries[i].getChildText("title");
   
        var course = title.match(/[ＭＥＳＪＣ]|４年全クラス/)[0];
      
      if (course == "Ｊ" || course == "４年全クラス"){
        var content = entries[i].getChildText("description");
        var date = content.match(/[0-9]/gi);
        var year = parseInt(date.slice(0, 4).join(""));
        var month = parseInt(date.slice(4, 6).join(""));
        var day = parseInt(date.slice(6, 8).join(""));
        var koma = (()=>{
            //コマの始めの限目からコマ数取得
            return parseInt((parseInt(date.slice(8, 9)) + 1) / 2);

        })();
        
        if(title.substr(0, 2) == "補講"){
            let flag = false;
            for(let i = 0; i < sdata.length;i++){
                if(sdata[i][1] == year && sdata[i][2] == month && sdata[i][3] == day && sdata[i][4] == koma)
                    flag = true;
            }
          if (!flag){
            let data = new Array(5);
            data[0] = /.*?:(.*?)\[.*?/.exec(title)[1];
            data[1] = year;
            data[2] = month;
            data[3] = day;
            data[4] = koma;
            console.log(data);
            
            ssheet.appendRow(data);
            var range = ssheet.getRange(1,1,slr + 1,5);
            slr++;
            range.sort([2, 3, 4]);
          }
        }else if(title.substr(0, 2) == "休講"){
            let flag = false;
            for(let i = 0; i < cdata.length;i++){
                if(cdata[i][1] == year && cdata[i][2] == month && cdata[i][3] == day && cdata[i][4] == koma)
                    flag = true;
            }
          if (!flag){
            let data = new Array(5);
            data[0] = /.*?:(.*?)\[.*?/.exec(title)[1];
            data[1] = year;
            data[2] = month;
            data[3] = day;
            data[4] = koma;
            console.log(data);

            csheet.appendRow(data);
            var range = csheet.getRange(1,1,clr + 1,5);
            clr++;
            range.sort([2, 3, 4]);
          }
        }
      }
    }
}

function Trigger(){
  var setTime = new Date();
  setTime.setDate(setTime.getDate() + 1)
  setTime.setHours(0);
  setTime.setMinutes(00); 
  ScriptApp.newTrigger('event').timeBased().at(setTime).create();  
}