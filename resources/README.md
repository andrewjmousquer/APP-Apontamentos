These are Cordova resources. You can replace icon.png and splash.png and run
`ionic cordova resources` to generate custom icons and splash screens for your
app. See `ionic cordova resources --help` for details.

Cordova reference documentation:

- Icons: https://cordova.apache.org/docs/en/latest/config_ref/images.html
- Splash Screens: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-splashscreen/

## Como realizar e publicar o Build
    1- Executar o comando de build "npm run build-<tipo-de-ambiente>"
    2- Renomear pasta "www" para "app"
    3- Zipar a pasta app
    4- Renomear pasta "app" para "www"
    5- Enviar arquivo "app.zip" para servidor /opt/ast
    6- Unzip para pasta /opt/ast/frontend
    7- 
