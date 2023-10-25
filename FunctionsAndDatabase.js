   

      let DataSet1 = JSON.parse(localStorage.getItem('DataSet'));
      
      if (DataSet1 === null){
        DataSet1 = [
        {
          username: "BeastPro10",
          password: "password123",
          score: 2500
        },
        {
          username: "JohnDoe",
          password: "password1234",
          score: 2750
        },
        {
          username: "MightyMax680",
          password: "password3",
          score: 300
        },
        
      ]
      }
      const DatasetStringified = JSON.stringify(DataSet1);
      localStorage.setItem('DataSet',DatasetStringified);
      const DataSetLength = JSON.parse(localStorage.getItem('DataSet')).length;
      const DataSetMain = JSON.parse(localStorage.getItem('DataSet'));

let DataFormat = {
  username: undefined,
  password: undefined,
  score: undefined
}

let loggedUser = undefined;
var NewUser = [];

DataFormat.username = "tester";
DataFormat.password = "password12";
DataFormat.score = 0; 

NewUser.push(DataFormat);

// var stored = DataSetMain;
// stored.push(DataFormat);

// localStorage.setItem('DataSet', JSON.stringify(stored));
// console.log(DataSetMain)

function addUser(username, password){

  var stored = DataSetMain;
  DataFormat.username = username;
  DataFormat.password = password;
  DataFormat.score = 0; 
  stored.push(DataFormat);
  localStorage.setItem('DataSet', JSON.stringify(stored));
  console.log(DataSetMain)
}
//addUser("mysterylights", "loltrey");

function createUser(username, password, retype){
if (userFind(username) === false && password === retype) {
  console.log("creating account..")
  var stored = DataSetMain;
  DataFormat.username = username;
  DataFormat.password = password;
  DataFormat.score = 0; 
  stored.push(DataFormat);
  localStorage.setItem('DataSet', JSON.stringify(stored));
  console.log(DataSetMain);
  loggedUser = username;
  window.location.href = "loggedinpage.html";
}else if (userFind(username) === true) {
  console.log("user already exists! choose different name");
}else if (password != retype){
  console.log("wrong password enter again!");
}
  
}

let removeUserNumber = 0;
function removeUser(username){
  if (removeUserNumber >= 0 && removeUserNumber < DataSetLength && DataSetMain[removeUserNumber].username != username) {
    
    console.log(DataSetMain[removeUserNumber].username)
    removeUserNumber++;
    removeUser(username);
    
  }else if (removeUserNumber === DataSetLength){
    console.log("user doesnt exist")
    removeUserNumber = 0;
    
  }else if (DataSetMain[removeUserNumber].username === username){

    console.log("user found...removing")
    var NewData = undefined;
    NewData = DataSetMain.splice(removeUserNumber, 1);
    removeUserNumber = 0;
    localStorage.setItem('DataSet', JSON.stringify(NewData));
    console.log(DataSetMain);
  }
}

  console.log()
  console.log(true == 0);
  console.log(DataSetLength);
  
 

  
  console.log(DataSetMain.sort(function(a, b){return b.score-a.score}))
  let currentNum = 0;
  let flexibleNum = 0;
  let mainUser = "";

  function AllUsers(cnum){
  if (currentNum >= 0 && currentNum < DataSetLength) {
    console.log(DataSetMain[currentNum].username)
    currentNum++;
    AllUsers();
  }else{
    console.log("user not exist")
    return "user does not exist";
  }
}

//AllUsers();

function SpecificUser(cnum, user, pass){
  if (currentNum >= 0 && currentNum < DataSetLength && DataSetMain[currentNum].username != user) {
    
    console.log(DataSetMain[currentNum].username)
    currentNum++;
    SpecificUser(cnum, user, pass);
    
  }else if (currentNum === DataSetLength){
    console.log("No users found")
    currentNum = 0;
    document.getElementById('tryagaintext').innerHTML = 'Wrong username or password, Try again.';
  }else if (DataSetMain[currentNum].username === user){
    console.log("user found")
    flexibleNum = currentNum;
    currentNum = 0;
    PasswordCompare(flexibleNum, pass)
  }
}

function UserChecker(cnum, user, pass){
  if (currentNum >= 0 && currentNum < DataSetLength && DataSetMain[currentNum].username != user) {
    
    console.log(DataSetMain[currentNum].username)
    currentNum++;
    UserChecker(cnum, user, pass);
    
  }else if (currentNum === DataSetLength){
    console.log("user does not exist.")
    currentNum = 0;
    

  }else if (DataSetMain[currentNum].username === user){
    console.log("user exists, try again")
    currentNum = 0;
    return "exists";
  }
}

function userFind(user){
  if (currentNum >= 0 && currentNum < DataSetLength && DataSetMain[currentNum].username != user) {
    
    console.log(DataSetMain[currentNum].username)
    currentNum++;
    userFind(user);
    
  }else if (currentNum === DataSetLength){
    console.log("user does not exist.")
    currentNum = 0;
    return false;

  }else if (DataSetMain[currentNum].username === user){
    console.log("user exists")
    currentNum = 0;
    return true;
  }
}



console.log(JSON.parse(localStorage.getItem('DataSet')))
document.getElementById("leaderboardID").innerHTML = document.getElementById("leaderboardID").innerHTML + "\n#4" + "\n#5" + "\n#6" + "\n#7" + "\n#8" + "\n#9" + "\n#10";

let LeaderIndex = 0;
let hasSetLeader = 0;
function SetLeaderboard(){
  if (hasSetLeader === 0 && LeaderIndex >= 0 && LeaderIndex < DataSetLength){
    const UserNumber = DataSetMain[LeaderIndex].username;
    const UserScore = DataSetMain[LeaderIndex].score;
    console.log(DataSetMain[LeaderIndex].username)
    document.getElementById("leadernameID").innerHTML = document.getElementById("leadernameID").innerHTML + `\n${UserNumber}`
    document.getElementById("leaderscoreID").innerHTML = document.getElementById("leaderscoreID").innerHTML + `\n${UserScore}`
    LeaderIndex++;
    SetLeaderboard();
  }
}
SetLeaderboard();
function PasswordCompare(userIndex, pass){
  if (DataSetMain[userIndex].password === pass && document.getElementById("logorsigID").innerHTML === "Login") {
    console.log("correct pass... logging in")
    mainUser = DataSetMain[userIndex].username;
  }else if (DataSetMain[userIndex].password != pass){
    console.log("wrong pass... try again.")
    document.getElementById('tryagaintext').innerHTML = 'Wrong username or password, Try again.';
  }
}



//console.log(DataSetMain[1].password === "password1234")
//console.log(currentNum === DataSetLength)
console.log(currentNum >= 0 && currentNum < DataSetLength && DataSetMain[currentNum].username != "user3")
console.log(currentNum)
console.log(flexibleNum)


    function GameStart(playerUsername){
      console.log("game starting")
    }
    function GameEnd(currentScore){

    }
    //console.log(document.getElementById("passwordentered").value)
    //console.log(document.getElementById("usernameentered").value)


    function loginToAccount(username, password){
      if (document.getElementById("usernameentered").value === AllUsers() && document.getElementById("passwordentered").value) {
        
      }
    }
    function createAccount(username, password, retype){
      if (password === retype) {
        console.log("creating account.")
        
      }
    }
    
    function saveUser(username, password, id){
      localStorage.setItem('user', username)
    }
    
    