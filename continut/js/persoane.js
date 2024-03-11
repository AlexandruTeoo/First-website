function  incarcaPersoane() 
{
    var xhttp;
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange =
        function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var parser = new DOMParser();
                xmlDoc = parser.parseFromString(xhttp.responseText, "application/xml");

                table = document.createElement('table');
                table.setAttribute("class", "table-list");

                tblBody = document.createElement("table-body");

                
                header = document.createElement('tr');
                var list = ['Nume', 'Prenume', 'Varsta', 'Adresa', 'Email']
                for(var i = 0; i < list.length; i++)
                {
                    var cell = document.createElement('th');
                    var text = document.createTextNode(list[i]);

                    cell.appendChild(text);
                    header.appendChild(cell);
                }
                tblBody.appendChild(header);
                
                var count = xmlDoc.lastChild.childNodes.length;
                console.log(count);
                for(var i = 0; i < count; i++)
                {
                    var pers = xmlDoc.lastChild.childNodes[i];
                    var row = document.createElement("tr");

                    var tags = pers.childNodes;

                    Array.from(tags).forEach(el => {
                        if(el.nodeType == 3)
                            el.remove();
                    });

                    Array.from(tags).forEach(el => {
                        var cell = document.createElement('td');
                        var text = "";
                        if(el.childNodes.length == 1)
                        {
                            text = el.childNodes[0].nodeValue;
                        }
                        else
                        {
                            Array.from(el.childNodes).forEach(subEl => {
                                if(subEl.nodeType == 3)
                                {
                                    subEl.remove();
                                }
                                else 
                                {
                                    text += subEl.childNodes[0].nodeValue + ", ";
                                }
                            });
                        }
                        var textNode = document.createTextNode(text);
                        cell.appendChild(textNode);
                        row.appendChild(cell);
                    });

                    tblBody.appendChild(row);
                }
                table.appendChild(tblBody);

                var tableContainer = document.createElement("div");
                tableContainer.style.overflowX = "auto";
                tableContainer.append(table);

                document.getElementById("continut").removeChild(document.getElementById("continut").childNodes[0]);
                document.getElementById("continut").appendChild(tableContainer);
            }
        }
    xhttp.open("GET", './resurse/persoane.xml', true);
    xhttp.overrideMimeType('application/xml');
    xhttp.send();
    }
}