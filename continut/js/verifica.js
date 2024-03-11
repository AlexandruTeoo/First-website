function verificaButton ()
{
    var xhttp;
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange =
        function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                jsonDoc = JSON.parse(xhttp.responseText);
                
                var user = document.getElementById("usingname").value;
                var pass = document.getElementById("pwd").value;

                var isRegistered = false;

                for(var i = 0; i < jsonDoc.length; i++)
                {
                    if((user === Object.values(jsonDoc[i])[0]) && (pass === Object.values(jsonDoc[i])[1]))
                    {
                        isRegistered = true;
                        break;
                    }
                }

                if (isRegistered)
                    document.getElementById("mesaj").innerHTML = "Datele de conectare sunt corecte!<br>";
                else
                    document.getElementById("mesaj").innerHTML = "Numele utilizatorului si/sau parola sunt gresite! <br> Reincercati!<br>";
            }
        }
    }

    xhttp.open("GET", './resurse/utilizatori.json', true);
    xhttp.send();
}

function Submit(event) 
{
    event.preventDefault();

    var url = "/api/utilizatori";
    var req = new XMLHttpRequest();

    var username = document.getElementById("usingname");
    var pass = document.getElementById("pwd");
    var fname = document.getElementById("fname");
    var lname = document.getElementById("lname");
    var email = document.getElementById("email");
    var phone = document.getElementById("phone_number");
    var sex = document.getElementById("sex");
    var food = document.getElementById("favfood");
    var color = document.getElementById("color");
    var bDay = document.getElementById("birthday");
    var hDay = document.getElementById("hour_birthday");
    var age = document.getElementById("points");
    var adresa_url = document.getElementById("url");
    var descriere = document.getElementById("message");
    
    req.onload = function() { 
        username.value = "";
        pass.value = "";
        fname.value = "";
        lname.value = "";
        email.value = "";
        phone.value = "";
        sex.value = "";
        food.value = "";
        color.value = "";
        bDay.value = "";
        hDay.value = "";
        age.value = "";
        adresa_url.value = "";
        descriere.value = "";
        alert("Inregistrat!");
    };

    req.onerror = function() {
        alert("A apărut o eroare la server!");
    };

    var formString = "username="+username.value
                    +"&pass="+pass.value
                    +"&nume="+fname.value
                    +"&prenume="+lname.value
                    +"&email="+email.value
                    +"&telefon="+phone.value
                    +"&sex="+sex.value
                    +"&mancare="+food.value
                    +"&culoare="+color.value
                    +"&data_nastere="+bDay.value
                    +"&ora_nasterii="+hDay.value
                    +"&varsta="+age.value
                    +"&adresa_url="+adresa_url.value
                    +"&descriere="+descriere.value;
                    
    req.open('POST', url, true);
    req.send(formString); 
}