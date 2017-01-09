//La accion que se va a realizar una vez que el usuario pulsa El btn "Saludo desde el servidor"
document.getElementById("btnPedirHolaMundo").addEventListener("click", llamada);
document.getElementById("btnPedirDesplegable").addEventListener("click", llamadaSelect);
document.getElementById("btnPedirXML").addEventListener("click", llamadaXML);

function llamada() {

    /*alert("Probando...")
        para probar si entra o no */

    //1.-Creamos una instancia del XMLHttpRequest
    var oXML = new XMLHttpRequest();

    //2.-Usamos el open para decirle que hace una vez que lo hemos abierto
    //En nuestro caso accedemos al archivo html pero podriamos acceder a un servidor, el metodo nos lo permite
    oXML.open("GET", "../Server/HolaMundo.html");

    //3.-Definir las cabeceras opcionales, en nuestro caso no necesita
    //Se necesitaria para hacer la llamada PUT o POST

    //4.-Asignacion de la respuesta cuando cambia el estado
    //Le asignamos la funcion anonima donde haremos las cosas
    oXML.onreadystatechange = function () {
        /*alert(oXML.status);
            Comprobacion*/


        if (oXML.readyState < 4) {
            //Se busca el txtContenedor por si tarda el servidor mostrarle una informacion al usuario
            document.getElementById("txtContenedor").innerHTML = "Cargando...";
        } else {
            if (oXML.readyState == 4 && oXML.status == 200) {
                //6.- Tratamiento de los datos 
                document.getElementById("txtContenedor").innerHTML = oXML.responseText;
            }
        }
    }

    //5.-Realizar el envio de la solicitud, NO SE PUEDE OLVIDAR
    //Si usamos parametros opcionales, aqui los tenemos que enviar
    oXML.send();


}
//Ejemplo probando hacer una llamada a un servidor y sacar un elemento Html
function llamadaSelect() {
    var oSelect = new XMLHttpRequest();
    oSelect.open("GET", "../Server/Desplegable.html");

    oSelect.onreadystatechange = function () {
        if (oSelect.readyState < 4) {
            document.getElementById("txtContenedor").innerHTML = "Cargando...";
        } else {
            if (oSelect.readyState == 4 && oSelect.status == 200) {

                document.getElementById("txtContenedor").innerHTML = oSelect.responseText;
            }
        }
    }
    oSelect.send();
}

//SACANDO DATOS DE UN XML
function llamadaXML() {
    var oTablaXML = new XMLHttpRequest();
    oTablaXML.open("GET", "../Server/Personas.xml");

    oTablaXML.onreadystatechange = function () {
        if (oTablaXML.readyState < 4) {
            document.getElementById("txtContenedor").innerHTML = "Cargando...";
        } else {
            if (oTablaXML.readyState == 4 && oTablaXML.status == 200) {

                //Para tratar los datos(darle formato)
                var respXML = oTablaXML.responseXML;
                escribirPersonas(respXML);
            }
        }
    }
    oTablaXML.send();
}

function escribirPersonas(respXML) {


    var table = document.createElement("TABLE");
    //Para ponerle atributos al elemento usamos setAttributte
    table.setAttribute("border", "3");

    var array = respXML.getElementsByTagName("persona");
    var fila = document.createElement("TR");
    var texto;

    for (i = 0; i < array.length; i++) {
        fila = document.createElement("TR");
        columna = document.createElement("TD");
        texto = document.createTextNode(array[i].getElementsByTagName("nombre")[0].textContent);
        columna.appendChild(texto);
        fila.appendChild(columna);
        columna = document.createElement("TD");
        texto = document.createTextNode(array[i].getElementsByTagName("apellidos")[0].textContent);
        columna.appendChild(texto);
        fila.appendChild(columna);
        table.appendChild(fila);
    }

    //Para vaciar el texto que teniamos en cargando...
    document.getElementById("txtContenedor").innerHTML = "";

    document.getElementById("txtContenedor").appendChild(table);


    /*Obtener el nombre de la primera persona(FORMA RAPIDA)
    document.getElementById("txtContenedor").innerHTML = respXML.getElementsByTagName("persona")[0].textContent;*/

}