## Role Based Access Control system ##

**Description** 
A simple RBAC system that defines the scope of access and level of operations for different users. There are three major roles with different level of permissions.
- staff  
- supervisor 
- admin

With authentication and authorization implemented, users can register, login and set roles.
Some user and todo routes such as getUser, getUsers, updateUser and updateUsers are protected. I also used the accessToken package of npm for setting the permissions.

 ## Technologies used ##
NodeJS
Express
MongoDB 
Mongoose
