# Series-Collection
##Set up the Django app:
Create a virtualenv:
- `pip install virtualenv`  
- `virtualenv env`  
- `source env/bin/activate`  

Install requirements:
- `pip install django`  
- `pip install djangorestframework`  
- `pip install drf-nested-routers`
- `pip install django-extensions`

Run server:
- `cd server`  
- `python manage.py migrate`  
- `python manage.py runserver`  

##Set up Angular app:
- `cd client`  
- `npm install`  
- `npm start`  

Required:
 - locally enabled cross origin
 - installed node.js > 6.0
