function  schimbaContinut(resursa, jsFisier, jsFunctie) {
    var xhttp;
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange =
        function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                document.getElementById("continut").innerHTML = xhttp.responseText;
                if (jsFisier) {
                    var elementScript = document.createElement('script');
                    elementScript.onload = function () 
                    {
                        console.log("hello");
                        if (jsFunctie) {
                            window[jsFunctie]();
                        }
                    }
                    elementScript.src = jsFisier;
                    document.head.appendChild(elementScript);
                } 
                else 
                {
                    if (jsFunctie) {
                        window[jsFunctie]();
                    }
                }
                
                if(resursa == "invat")
                    onLoadInvat();
                else
                {
                    stopInt();
                }
            }
        }
    xhttp.open("GET", resursa + ".html", true);
    xhttp.send();
    }
}

function currentLocation (position)
{
    document.getElementById("current-location").innerHTML = "<strong>Current Location:</strong><br>Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
}

var interval;
function onLoadInvat()
{
    window.navigator.geolocation.getCurrentPosition (currentLocation);

    document.getElementById ("current-os").innerHTML = "<strong>Current OS: </strong>" + navigator.platform;
    document.getElementById ("current-browser").innerHTML = "<strong>Current Browser:</strong> " + navigator.appCodeName + " "+ navigator.appVersion.substring(0, 4);

    document.getElementById("current-url").innerHTML = "<strong>Current URL:</strong> " + location.href;

    var date = new Date();

    document.getElementById("current-time").innerHTML = date.getDate().toString().padStart(2, '0') + "/" + (date.getMonth() + 1).toString().padStart(2, '0') + "/" + date.getFullYear() + " " + 
        date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0') + ":" + date.getSeconds().toString().padStart(2, '0');

    interval = setInterval(() => {
        date = new Date();

        document.getElementById("current-time").innerHTML = date.getDate().toString().padStart(2, '0') + "/" + (date.getMonth() + 1).toString().padStart(2, '0') + "/" + date.getFullYear() + " " + 
            date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0') + ":" + date.getSeconds().toString().padStart(2, '0');
    }, 1000);
}

function stopInt()
{
    clearInterval(interval);
}

/**################################################################################################## */ // Sectiunea 2

var firstClick = true;
var x1, y1;

function onCanvasClick(){
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        if (firstClick) {
        
        x1 = event.offsetX;
        y1 = event.offsetY;
        
        firstClick = false;
    } 
    else {
        const x2 = event.offsetX;
        const y2 = event.offsetY;
        
        const width = x2 - x1;
        const height = y2 - y1;
        
        const strokeColor = document.getElementById("stroke-color").value;
        const fillColor = document.getElementById("fill-color").value;
        
        ctx.beginPath();
        ctx.rect(x1, y1, width, height);
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
        ctx.fillStyle = fillColor;
        ctx.fill();
        
        firstClick = true;
    }
}

/**################################################################################################## */ // Sectiunea 3

function addRow() {
    var tbl = document.getElementById('myTable'), 
        row = tbl.insertRow(tbl.rows.length),      
        i;
    for (i = 0; i < tbl.rows[0].cells.length; i++) {
        createCell(row.insertCell(i), "New Row", "New Row");
    }
}

function createCell(cell, text, style) {
    var div = document.createElement('div'), 
        txt = document.createTextNode(text); 
    div.appendChild(txt);                    
    cell.appendChild(div);            
}

function addColumn() {
    var table = document.getElementById("myTable");
    var rows = table.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        var cell = rows[i].insertCell();
        cell.innerHTML = "New Column";
    }
}