# WorkersInfoConsolidation
Микросервис для консолидации данных о сотрудниках. 
Требует PostgreSQL базы данных (пропишите ConnectionString в appsetings.json).
По умолчанию находится на 5001 порту, доступ через https://localhost:5001/api/Workers

# API

**Get all workers information**
----
Returns json data about all workers.

* **URL**
	/All	

* **Method:**
 
  `GET` 
  
**Get information about single worker**
----
Returns json data about a single worker.

* **URL**
	/Worker/:id	

* **Method:**
 
  `GET` 
*  **URL Params** 

   **Required:**
 
   `id=[integer]` worker's id

**Get information about single worker by his email**
----
Returns json data about a single worker.

* **URL**
	/WorkerByEmail/:email	

* **Method:**
 
  `GET` 
*  **URL Params** 

   **Required:**
 
   `email=[string]` worker's email

**Delete worker**
----
Deletes information about worker.

* **URL**
	/Delete/:id	

* **Method:**
 
  `DELETE` 
*  **URL Params** 

   **Required:**
 
   `id=[integer]` worker's id
   
**Add worker**
----
Adds information about worker.

* **URL**
	/Add

* **Method:**
 
  `POST` 
* **Data Params**
	Put information about worker in body of the request.

**Get all workers information in excel file**
----
Returns excel excel data of all workers.

* **URL**
	/Excel	

* **Method:**
 
  `GET`