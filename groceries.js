var mylist = [];
window.onload = loadCookieList;
//courtesy of w3schools, from: http://www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays) { 
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
//courtesy of w3schools, from: http://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function addItem(){
    var input = document.getElementById("newItem").value;
    displayItem(input);
}

function removeParentListItem(){
    var mom = this.parentNode;
    var grandma = mom.parentNode;
    var itemRemove = mom.firstChild.textContent;
    var itemIndex = mylist.indexOf(itemRemove);
    mylist.splice(itemIndex, 1);
    console.log(mylist);
    grandma.removeChild(mom);
}

function saveList(){
    var list = mylist.toString();
    setCookie("cookie", list, 7)
}

function clearList(){
    document.getElementById("listDisplay").innerHTML = "";
    mylist.splice(0,mylist.length);

}

function displayItem(input){
    if(mylist.indexOf(input) == -1){
    mylist.push(input);
    console.log(mylist.toString());
    var list = document.getElementById("listDisplay");
    var item = document.createElement("li");
    var btnClose;
    btnClose = document.createElement("button");
    btnClose.classList.add("btn");
    btnClose.classList.add("btn-danger");
    btnClose.classList.add("btn-xs");
    var iconClose;
    iconClose = document.createElement("span");
    iconClose.classList.add("glyphicon");
    iconClose.classList.add("glyphicon-remove");
    btnClose.appendChild(iconClose);
    var itemName = document.createTextNode(input);
    btnClose.addEventListener("click", removeParentListItem);
    item.appendChild(itemName);
    item.appendChild(btnClose);
    list.appendChild(item);
    document.getElementById("newItem").value = "";
    }
}

function loadCookieList(){
    var random = getCookie("cookie");
    var arrayCookie = [];
    arrayCookie = random.split(',');
    for (var i = 0; i < arrayCookie.length; i++) {
    displayItem(arrayCookie[i]);
    }
}