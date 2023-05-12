# DataNav Web

## Project setup

Be sure you are in the folder DataNavWeb and run the following command:

### If it is for Development

```
npm run dev
```

### If it is for Production or test the backend

To run the project in production mode, you must install pm2 globally with the following command:
```
npm install pm2 -g
```
Then run the following command:
```
npm run build-app
```
*Note: This will create a folder called "public" with the compiled files*

Finally, if you want to stop the project, run the following command:
```
pm2 stop DataNavWeb
```