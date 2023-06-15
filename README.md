# Just One Task 
## a minimalist task management application


### Quick Start

In order to run this application, you'll first need to create a [SQL database](https://www.elephantsql.com/).  After that, you'll want to create a table in your database using the included ```schema``` file. Once you've set that up, you're good to go!

### Directions:
#### From your command line:
- run ```redis-server``` to start your Redis instance.

### From your source-code editor:
1. Inside your ```server/controller/pgController.js``` file, update 

    ```connectionString=<your SQL database link here>```
    (NOTE: this is for demonstration purposes only!  Before connecting to any sensitive databases or paid database accounts, please create a .env file and replace the link with an ENV link instead!)
2. ``` npm install ``` dependencies.
3. Run ``` npm run devserver ``` and you're good to go!


## Built With
- React
- Express/Node
- Tailwind

## c Hank McGill

## License
[MIT](https://choosealicense.com/licenses/mit/)
