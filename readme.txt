We have used HTML, CSS, JavaScript and Node.js to build our web application. The database used to store necessary information for our application is MySQL.
The DDL for the tables along with SQL statements to insert some dummy data for testing the functionality of our application have been included in the master
branch of our project GitHub repository in a zipped file named "Table_structures_and_Dummy_data.zip". Inside the .zip file, the db_table_structure.txt file contains the DDL statements along with a one line description for some of the table attributes that might seem confusing from the name. The rest of the files named testData_'table_name'.txt
contain the SQL statements to insert dummy data into the respective tables. The data has to be inserted in the following order: testData_users > meters > usage_history > area_rates > water_bill. At last, the Triggers.txt file contents should be run in mysql workbench to setup the triggers on the tables.

The latest Node.js installation is also required to run our application. The application can be run by going to the project directory and using the "node app.js"
command in the terminal after Node.js has been installed. The application can then be viewed by typing "localhost:3000" in the url bar of the browser.
