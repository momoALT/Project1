

//-------------------------DATASET INITIALIZATION AND SET UP----------------------

let currentUser = undefined; // Current user logged in.




if (localStorage.getItem("DataSet") === "null") { //If Dataset does not exist, creates brand new Dataset.
  let d1 = [
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
console.log('made')
  localStorage.setItem('DataSet', JSON.stringify(d1))
  
};

let DataSet1 = JSON.parse(localStorage.getItem('DataSet')); // main Dataset initialized
const DatasetStringified = JSON.stringify(DataSet1); // Converts Dataset into string
localStorage.setItem('DataSet', DatasetStringified); // Adds Dataset into Localstorage
const DataSetLength = JSON.parse(localStorage.getItem('DataSet')).length; // Converts Dataset back to object and gets length of Dataset.
const DataSetMain = JSON.parse(localStorage.getItem('DataSet')); //Converts Dataset back to an Object.



let DataFormat = { // Format for creating new users.
  username: undefined,
  password: undefined,
  score: undefined
}

let loggedUser = undefined; // The current user, changes to logged in username
var NewUser = [];

DataFormat.username = "tester";
DataFormat.password = "password12";
DataFormat.score = 0;

NewUser.push(DataFormat);

// var stored = DataSetMain;
// stored.push(DataFormat);

// localStorage.setItem('DataSet', JSON.stringify(stored));
// console.log(DataSetMain)



//-----------------------------FUNCTIONS------------------------------


//addUser function, instantly adds user through console (used for recovering deleted users)
function addUser(username, password) {

  var stored = DataSetMain;
  DataFormat.username = username;
  DataFormat.password = password;
  DataFormat.score = 0;
  stored.push(DataFormat);
  localStorage.setItem('DataSet', JSON.stringify(stored));
  console.log(DataSetMain)
}
//addUser("mysterylights", "loltrey");

//createUser function, main function for creating a new user
function createUser(username, password, retype) {
  userFind(username);
  if (userFoundValue === false && password === retype) {
    console.log("creating account..")
    var stored = DataSetMain;
    DataFormat.username = username;
    DataFormat.password = password;
    DataFormat.score = 0;
    stored.push(DataFormat);
    localStorage.setItem('DataSet', JSON.stringify(stored));
    console.log(DataSetMain);
    userFoundValue = undefined;
    currentUser = username;
    localStorage.setItem('user', currentUser)
    window.location.href = "../HTML/loggedinpage.html";

    localStorage.setItem('user', currentUser)
  } else if (userFoundValue === true) {
    console.log("user already exists! choose different name");
    userFoundValue = undefined;
  } else if (password != retype) {
    console.log("wrong password enter again!");
    userFoundValue = undefined;
  }

}

//Remove User Function, removes specific users in existing dataset
let removeUserNumber = 0;
function removeUser(username) {
  if (removeUserNumber >= 0 && removeUserNumber < DataSetLength && DataSetMain[removeUserNumber].username != username) {

    console.log(DataSetMain[removeUserNumber].username)
    removeUserNumber++;
    removeUser(username);

  } else if (removeUserNumber === DataSetLength) {
    console.log("user doesnt exist")
    removeUserNumber = 0;

  } else if (DataSetMain[removeUserNumber].username === username) {

    console.log("user found...removing")
    var NewData = undefined;
    NewData = DataSetMain.splice(removeUserNumber, 1);
    removeUserNumber = 0;
    localStorage.setItem('DataSet', JSON.stringify(NewData));
    console.log(DataSetMain);
  }
}


console.log(DataSetMain.sort(function (a, b) { return b.score - a.score }))
let currentNum = 0;
let flexibleNum = 0;
let mainUser = "";


//Function that prints every existing user in the dataset
function AllUsers(cnum) {
  if (currentNum >= 0 && currentNum < DataSetLength) {
    console.log(DataSetMain[currentNum].username)
    currentNum++;
    AllUsers();
  } else {
    console.log("user not exist")
    return "user does not exist";
  }
}

//AllUsers();

//Specific User function, main function for logging a user in.
function SpecificUser(cnum, user, pass) {
  if (currentNum >= 0 && currentNum < DataSetLength && DataSetMain[currentNum].username != user) {

    console.log(DataSetMain[currentNum].username)
    currentNum++;
    SpecificUser(cnum, user, pass);

  } else if (currentNum === DataSetLength) {
    console.log("No users found")
    currentNum = 0;
    document.getElementById('tryagaintext').innerHTML = 'Wrong username or password, Try again.';
  } else if (DataSetMain[currentNum].username === user) {
    console.log("user found")
    flexibleNum = currentNum;
    currentNum = 0;
    PasswordCompare(flexibleNum, pass, user)
  }
}

//User Checker Function, Checks if user exists in the dataset.
function UserChecker(cnum, user, pass) {
  if (currentNum >= 0 && currentNum < DataSetLength && DataSetMain[currentNum].username != user) {

    console.log(DataSetMain[currentNum].username)
    currentNum++;
    UserChecker(cnum, user, pass);

  } else if (currentNum === DataSetLength) {
    console.log("user does not exist.")
    currentNum = 0;


  } else if (DataSetMain[currentNum].username === user) {
    console.log("user exists, try again")
    currentNum = 0;
    return "exists";
  }
}


//User finder, (Finds a specific user in the dataset)
let userFoundValue = undefined;
function userFind(user) {
  if (currentNum >= 0 && currentNum < DataSetLength && DataSetMain[currentNum].username != user) {

    console.log(DataSetMain[currentNum].username)
    currentNum++;
    userFind(user);

  } else if (currentNum === DataSetLength) {
    console.log("user does not exist.")
    currentNum = 0;
    userFoundValue = false;
    return false;

  } else if (DataSetMain[currentNum].username === user) {
    console.log("user exists")
    currentNum = 0;
    userFoundValue = true;
    return true;
  }
}



console.log(JSON.parse(localStorage.getItem('DataSet')))


//LEADERBOARD FUNCTION
let LeaderIndex = 0;
let hasSetLeader = 0;
function SetLeaderboard() {
  if (hasSetLeader === 0 && LeaderIndex >= 0 && LeaderIndex < DataSetLength) {
    const UserNumber = DataSetMain[LeaderIndex].username;
    const UserScore = DataSetMain[LeaderIndex].score;
    console.log(DataSetMain[LeaderIndex].username)
    document.getElementById("leadernameID").innerHTML = document.getElementById("leadernameID").innerHTML + `\n${UserNumber}`
    document.getElementById("leaderscoreID").innerHTML = document.getElementById("leaderscoreID").innerHTML + `\n${UserScore}`
    LeaderIndex++;
    SetLeaderboard();
  }
}
if (window.location.pathname != '../HTML/game.html') {

  document.getElementById("leaderboardID").innerHTML = document.getElementById("leaderboardID").innerHTML + "\n#4" + "\n#5" + "\n#6" + "\n#7" + "\n#8" + "\n#9" + "\n#10";
  SetLeaderboard();
}


//Password compare function when creating new account
function PasswordCompare(userIndex, pass, user) {
  if (DataSetMain[userIndex].password === pass && document.getElementById("logorsigID").innerHTML === "Login") {
    console.log("correct pass... logging in")
    currentUser = user;
    window.location.href = "../HTML/loggedinpage.html";
    localStorage.setItem('user', currentUser);
    console.log(currentUser);
    mainUser = DataSetMain[userIndex].username;
  } else if (DataSetMain[userIndex].password != pass) {

    console.log("wrong pass... try again.")
    document.getElementById('tryagaintext').innerHTML = 'Wrong username or password, Try again.';
  }
}

function logout() {
  currentUser = undefined;
  localStorage.setItem('user', currentUser)
  console.log("has logged out")
}




//console.log(DataSetMain[1].password === "password1234")
//console.log(currentNum === DataSetLength)
console.log(currentNum >= 0 && currentNum < DataSetLength && DataSetMain[currentNum].username != "user3")
console.log(currentNum)
console.log(flexibleNum)


/*function GameStart(playerUsername) {
  console.log("game starting")
}
function GameEnd(currentScore) {

}
*/
//console.log(document.getElementById("passwordentered").value)
//console.log(document.getElementById("usernameentered").value)





function saveUser(username, password, id) {
  localStorage.setItem('user', username)
}

console.log(currentUser);


if (window.location.pathname == '/HTML/loggedinpage.html') { //Adds welcome title when logged in.
  document.getElementById('loggedtext').innerHTML = "Welcome, " + localStorage.getItem('user');
}




