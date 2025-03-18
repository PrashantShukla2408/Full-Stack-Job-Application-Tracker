API DOCUMENTATION
#=====================================================================================
User Authentication

Register a new user

URL: /users/signup
Method: POST
Request Body:
{
"name":"Prashant Shukla",
"email":"prashantshukla1999@gmail.com",
"password":"qwerty"
}

Login a user

URL: /users/login
Method: POST
Request Body:
{
"email":"prashantshukla1999@gmail.com",
"password":"qwerty"
}

Job Application

Add a new Job
URL: /jobs/addJob
Method: POST
Headers:{
"Authorization": "Bearer token"
}
Request Body:{
"jobTitle":"Software Engineer",
"companyName": "Tech Corp",
"location": "New York",
"applicationDate": "2025-03-01",
"status": "Applied",
"salary": "100000",
"followUpDate": "2025-03-15",
"notes": "Follow up with HR",
"resume": "resume.pdf",
"userId":1
}

Get All Job Applications
URL: /jobs/getAllJobs
Method: GET
Headers:{
"Authorization": "Bearer token"
}

Update a Job Application
URL: /jobs/updateJob/:jobId
METHOD: PUT
Headers:{
"Authorization": "Bearer token"
}
Request Body:{
"status":"Accepted",
"followUpDate":"2025-3-20",
"notes":"Offer Accepted"
}

Company

Add a new company
URL: /company/addCompany
Method: POST
Headers:{
"Authorization": "Bearer token"
}
Request Body:{
"name": "RecurClub",
"location":"Gurugram, haryana",
"industry":"IT",
"website":"wwww.recurclub.com",
"type":"private",
"size":"1500",
"notes":"Dream Company",
"userId":1
}
