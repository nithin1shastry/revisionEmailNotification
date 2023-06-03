function sendEmail() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ProblemTracker");
  var range = sheet.getDataRange();
  var values = range.getValues();
  var today = new Date();
  var currentMonth = today.getMonth() + 1; 
  //Fetch "To Repeat" Column index from google sheet. Emails are sent based on the date present in this column. 
  var toRepeatColumnIndex = 8;
  //Fetch "Problem" Column from google sheet. Emails have the problem title which are fetched from this column.
  var problemColumnIndex = 2;
  var count = 0;
  var problemsToSolve = []; // Array to store problems that need to be solved.
  var problemsSolvedDateIndex = 1;
  var problemCount = 0;
  var currentMonth = today.getMonth() + 1; 

  for (var i = 1; i < values.length; i++) {
    var row = values[i];

    //Logic to obtain number of problems completed in the current month
    var problemSolvedDate = new Date(row[problemsSolvedDateIndex]);
    var month = problemSolvedDate.getMonth() + 1;

    if (currentMonth === month)
       problemCount += 1;
    
    //Logic to obtain list of problems
    var repeatDate = new Date(row[toRepeatColumnIndex]);
    if (repeatDate.toDateString() === today.toDateString()) {
      var problemCell = sheet.getRange(i+1, problemColumnIndex+1);
      var problem = problemCell.getValue();
      var richTextValue = problemCell.getRichTextValue();
      count+=1;
      problemsToSolve.push(count+". " + problem + " - "+richTextValue.getLinkUrl());
    }
    
  }

  if (problemsToSolve.length > 0) { // Send email only if there are problems to solve.
    var subject = "Daily Problems - " + today.toDateString();
    var body = "The following problems need to be solved today:\n\n" + problemsToSolve.join("\n\n");
    body += "\n\nNumber of problems completed this month: " + problemCount;
    MailApp.sendEmail(Session.getActiveUser().getEmail(), subject, body);
  }
  else{
    var subject = "Daily Problems - " + today.toDateString();
    var body = "No revision required";
    body += "\n\nNumber of problems completed this month: " + problemCount;
    MailApp.sendEmail(Session.getActiveUser().getEmail(), subject, body);
  }
}





