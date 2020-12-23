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