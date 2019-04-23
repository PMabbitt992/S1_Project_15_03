"use strict";
/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Case Problem 3


   Filename: mas_register.js

   Author: Paige Mabbitt
   Date: 4.22.19     
   
   Function List
   =============
   
   formTest()
      Performs a validation test on the selection of the conference
      session package and the conference discount number
   
   calcCart()
      Calculates the cost of the registration and saves data
      in session storage
      
   writeSessionValues()
      Writes data values from session storage in to the
      registration summary form


*/
//When the window loads
window.onload = function () {
      //run calcCart initially, and whenever one of the box options is blurred
      calcCart();
      //run sessionTest when regSubmit is clicked
      document.getElementById("regSubmit").onclick = sessionTest;
      document.getElementById("fnBox").onblur = calcCart;
      document.getElementById("lnBox").onblur = calcCart;
      document.getElementById("groupBox").onblur = calcCart;
      document.getElementById("mailBox").onblur = calcCart;
      document.getElementById("phoneBox").onblur = calcCart;
      document.getElementById("sessionBox").onchange = calcCart;
      document.getElementById("banquetBox").onblur = calcCart;
      document.getElementById("mediaCB").onclick = calcCart;
}

function sessionTest() {
      //session is equal to the element with id sessionBox
      var sessionBox = document.getElementById("sessionBox");
      if (sessionBox.selectedIndex === -1) {
            //if nothing is selected, a custom message is displayed
            sessionBox.setCustomValidity("Select a Session Package");
      } else {
            //if selected, set message to nothing
            sessionBox.setCustomValidity("");
      }
}

function calcCart() {
      //session storage variable for each respective input set to the value
      sessionStorage.setItem("confName", document.getElementById("fnBox").value + " " + document.getElementById("lnBox").value);
      sessionStorage.setItem("confGroup", document.getElementById("groupBox").value);
      sessionStorage.setItem("confMail", document.getElementById("mailBox").value);
      sessionStorage.setItem("confPhone", document.getElementById("phoneBox").value);
      sessionStorage.setItem("confBanquet", document.getElementById("banquetBox").value);
      sessionStorage.setItem("confBanquetCost", document.getElementById("banquetBox").value * 55);

      //if the sessionBox is chosen, set the value. if not, set to blank and 0
      var sessionBox = document.getElementById("sessionBox");
      if (sessionBox.selectedIndex !== -1) {
            sessionStorage.setItem("confSession", sessionBox[sessionBox.selectedIndex].innerText);
            sessionStorage.setItem("confSessionCost", sessionBox[sessionBox.selectedIndex].value);
      } else {
            sessionStorage.setItem("confSession", " ");
            sessionStorage.setItem("confSessionCost", 0);
      }
      //if checkBox is checked, set the value. if not, set to blank and 0
      var checkBox = document.getElementById("mediaCB");
      if (checkBox.checked == true) {
            sessionStorage.setItem("confPack", "Yes");
            sessionStorage.setItem("confPackCost", 115);
      } else {
            sessionStorage.setItem("confPack", "No");
            sessionStorage.setItem("confPackCost", 0);
      }
      //set a session storage to the total cost
      sessionStorage.setItem("confTotal", parseFloat(sessionStorage.getItem("confSessionCost")) + parseFloat(sessionStorage.getItem("confBanquetCost")) + parseFloat(sessionStorage.getItem("confPackCost")));
      //run writeSessionValues
      writeSessionValues();
}

function writeSessionValues() {
      //put the sessionStorage values into the respective elements
      document.getElementById("regName").textContent = sessionStorage.getItem("confName");
      document.getElementById("regGroup").textContent = sessionStorage.getItem("confGroup");
      document.getElementById("regEmail").textContent = sessionStorage.getItem("confMail");
      document.getElementById("regPhone").textContent = sessionStorage.getItem("confPhone");
      document.getElementById("regSession").textContent = sessionStorage.getItem("confSession");
      document.getElementById("regBanquet").textContent = sessionStorage.getItem("confBanquet");
      document.getElementById("regPack").textContent = sessionStorage.getItem("confPack");
      document.getElementById("regTotal").textContent = "$" + sessionStorage.getItem("confTotal");
}