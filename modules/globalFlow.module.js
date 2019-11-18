require('events').EventEmitter.defaultMaxListeners = 200
const config= require('../locators/ChatFlow.locator')
let locator=config.locator;

const Pedidos = require('../bot_responses/responses_pedidos')
const Negocio = require('../bot_responses/responses_negocio')
const Beneficios = require('../bot_responses/responses_beneficios')

const { I } = inject();
let wait = { retries: 3, minTimeout: 3000 };

module.exports={
  
  Ini() {
    I.amOnPage('/');
  },

  loginFBChat(usuario, password){
    I.retry(wait).fillField(locator.fieldUsuario, usuario);
    I.retry(wait).fillField(locator.fieldPassword, password);
    I.retry(wait).click(locator.clickLogin);
    I.waitForVisible(locator.lblchatHeader,10);
  },

  /* ******************************************************************** */
  async flowResponseCompare(Categoria,Documento,paisISO){ 
    
    var arr_interacciones = await this.setInteraccionArray(Categoria,paisISO,Documento);
    I.say('Nuevo Inicio Mapeo de Respuestas Global...');
    
    I.waitForVisible('//*[contains(text(),"'+Categoria+'")]',10);
    I.waitForVisible(locator.fieldChat,10);
    I.retry(wait).click(locator.fieldChat);

    var totalok = 0

    // cantidad interacciones = arr_interacciones.length
    var cant_interacciones = arr_interacciones.length;
    for(i = 0; i < cant_interacciones; i++){
       
      //primer elemento de cada interaccion[i] es la variable "send"
      I.say("\nEnviando : " + arr_interacciones[i].send); 
      I.retry(wait).fillField(locator.fieldChat, arr_interacciones[i].send);
      I.pressKey("Enter");
      I.wait(4)   
      
      //extrayendo respuestas reales obtenidas y almacenadas en arr_obtenidos
      I.wait(4)
      var resultOptions = await I.retry(wait).grabTextFrom(locator.txtResultadoBot);

      var arr_optobtenidos = []
      for(var resopt of resultOptions){
        arr_optobtenidos.push(resopt)
      }

      //Comparacion opciones esperadas con opciones obtenidas en funcion al tipo DETALLADO o sólo OPCIONES

      var mostrar_esperados = ''

      for (let q = 0; q < arr_interacciones[i].respuesta.length; q++) {          
        mostrar_esperados = mostrar_esperados+' // '+arr_interacciones[i].respuesta[q].linea

      }

      I.say('Opciones esperadas : '+ mostrar_esperados)

      //cantidad elementos sub array opciones esperadas
      var cant_opts_subarray = arr_interacciones[i].respuesta.length
      var takeLastOptions = cant_opts_subarray
      var okesperados = 0
      I.say('Opciones obtenidas :')
      I.say('|'+arr_interacciones[i].send+'|');
      for(j = 0; j < takeLastOptions; j++){
        botresponseindex = (arr_optobtenidos.length - takeLastOptions + j);
        
        var esperado_formateado = arr_interacciones[i].respuesta[j].linea
        //formatear res esperado y omitir emojis unicode y asteriscos *
        esperado_formateado = esperado_formateado.replace(/[\u1000-\uFFFF]+/g, "");
        esperado_formateado = esperado_formateado.replace(/[*]/g, "");
        
        if(esperado_formateado == arr_optobtenidos[botresponseindex].replace(/[\u1000-\uFFFF]+/g, "")){  
          I.say('\t|_ ✓ '+ arr_optobtenidos[botresponseindex]);
          ++okesperados           
        }else{     
          I.say('\t|_ ERROR! '+ arr_optobtenidos[botresponseindex] + ' << >> ' + esperado_formateado);     
        }

      }
      if(okesperados==takeLastOptions){
        ++totalok
      }
        
    }

    return (totalok==cant_interacciones)?true:false

  },
  /* ******************************************************************** */

  resetFlow(){
    I.retry(wait).fillField(locator.fieldChat, '@reset_user');
    I.pressKey("Enter");
    I.wait(1);
    I.retry(wait).moveCursorTo(locator.lblChatSection);
    I.retry(wait).click(locator.btnChatOptions);    
    I.retry(wait).click(locator.lblOptEliminar);
    I.retry(wait).click(locator.btnConfirmEliminar);
    I.wait(1);
    I.retry(wait).fillField(locator.fieldSearchChat,'Esika cyzone lbel');
    I.wait(3);
    I.retry(wait).click('Esika cyzone lbel');
    I.wait(1);
    I.retry(wait).click(locator.btnEmpezar); 
    I.waitForVisible('//*[contains(text(),"SOY CONSULTORA")]',10);
  },

  sesionBotmaker(){
    
      I.openNewTab();
      I.amOnPage('https://go.botmaker.com/#/');
      I.waitForVisible('//*[@class="md-card-title--title md-text--secondary"]',10);
      I.retry(wait).click('Sign in with email')
      I.wait(1);
      I.pressKey("Tab"); 
      I.retry(wait).fillField('//input[@class="mdl-textfield__input firebaseui-input firebaseui-id-email"]', 'sergio.silva@hundred.com.pe');
      I.pressKey("Enter"); 
      I.wait(1);
      I.pressKey("Tab"); 
      I.retry(wait).fillField('//input[@class="mdl-textfield__input firebaseui-input firebaseui-id-password"]', '@Sebas50pl1n');
      I.pressKey("Enter"); 
      I.waitForVisible('//*[contains(text(),"Información adicional")]',10);
      I.wait(1);
      I.pressKey("Tab");
      I.retry(wait).click('//input[contains(@class,"md-text-field md-text-field--margin md-full-width md-text searchBarInput")]')        
      I.retry(wait).fillField('//input[contains(@class,"md-text-field md-text-field--margin md-full-width md-text searchBarInput")]', 'QA chatbot');
      I.wait(1)
      I.retry(wait).click('(.//*[normalize-space(text()) and normalize-space(.)="person"])[1]/following::span[1]')  
      I.wait(5)
      I.retry(wait).click('(.//*[normalize-space(text()) and normalize-space(.)="QA Chatbot"])[1]/following::div[1]')
      I.wait(5);

      I.retry(wait).click('(//i[@class="md-icon material-icons"][contains(.,"mode_edit")])[2]')
      I.retry(wait).click('//input[contains(@id,"edit-user-tag-add")]')
      I.wait(1)
      I.retry(wait).fillField('//input[contains(@id,"edit-user-tag-add")]', 'env-qa');
      I.wait(1) 
      I.retry(wait).click('//div[@class="md-tile-text--primary md-text"][contains(.,"env-qa")]')
      I.wait(1)
      I.retry(wait).click('//i[@class="md-icon material-icons"][contains(.,"done")]')

      I.closeCurrentTab();
  },

  loginConsultora(paisISO,usuarioConsultora,claveConsultora){
    I.retry(wait).click('SOY CONSULTORA');
    I.openNewTab();
    I.amOnPage('https://www.somosbelcorp.com/LoginChatbot/Index?webviewfallback=false&u=JE0382PV1R0GJBAPUYL1&t=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJKRTAzODJQVjFSMEdKQkFQVVlMMSIsImJ1c2luZXNzSWQiOiJiZWxjb3JwYyIsImV4cCI6MTU4MDkzNTc4Nn0.c5wAoyzSDWMsR1n7DyKpHoGkvcTAWFZiOgIWarUyjWQ&webview_height_ratio=compact&tipo=1');
    I.wait(2);
    I.selectOption('//*[@id="ddlPais"]',paisISO);
    I.retry(wait).fillField('//*[@id="txtUsuario"]',usuarioConsultora);
    I.retry(wait).fillField('//*[@id="txtPassword"]',claveConsultora);    
    I.retry(wait).click('INGRESA A TU CUENTA')
    I.wait(4);
    I.closeCurrentTab();
    I.wait(1);
    I.waitForVisible('//*[contains(text(),"Ingresaste correctamente")]',10);
    I.wait(1);
  },

  closeTestFlow(){
    I.say('Finalizo Mapeo de Opciones'); 
  },

  async setInteraccionArray(Categoria,paisISO,Documento){
    switch (Categoria) {
      case 'PEDIDOS':
        return Pedidos.interaccionPedidos(paisISO,Documento); 
                  // break;
      case 'MI NEGOCIO':
        return Negocio.interaccionNegocio(paisISO,Documento); 
                  // break;  
      case 'BENEFICIOS':
        return Beneficios.interaccionBeneficios(paisISO,Documento); 
                 // break;   
      default:
        return Pedidos.interaccionPedidos(paisISO,Documento);  
                 // break;
    }            

  }

}

