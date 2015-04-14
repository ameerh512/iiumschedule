/*! iiumschedule 2015-04-14 */
function makearray(length){for(var thearray=[],i=0;length>i;)thearray.push(""),i+=1;return thearray}function makemessage(message,loading){console.log("Message ->"+message.toString()),void 0===loading&&(loading=!0),$("#iiumschedulediv").length||$("body").append("<div id='iiumschedulediv' style='width:100%;text-align:center;margin-top:10px;'></div>");var poststring="";loading&&(poststring="</br><img src='http://iiumschedule.asdacap.com/static/loading.gif'></img>"),$("#iiumschedulediv").html(message+poststring)}function fixstring(text){return console.log("Fix string->"+text),result=text.replace(/([\x00-\x7F]|[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3})|./g,"$1"),console.log("Result->"+result),result}function error(e,vol){globerr=e,$("#iiumschedulediv").length||$("body").append("<div id='iiumschedulediv' style='width:100%;text-align:center;margin-top:10px;'></div>");var maindiv=$("#iiumschedulediv");maindiv.html(""),void 0!==vol?(maindiv.append("<h3>Reports...</h3>"),maindiv.append("<p>Please click ok to continue <br /> WARNING: By default, this WILL include your CRS. To exclude your CRS, after you click ok, empty the section 'HTML Data'</p>")):(maindiv.append("<h3>Error detected...</h3>"),maindiv.append("<p>Sorry, an error occur. Would you be so kind to send me some data to help fix this bug? <br /> WARNING: this WILL include your CRS</p>"));var button=$("<button>Ok</button>");maindiv.append(button),maindiv.append("<span>(If not ok, just close this window)</span>"),button.click(function(){var container=$("<div class='tempanimcont'>");maindiv.children().wrap(container),maindiv.find(".tempanimcont").slideUp(1e3,function(){maindiv.find(".tempanimcont").remove()});var theform=$("<form>");theform.attr("method","POST"),theform.attr("action","http://iiumschedule.asdacap.com/error/"),theform.append("<label for='submitter'>Your Name</label><input type='text' name='submitter' value=''></input><br />"),theform.append("<label for='add'>Anything else to add? Description maybe?</label><br /><textarea cols='30' rows='5' name='add'>Insert complain here</textarea><br />"),theform.append("<label for='error'>Error Description</label><input type='text' name='error' value='"+e.toString()+"'></input><br />"),theform.append("<label for='html'>HTML data</label><br /><textarea cols='30' rows='5' name='html'></textarea><br />"),theform.find("textarea[name=html]").val($("body").html()),theform.append("<input name='submit' type='submit' value='submit'></input>"),maindiv.append(theform)})}function start(){if($("#TB_window iframe").length)$("#TB_window iframe")[0].contentWindow.eval("(function(){var e=document.createElement('script');e.src = 'http://iiumschedule.asdacap.com/static/scheduleformatter.js';e.type='text/javascript';e.addEventListener('load',function(){startscheduler()} );document.getElementsByTagName('head')[0].appendChild(e);})();");else try{parsetable()}catch(e){error(e)}}function parsetable(){if(makemessage("Validating path"),"prereg.iium.edu.my"==window.location.host)return void makemessage("<h3>Wrong Usage</h3>Please use the code on the CRS/Confirmation Slip page from MyIIUM, not from prereg slip.",!1);if(/^\/portal\/page\/portal\//.exec(window.location.pathname))return void makemessage("<h3>Wrong Usage</h3>Please use the code on the CRS/<a target='_blank' href='/phpaps/run_rep_list.php?rep_key=confslip1&keepThis=true&TB_iframe=true&height=630&width=900'>Confirmation Slip</a> page.<br />Not on the main portal page.",!1);if($("form input[value=confslip1]").length)return void makemessage("<h3>Wrong Usage</h3>Please select a session first",!1);if(!$("body table").length||!$("body table").find("tr").length)return void makemessage("Error, no table found. Are you sure this is the schedule?<br>If you are, please <a href='javascript:error(\"Voluntary Error Report\",1)'>send an error report</a> so that I can fix thi.",!1);if(1!=$("body table").length)return void makemessage("Error, page unrecognized. Are you sure this is the schedule?<br>If you are, please <a href='javascript:error(\"Voluntary Error Report\",1)'>send an error report</a> so that I can fix this.",!1);makemessage("Parsing table, please wait...");var tablearray=[],rows=$("body table").find("tr"),maxcollength=0;rows.each(function(){var cur=0;$(this).find("td").each(function(){$(this).attr("colspan")?cur+=parseInt($(this).attr("colspan"),10):cur++}),cur>maxcollength&&(maxcollength=cur)});var columnlength=maxcollength;columnlength!=defaultcolumnlength&&console.log("Warning! Different column length than default : "+columnlength);for(var i=0;i<rows.length;)tablearray.push(makearray(columnlength)),i+=1;rows.each(function(index){var therow=$(this),columns=therow.find("td"),ci=0;columns.each(function(){var thecolumn=$(this),colspan=1;thecolumn.attr("colspan")&&(colspan=parseInt(thecolumn.attr("colspan"),10));var rowspan=1;thecolumn.attr("rowspan")&&(rowspan=parseInt(thecolumn.attr("rowspan"),10));for(var cspi=0;colspan>cspi;){for(var rspi=0;rowspan>rspi;)0===cspi&&0===rspi||(""===tablearray[index+rspi][ci+cspi]?tablearray[index+rspi][ci+cspi]="none":console.log("warning, table array on rspi/cspi"+(index+rspi).toString()+"/"+(ci+cspi).toString()+" is not empty->"+tablearray[index+rspi][ci+cspi])),rspi+=1;cspi+=1}tablearray[index][ci]=0===thecolumn.children().length&&""===thecolumn.text()?"none":thecolumn,ci+=colspan;for(var nextci=ci+1;columnlength>nextci&&"none"==tablearray[index][ci];)ci=nextci,nextci=ci+1})});var rowtextlist=[];rows.each(function(){var therow=$(this),columns=therow.find("td"),rowtext=[];columns.each(function(){var thecolumn=$(this);0===thecolumn.children().length&&""===thecolumn.text()||rowtext.push(thecolumn.text())}),rowtextlist.push(rowtext)});var studentname=rowtextlist[8][2];if(void 0===studentname)return void makemessage("Error! cannot find student name.",!1);console.log("Student name is->"+studentname);var matricplusic=fixstring(rowtextlist[6][2]),matcher=/\s*(\d+)IC.PassportNo\.\:(\d*)\s*/,match=matcher.exec(matricplusic),matricnumber=match[1],icnumber=match[2],sessionplusprogram=fixstring(rowtextlist[4][0]);console.log(sessionplusprogram),matcher=/Session\s*:\s*(\d+\/\d+)Semester\s*:\s*(\d+)/,match=matcher.exec(sessionplusprogram);var session=match[1],semester=match[2],program=fixstring(rowtextlist[6][5]);console.log(program);var scheduletype,printedby=fixstring(rowtextlist[2][0]),cfsmatcher=/Printedby\d{6}on([^,]+),.+/,maincampusmatcher=/Printedby\d{7}on([^,]+),.+/,cfsmatch=cfsmatcher.exec(printedby),maincampusmatch=maincampusmatcher.exec(printedby),coursearray=[];if(cfsmatch){makemessage("Looks like a cfs slip.");{cfsmatch[1]}scheduletype="CFS";for(var starttableindex=0;"none"==tablearray[starttableindex][1]||0===tablearray[starttableindex][1].children("hr").length;){if(starttableindex>=tablearray.length)return void alert("Fail to find start table index");starttableindex+=1}console.log("starttableindex->"+starttableindex.toString());for(var endtableindex=starttableindex;"none"==tablearray[endtableindex][20]||"Total"!=tablearray[endtableindex][20].text();){if(endtableindex>=tablearray.length)return void alert("Fail to find end table index");endtableindex+=1}console.log("endtableindex->"+endtableindex.toString());for(var currentcourse=0,i=starttableindex+1;endtableindex>i;){if("none"!=tablearray[i][2]&&(0!==currentcourse&&(console.log("Schedule found->"+JSON.stringify(currentcourse)),coursearray.push(currentcourse)),currentcourse={code:tablearray[i][2].text(),section:tablearray[i][9].text(),title:tablearray[i][17].text(),credithour:tablearray[i][26].text(),schedule:[]}),"none"!=tablearray[i][28]){var starttime=parseInt(tablearray[i][34].text(),10),parseendtime=/^[^\d]*(\d+)[^\d]*$/.exec(tablearray[i][36].text());parseendtime||(console.log("Warning, end time for "+tablearray[i][2].text()+" miraculously missing. Using column 35"),tablearray[i][35]&&(parseendtime=/^[^\d]*(\d+)[^\d]*$/.exec(tablearray[i][35].text()))),parseendtime||(console.log("Still nothing. Using column 37"),tablearray[i][37]&&(parseendtime=/^[^\d]*(\d+)[^\d]*$/.exec(tablearray[i][37].text())));var endtime;parseendtime?endtime=parseInt(parseendtime[1],10):(console.log("Still missing. Lets just say it use 1 hour."),endtime=starttime+1),8>starttime&&(starttime+=12),8>endtime&&(endtime+=12);var venue=tablearray[i][46].text(),newschedule={day:tablearray[i][28].text(),start:starttime,end:endtime,venue:venue};currentcourse.schedule.push(newschedule)}i+=1}console.log("Schedule found->"+JSON.stringify(currentcourse)),coursearray.push(currentcourse)}else{if(!maincampusmatch)throw"Unknown Schedule Type, match string -> "+printedby;makemessage("Looks like a main campus slip.");{maincampusmatch[1]}scheduletype="MAINCAMPUS";for(var starttableindex=0;"Course"!=rowtextlist[starttableindex][0];){if(starttableindex>=tablearray.length)return void alert("Fail to find start table index");starttableindex+=1}starttableindex+=2,console.log("starttableindex->"+starttableindex.toString());for(var endtableindex=starttableindex;"Total"!=rowtextlist[endtableindex][0];){if(endtableindex>=tablearray.length)return void alert("Fail to find end table index");endtableindex+=1}console.log("endtableindex->"+endtableindex.toString());for(var currentcourse,coursearray=[],addschedule=function(starttime,endtime,venue,rawday){function make_long(d){if("M"==d)return"MON";if("T"==d)return"TUE";if("W"==d)return"WED";if("TH"==d)return"THUR";if("F"==d)return"FRI";if("SN"==d)return"SUN";if("S"==d)return"SAT";throw"Unknown day ->"+d}if(void 0===currentcourse)return void console.log("WARNING:Attempt to add schedule to current course when there is no current course");var days=[];if(/\s*(MON|TUE|WED|THUR|FRI|SAT|SUN)\s*/.exec(rawday))days.push(rawday);else if(/\s*(MON|TUE|WED|THUR|FRI|SAT|SUN)-(MON|TUE|WED|THUR|FRI|SAT|SUN)\s*/.exec(rawday)){var execed=/\s*(MON|TUE|WED|THUR|FRI|SAT|SUN)-(MON|TUE|WED|THUR|FRI|SAT|SUN)\s*/.exec(rawday);days.push(make_long(execed[1])),days.push(make_long(execed[2]))}else if(/\s*(M|TH|W|T|F|SN|S)\s*-\s*(M|TH|W|T|F|SN|S)\s*-\s*(M|TH|W|T|F|SN|S)\s*/.exec(rawday)){var execed=/\s*(M|TH|W|T|F|SN|S)\s*-\s*(M|TH|W|T|F|SN|S)\s*-\s*(M|TH|W|T|F|SN|S)\s*/.exec(rawday);days.push(make_long(execed[1])),days.push(make_long(execed[2])),days.push(make_long(execed[3]))}else if(/\s*(M|TH|W|T|F|SN|S)\s*-\s*(M|TH|W|T|F|SN|S)\s*/.exec(rawday)){var execed=/\s*(M|TH|W|T|F|SN|S)\s*-\s*(M|TH|W|T|F|SN|S)\s*/.exec(rawday);days.push(make_long(execed[1])),days.push(make_long(execed[2]))}else if("TWF"==rawday)days.push("TUE"),days.push("WED"),days.push("THUR");else{if(-1=="MTWTHF".indexOf(rawday))throw"Unknown day format ->"+rawday;var idx="MTWTHF".indexOf(rawday),length=rawday.length;-1!=rawday.indexOf("TH")&&length--,"F"==rawday&&(idx-=1);for(var dayidx=["MON","TUE","WED","THUR","FRI"],i2=idx;idx+length>i2;)days.push(dayidx[i2]),i2++}_.each(days,function(day){var newschedule={day:day,start:starttime,end:endtime,venue:venue};currentcourse.schedule.push(newschedule)})},i=starttableindex+1;endtableindex>i;){var endtime,currow=rowtextlist[i];if(0===rowtextlist[i].length&&(void 0!==currentcourse&&coursearray.push(currentcourse),currentcourse=void 0),10==rowtextlist[i].length){currentcourse={code:currow[0],section:currow[1],title:currow[3],credithour:currow[4],schedule:[]};var starttime=parseFloat(currow[6],10),parseendtime=/^\D*([0-9\.]+)\D*$/.exec(currow[7]);parseendtime?endtime=parseFloat(parseendtime[1],10):(console.log("Missing end time. Lets just say it use 1 hour."),endtime=starttime+1),"PM"==currow[8]&&12>starttime&&12>endtime&&(starttime+=12,endtime+=12);var venue=currow[9],rawday=currow[5];addschedule(starttime,endtime,venue,rawday)}if(5==rowtextlist[i].length){var starttime=parseFloat(currow[1],10),parseendtime=/^\D*([0-9\.]+)\D*$/.exec(currow[2]);parseendtime?endtime=parseFloat(parseendtime[1],10):(console.log("Missing end time. Lets just say it use 1 hour."),endtime=starttime+1),"PM"==currow[3]&&12>starttime&&12>endtime&&(starttime+=12,endtime+=12);var venue=currow[4],rawday=currow[0];addschedule(starttime,endtime,venue,rawday)}i+=1}void 0!==currentcourse&&coursearray.push(currentcourse),currentcourse=void 0,console.log("Schedule found->"+JSON.stringify(coursearray))}var data=JSON.stringify({studentname:studentname,coursearray:coursearray,matricnumber:matricnumber,ic:icnumber,session:session,semester:semester,program:program,scheduletype:scheduletype});makemessage("Saving schedule...please wait..."),$.ajax({url:"http://iiumschedule.asdacap.com/scheduleformatter/",type:"POST",data:{data:data},success:function(response){var thetoken=response;makemessage("Done! Please click <a target='_blank' href='http://iiumschedule.asdacap.com/scheduleformatter/?token="+thetoken+"' >this link</a> to continue.<br />Or, <a href='javascript:error(\"Voluntary Error Report\",1)'>Click here</a> to report incorrect result or simply to comments and stuff.",!1)},error:function(err,textstatus){makemessage("Error saving schedule ->"+textstatus+" . The server may be down. Please try again later.",!1)}})}var defaultcolumnlength=52;