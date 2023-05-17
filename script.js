let nameInput = document.querySelector('#name');
let genderInput = document.querySelector('#gender');
let bdayInput = document.querySelector('#bday');
let addressInput = document.querySelector('#address');

//login and logout system
let username;
let pass;

let indexToAdd;

let residentsList;

if(localStorage.getItem('username') == null){
    username = 'admin';
}else{
    username = JSON.parse(localStorage.getItem('username'))
}

if(localStorage.getItem('pass') == null){
    pass = 'pass';
}else{
    pass = JSON.parse(localStorage.getItem('pass'))
}

$('#login').click(function(){
    let usernameInput = document.querySelector('#user');
    let passInput = document.querySelector('#pass');

    if(usernameInput.value==username && passInput.value==pass){
        $(".titleResidents").animate({left: "0px"}, 700);
        $(".residents-table-container").animate({top: "100px"}, 1000);
        $(".residents-body-container").animate({top: "100px"}, 1000);
        $('.log-in-menu').toggle()
        $('.residents-page').toggle()
        $('.residents-content').toggle()
        alert('Logged in!');
    }else{
        alert('Wrong Credentials')
    }

    usernameInput.value = null;
    passInput.value = null;
})

$('#logout').click(function(){
    $('.log-in-menu').toggle()
    $('.residents-page').toggle()
    $('.residents-content').toggle()
    alert('Logged out!');
    residentsMenu("-700px", "700px", "700px");
    blotterMenu("-700px", "700px");
    residentsManagement("-700px", "700px", "-50px");
    accMenu("-700px", "800px");
})

$('#changeUsername').click(function(){
    let isNew = false;
    let newUsername;
    while(isNew == false){
        newUsername = prompt('Enter your new username');

        if(newUsername == username){
            alert('Please enter a new User Name');
        }else{
            isNew = !isNew;
        }
    }

    if(newUsername.length <= 0){
        alert('Action failed!');
    }else{
        username = newUsername;
        localStorage.setItem('username', JSON.stringify(username));
        displayCurrentInfo();
        alert('Username changed!');
    }
    
})

$('#changePass').click(function(){
    let isNew = false
    let newPass;

    while(isNew == false){
        newPass = prompt('Enter your new password');

       if(newPass == pass){
            alert('Please enter a new Password');
       }else{
            isNew = !isNew;
       }
       
    }

    if(newPass.length <= 0){
        alert('Action failed!');
    }else{
        pass = newPass;
        localStorage.setItem('pass', JSON.stringify(pass));
        displayCurrentInfo();
        alert('Password changed!');
    }
})

function displayCurrentInfo(){
    $("input[name = currentUsername]").val(username);
    $("input[name = currentPassword]").val(pass);
}

$(document).ready(function() {
    displayCurrentInfo();
    displayTotalCount();
    addToTable();
  });

class Resident{
    constructor(name, gender, birthday, address){
        this.name = name;
        this.gender = gender;
        this.birthday = birthday;
        this.address = address;
        this.isBlottered = false;
    }
}

//for adding data to the localstorage & tables
$('#btnAdd').click(function(){
    // let residentsList;
    if(localStorage.getItem('residentsList') == null){
        residentsList = [];
    }else{
        residentsList = JSON.parse(localStorage.getItem('residentsList'))
    }

    if(nameInput.value.length > 1 && genderInput.value.length > 1 && bdayInput.value.length > 1 && addressInput.value.length > 1){

        let upperCaseGender = genderInput.value.toUpperCase();
        let upperCaseName = nameInput.value.toUpperCase();
        let upperCaseAddress = addressInput.value.toUpperCase();

        if(upperCaseGender == 'MALE' || upperCaseGender == 'FEMALE'){
            let newResident = new Resident(upperCaseName, upperCaseGender, bdayInput.value, upperCaseAddress);
            residentsList.push(newResident);
            localStorage.setItem('residentsList', JSON.stringify(residentsList));
            addToTable();
            displayTotalCount();
            alert('Added!');
        }else{
             alert('Male and Female Gender only')
        }
       
    }else{
        alert('Wrong Credentials')
    }

    clearFields();
})


//for navigating the sidebar menu
$('#residentsMenu').click(function(){
    $('.residents-content').css('display', 'block');
    residentsMenu("0px", "100px", "100px");
    blotterMenu("-700px", "700px");
    residentsManagement("-700px", "700px", "-50px");
    accMenu("-700px", "800px");
})

