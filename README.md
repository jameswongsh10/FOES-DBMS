This application requires the use of XAMPP if MySQL server is hosted from there, Composer, PHP 8.0 and npm

1.	Download [XAMPP](https://www.apachefriends.org/download.html) if needed. 
2.	Install [Composer](https://getcomposer.org/download/) and install [npm](https://radixweb.com/blog/installing-npm-and-nodejs-on-windows-and-mac#windows)
3.	Go to XAMPP and start both Apache and SQL server.
4.	Git clone the repository to a local file.
5.	Run ```composer update``` && ```composer install``` in that file
6.	Copy ```.env.example``` to ```.env```. The user can change the settings in ```.env``` if they so chooses. For example, they can change the name of the database from ```foesdbms```, which is the current name, to any name that they want.
7.	Proceed to ```localhost/phpMyAdmin``` and create a new database based on the name they have chosen in the previous step.
8.	Add the MySQL bin folder path to ```DB_MYSQLDUMP_PATH``` in ```.env```. For example, ```DB_MYSQLDUMP_PATH=C:\xampp\mysql\bin```
9.	Run ```php artisan key:generate``` 
10.	Run ```php artisan jwt:secret```
11.	Run ```npm install``` 
12.	Run ```php artisan migrate``` 
13.	Navigate to ```…/React/foes-db``` and run ```npm install``` 
14.	In that folder, run ```npm start```
15.	Navigate back to the root folder, and run ```php artisan serve```

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
