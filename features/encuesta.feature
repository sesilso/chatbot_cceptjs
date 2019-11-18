Feature: Validar Flujo de Encuesta
  Como Consultor@ Digital
  Yo quiero realizar la encuesta enviada por el Bot

@MapearEncuesta
Scenario Outline: Validacion Encuesta Bot Facebook
    Given Ingreso a Facebook Messenger utilizando mi usuario "<UsuarioFB>" y mi clave "<PasswordFB>"
    When Inicio el flujo de comunicación habilitado para el usuario "<UsuarioConsultora>" con clave "<ClaveConsultora>" del pais "<PaisISO>"
    Then Realizo la encuesta enviada por el Bot al finalizar un flujo

Examples:
| UsuarioFB             | PasswordFB| UsuarioConsultora | ClaveConsultora | PaisISO |
| tonoavila8@gmail.com  | qa_user   | 001248170         | a1234567        | PE      |