$('#blotterMenu').click(function(){
    $('.blottered-list-content').css('display', 'block');
    blotterMenu("0px", "100px");
    residentsMenu("-700px", "700px", "700px");
    residentsManagement("-700px", "700px", "-50px");
    accMenu("-700px", "800px");
})

$('#residentsManagement').click(function(){
    $('.residents-management-content').css('display', 'block');
    residentsManagement("0px", "100px", "130px");
    blotterMenu("-700px", "700px");
    residentsMenu("-700px", "700px", "700px");
    accMenu("-700px", "800px");
})

$('#accMenu').click(function(){
    $('.account-management-content').css('display', 'block');
    residentsManagement("-700px", "700px", "-50px");
    blotterMenu("-700px", "700px");
    residentsMenu("-700px", "700px", "700px");
    accMenu("0px", "120px");
})

function residentsMenu(leftValue, top1Value, top2Value) {
    $(".titleResidents").animate({left: leftValue}, 700);
    $(".residents-table-container").animate({top: top1Value}, 1000);
    $(".residents-body-container").animate({top: top2Value}, 1000);
}

function blotterMenu(leftValue, topValue) {
    $(".titleBlotteredList").animate({left: leftValue}, 700);
    $(".blottered-list-body-container").animate({top: topValue}, 1000);
}

function residentsManagement(leftValue, topValue, bottomValue) {
    $(".title-residents-management-container").animate({left: leftValue}, 700);
    $(".residents-management-body-container").animate({top: topValue}, 1000);
    $(".input-container").animate({bottom: bottomValue}, 1000);
}

function accMenu(leftValue, topValue) {
    $(".title-account-management-container").animate({left: leftValue}, 700);
    $(".account-management-body-container").animate({top: topValue}, 1000);
}

//function to display the data in multiple tables
function addToTable(){
    let residentsBody = document.querySelector('#residentsBody');
    let summaryBody = document.querySelector('#summaryBody');
    let blotteredBody = document.querySelector('#blotteredBody');

    // let residentsList;
    if(localStorage.getItem('residentsList') == null){
        residentsList = [];
    }else{
        residentsList = JSON.parse(localStorage.getItem('residentsList'))
    }

    //resetting the table body to no content
    residentsBody.innerHTML = '';
    summaryBody.innerHTML = '';
    blotteredBody.innerHTML = '';
      
    residentsList.forEach(function(resident, index){
      let newRow = document.createElement('tr');

      let nameCell = document.createElement('td');
      let genderCell = document.createElement('td');
      let bdayCell = document.createElement('td');
      let addressCell = document.createElement('td');
      let blotteredCell = document.createElement('td');
      let actionCell = document.createElement('td');
  
      nameCell.textContent = resident.name;
      genderCell.textContent = resident.gender;
      bdayCell.textContent = resident.birthday;
      addressCell.textContent = resident.address;
      blotteredCell.textContent = resident.isBlottered;
      actionCell.innerHTML = '<button onclick="deleteData(' + index + ')">DELETE</button>' +
                             '<button onclick="updateData(' + index + ')">UPDATE</button>' +
                             '<button onclick="blotter(' + index + ')">BLOTTER</button>';
  
      newRow.appendChild(nameCell);
      newRow.appendChild(genderCell);
      newRow.appendChild(bdayCell);
      newRow.appendChild(addressCell);
      newRow.appendChild(blotteredCell);
      newRow.appendChild(actionCell);
  
      residentsBody.appendChild(newRow);
    });

    residentsList.forEach(function(resident){
        let summaryRow = document.createElement('tr');

        let nameCell = document.createElement('td');
        let genderCell = document.createElement('td');
        let addressCell = document.createElement('td');

        nameCell.textContent = resident.name;
        genderCell.textContent = resident.gender;
        addressCell.textContent = resident.address;

        summaryRow.appendChild(nameCell)
        summaryRow.appendChild(genderCell);
        summaryRow.appendChild(addressCell);

        summaryBody.appendChild(summaryRow);
    })

    residentsList.forEach(function(resident, index){
        if(resident.isBlottered == true){
            let blotteredRow = document.createElement('tr');

            let nameCell = document.createElement('td');
            let genderCell = document.createElement('td');
            let bdayCell = document.createElement('td');
            let addressCell = document.createElement('td');
            let actionCell = document.createElement('td');

            nameCell.textContent = resident.name;
            genderCell.textContent = resident.gender;
            bdayCell.textContent = resident.birthday;
            addressCell.textContent = resident.address;
            actionCell.innerHTML = '<button onclick="unblotter(' + index + ')">UNBLOTTER</button>'

            blotteredRow.appendChild(nameCell);
            blotteredRow.appendChild(genderCell);
            blotteredRow.appendChild(bdayCell);
            blotteredRow.appendChild(addressCell);
            blotteredRow.appendChild(actionCell);

            blotteredBody.appendChild(blotteredRow);
        }
    })
  }

