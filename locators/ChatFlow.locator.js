ChatFlow = {
  locator: {                       
            // fieldBuscar: {xpath:'//input[@name="q"]'},

            fieldSearchChat: {xpath: '//input[@aria-label="Buscar en Messenger"]'},

            lblchatHeader: {xpath: '(//span[@class="_3oh-"][contains(.,"Esika cyzone lbel")])[1]'},

            btnEmpezar: {xpath: '//a[@class="_2xh6 _2xh7"]'},

            fieldUsuario: {id:'email'}, 
            
            fieldPassword: {id:'pass'},

            clickLogin: {id:'loginbutton'},

            modalConsultora: {xpath: '//div[@class="_4eby _2c9i"]'},

            frameConsultoralogin: {xpath: '//iframe[@name="facebook_ref"]'},

            btnLoginConsultora: {xpath: '//input[@id="btnLogin"]'},

            slctPais: {xpath: '//select[@id="ddlPais"]'},

            fieldChat: {xpath: '//div[contains(@class,"_1mf _1mj")]'},

            txtBotResponse: {xpath: '//div[@class="clearfix _o46 _3erg _29_7 direction_ltr text_align_ltr" or @class="clearfix _o46 _3erg _29_7 direction_ltr text_align_ltr _ylc"]//div[@class="_aok _7i2m"]'},

            txtSent: {xpath: '//div[@class="_3058 _ui9 _hh7 _6ybn _s1- _52mr _43by _6ybp _3oh-"]'},
            
            //txtOption incluye opciones tipo texto y tipo enlace <a>
            txtOption: {xpath: '//div[@class="_3cnr" or @class="_3cnp _3cnq"]//*//a[@href="#"]|//a[@class="_231w _231z _4yee" and @target="_blank"]'},

            //txtResultadoBot incluye respuestas texto sin emojis, opciones tipo texto y tipos enlace <a>
            txtResultadoBot: {xpath: '//div[@class="clearfix _o46 _3erg _29_7 direction_ltr text_align_ltr" or @class="clearfix _o46 _3erg _29_7 direction_ltr text_align_ltr _ylc"]//div[@class="_aok _7i2m"]|//div[@class="_3cng"]//div[@class][2]|//div[@class="_3cnr" or @class="_3cnp _3cnq"]//*//a[@href="#"]|//a[@class="_231w _231z _4yee" and @target="_blank"]'},

            lblChatSection: {xpath: '//span[contains(@class,"_1ht6 _7st9")]'},

            btnChatOptions: {xpath: '//div[@aria-label="Acciones"]'},

            lblOptEliminar: {xpath: '//*[text()="Eliminar"]'},

            btnConfirmEliminar: {xpath: '//button[@class="_3quh _30yy _2t_ _3ay_ _5ixy"][contains(.,"Eliminar")]'},

            fieldSearch: {xpath: '//input[@name="q"]'},

            lblInicio: {xpath: '//a[contains(.,"Inicio")]'}
  }
}

module.exports.chatFlow=ChatFlow;
module.exports.locator=ChatFlow.locator