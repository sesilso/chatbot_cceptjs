var Interaccion = {          
    send: "MENU", 
    opciones: ['op1', 'op2', 'op3'] 
}; 

var Interaccion2 = {          
    send: "PEDIDOS", 
    opciones: ['option1', 'option2'] 
};   
  
ArrayInteracciones = [];
ArrayInteracciones.push(Interaccion);
ArrayInteracciones.push(Interaccion2);

module.exports = {
    ArrayInteracciones
}