function displayTotalCount() {
    let totalResidents = $("#totalResidents");
    let totalBlottered = $('#totalBlottered');
    let totalMale = $("#totalMale");
    let totalFemale = $("#totalFemale");
    let maleCount = 0;
    let femaleCount = 0;
    let blotteredCount = 0;

    // let residentsList;

    if (localStorage.getItem("residentsList") == null) {
      residentsList = [];
    } else {
      residentsList = JSON.parse(localStorage.getItem("residentsList"));
    }

    residentsList.forEach(function(resident){
        if(resident.gender == 'MALE'){
            maleCount++;
        }
        if(resident.gender == 'FEMALE'){
            femaleCount++;
        }
        if(resident.isBlottered == true){
            blotteredCount++;
        }
    })

    totalResidents.text(residentsList.length);
    totalMale.text(maleCount);
    totalFemale.text(femaleCount);
    totalBlottered.text(blotteredCount);
}

  function updateData(index){
    let btnUpdate = document.querySelector('#btnUpdate');
    let btnAdd = document.querySelector('#btnAdd');
    let btnCancel = document.querySelector('#btnCancel');

    btnUpdate.style.display = 'inline';
    btnCancel.style.display = 'inline';
    btnAdd.style.display = 'none';

    // let residentsList;
    if(localStorage.getItem('residentsList') == null){
        residentsList = [];
    }else{
        residentsList = JSON.parse(localStorage.getItem('residentsList'))
    }

    indexToAdd = index;

    nameInput.value = residentsList[index].name;
    genderInput.value = residentsList[index].gender;
    bdayInput.value = residentsList[index].birthday;
    addressInput.value = residentsList[index].address;
  }

  $('#btnUpdate').click(function(){
         let upperCaseGender = genderInput.value.toUpperCase();
        let upperCaseName = nameInput.value.toUpperCase();
        let upperCaseAddress = addressInput.value.toUpperCase();
        if(nameInput.value.length > 1 && genderInput.value.length > 1 && (upperCaseGender == "MALE" || upperCaseGender == "FEMALE") && bdayInput.value.length > 1 && addressInput.value.length > 1){
            residentsList[indexToAdd].name = nameInput.value.toUpperCase();
            residentsList[indexToAdd].gender = genderInput.value.toUpperCase();
            residentsList[indexToAdd].birthday = bdayInput.value;
            residentsList[indexToAdd].address = addressInput.value.toUpperCase();
            localStorage.setItem('residentsList', JSON.stringify(residentsList));
            addToTable();
            displayTotalCount();

            btnUpdate.style.display = 'none';
            btnAdd.style.display = 'inline';
            clearFields();

            alert('Updated!');
        }else{
            alert('Wrong Credentials')
        }
    })

    $('#btnCancel').click(function(){
        btnUpdate.style.display = 'none';
        btnCancel.style.display = 'none';
        btnAdd.style.display = 'inline';
        clearFields();
        alert('Cancelled!');
    })

  function blotter(index){
    // let residentsList;
    if(localStorage.getItem('residentsList') == null){
        residentsList = [];
    }else{
        residentsList = JSON.parse(localStorage.getItem('residentsList'))
    }

    residentsList[index].isBlottered = true;
    alert('Blottered!');
    localStorage.setItem('residentsList', JSON.stringify(residentsList));
    addToTable();
    displayTotalCount();
  }

  function unblotter(index){
    // let residentsList;
    if(localStorage.getItem('residentsList') == null){
        residentsList = [];
    }else{
        residentsList = JSON.parse(localStorage.getItem('residentsList'))
    }

    residentsList[index].isBlottered = false;
    alert('Unblottered!');
    localStorage.setItem('residentsList', JSON.stringify(residentsList));
    addToTable();
    displayTotalCount();
  }

  function deleteData(index){
    // let residentsList;
    if(localStorage.getItem('residentsList') == null){
        residentsList = [];
    }else{
        residentsList = JSON.parse(localStorage.getItem('residentsList'))
    }

    residentsList.splice(index, 1);
    alert('Deleted!')
    localStorage.setItem('residentsList', JSON.stringify(residentsList));
    addToTable();
    displayTotalCount();
  }

  function clearFields(){
    nameInput.value = null;
    genderInput.value = null;
    bdayInput.value = null;
    addressInput.value = null;
  }