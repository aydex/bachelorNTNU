# bachelor

1. Install Apache2, and make sure it is running.
    
  (a) Enable the module rewrite:
    
  ```$ sudo a2enmod rewrite```
    
  (b) Restart apache2:
    
  ```$ sudo service apache2 restart```
2. Install PHP7.0 with all the required extensions:

  ```$ sudo apt-get install php7.0 php7.0-cli php7.0-fpm php7.0-gd php7.0-json php7.0-mysqlphp7.0-readline php-curl```

3. Install MySQL5.5:

  ```$ sudo apt-get install mysql-server```

4. Import data from sql file:

  ```$ mysql -u root -p kommunalrapport < data.sql```

5. Copy contents of zipped folder of project to

  ```/var/www/(or your apache2 html/www server that serves files)```

6. Create an initialization file for PHP configuration and fill in the database password and hostname of the server:

  ```$ sudo echo ";Config kommunal rapport db_name = kommunalrapport hostname = HOSTNAME_OF_SERVERusername = DB_USERNAME password = DB_PASSWORD" >> YOUR_APACHE_SERVER_DOCUMENT_PATH```
  
  ReplaceHOSTNAME_OF_SERVER with the server hostname, DB_USERNAME with MySQL username, DB_PASSWORD with MySQL password and YOUR_APACHE_SERVER_DOCUMENT_PATH with the location of apache2s location for http-file serving.

7. Install needed components with composer:
  
  ```$ php composer.phar install```

The system should now be installed and ready for use.
