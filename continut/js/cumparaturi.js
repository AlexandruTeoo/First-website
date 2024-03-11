const LOCAL_STORAGE_KEY = "listaCumparaturi";

class Produs {
    constructor(tipProdus, cantitate, id = Produs.getUrmatorId()) {
        this.tipProdus = tipProdus;
        this.cantitate = cantitate;
        this.id = id;
    }

    static getUrmatorId() {
        let listaProduse = Produs.getListaProduse();
        if (listaProduse.length === 0) {
            return 1;
        } 
        else 
        {
            return listaProduse[listaProduse.length - 1].id + 1;
        }
    }

    static getListaProduse() {
        let listaProduse = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
        return listaProduse.map(p => new Produs(p.tipProdus, p.cantitate, p.id));
    }

    static adaugaProdus(produs) {
        let listaProduse = Produs.getListaProduse();
        listaProduse.push(produs);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(listaProduse));
    }
}

function onChangeSelect (){
    e = document.getElementById ("nume");
    if (e.value == "Radianite Points")
    {
        document.getElementById("cantitate-radianite-points").style.display = "block";
        document.getElementById("cantitate-valorant-points").style.display = "none";
    }
    else
    {
        document.getElementById("cantitate-radianite-points").style.display = "none";
        document.getElementById("cantitate-valorant-points").style.display = "block";
    }
}


function createCell(cell, text) {
    var div = document.createElement('div'), 
        txt = document.createTextNode(text); 
    div.appendChild(txt);                    
    cell.appendChild(div);                   
}

function onAdauga()
{
        var tipProdus = document.getElementById("nume").value;
        var cantitate;
        if (tipProdus == "Valorant Points")
        {
            cantitate = document.getElementById("cantitate-valorant-points").value;
        }
        else
        {
            cantitate = document.getElementById("cantitate-radianite-points").value;
        }
    
        var prod = new Produs(tipProdus, cantitate);
        Produs.adaugaProdus(prod);
    
        var tbl = document.getElementById('tabela-produse'),  
            row = tbl.insertRow(-1),    
            i;
        
        for (i = 0; i < tbl.rows[0].cells.length; i++) {
            createCell(row.insertCell(i), Object.values(prod)[i]);
        }
}