# Pets Chatbot

- Para instalar la aplicación de chatbot se debe de realizar los siguientes comandos:
```
sam build
sam deploy --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM
```

- Una vez desplegada la aplicación, accede a Cloudformation para consultar los outputs del stack de pets-chatbot, posteriormente en la carpeta de frontend crea un archivo .env, donde colocaras los siguientes valores:

```
VITE_USER_POOL_ID=xxxx
VITE_USER_POOL_CLIENT_ID=xxx
VITE_IDENTITY_POOL_ID=xxx
VITE_CHAT_API_URL=xxxx
```

- Esto permitirá ejecutar los servicios de *AWS Cognito* para iniciar sesión, también te permitirá ejecutar la API para crear un nuevo chat y almacenarlo en una single table design de DynamoDB.