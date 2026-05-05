# CSC-372_ProjectRepository
### Logan Wilkins Project Repository
## Service Website
- https://csc-372-projectrepository.onrender.com

## Reflection
###Design Choices
- I chose NextJS for my frontend because of the integration of the frontend and backend to be in the same place. My backend consists of Node.js and the expressAPI to handle the data that is recieved from the PokeAPI and the database that uses postgreSQL to store pokemon to using party
###Challenges
- My biggest challenge was figuring out how the PokeAPI works and then being able to implement that to my full stack service. Another chalenge was once my service was deployed to render I ran into problems with there being to many fetches at once for render to handle. 
###Learning Outcome
- I was able to refine my understanding of how databases work while learning how to implement an external API to be utilized correctly. I also learned how to use OAuth from google to add authentication to my service and then be able to deploy my full-stack service as well. 
###Future Work
- With more time I believe I would refine how the search system works to allow for pokemon to be found by their generation and typing. I would also like to add an account page where even though you are able to login with google you can still have your own username and apply cosmetic changes to your pokemon.

# MVP Demo Video 
- https://uncg-my.sharepoint.com/:v:/g/personal/lswilkins_uncg_edu/IQBfG6Pnkh5aTpXQNv3lZCPdAaBzrq39vpqCq8LoP5MQY1M?e=7qKjnM&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D

## To Deploy to Render
1. Create a new Web Service on Render.
2. Connect your GitHub repository.
3. Specify the root directory to
```
sp26-next-ssr-main
```
in the build settings.
4. Set the build command to
```
npm install && npm run build
```
and the start command to
```
export AUTH_URL=$RENDER_EXTERNAL_URL && npm start
```
5. Add environment variables for your Google OAuth credentials:
```
DATABASE_URL='NEON STRING'
clientID='clientIDFromGoogleCloud'
clientSecret='clientSecretFromGoogleCloud'
AUTH_SECRET='our_secret_key_for_next_auth-config'
NEXTAUTH_URL='https://your-service.onrender.com'
```
6. Deploy the service and it should be live in a few minutes!
7. After the service is live, you need to register the origin and callback URL in your Google Cloud Console.
The origin should be in the format:
```
https://your-service.onrender.com
```

The callback URL should be in the format:
```
https://your-service.onrender.com/api/auth/callback/google
```
