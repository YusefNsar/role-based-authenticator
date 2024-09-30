### auth

1- signin
 post /auth/signin
  - email
  - password

  1. hash password
  2. search db for email and passwordHash
  3. if user exists return user and jwt token

2- singup
 post /auth/signup
  - email
  - name
  - address

  1. generate otp
  2. upsert user and save otp
  2. send otp by mail

3- verify-otp
 post /auth/verify-otp
  - email
  - otp

  1. search user by email and otp
  2. return success if user found

4- reset-password
 post /auth/reset-password
  - email
  - otp
  - password

  1. search user by email and otp
  2. if user found hash password
  3. save password with user
  4. return success


### profile
1- get profile
get /profile


2- edit profile
patch /profile
- name
- address


#### crud users

1- get all users
get /users
admin guard


2- create user
 post /users
 - email
 - password
 - name
 - address
admin guard

3- edit user
 patch /users/:userId
 - role
 - name
 - address
admin guard

4- delete user
delete /users/:userID
- email
admin guard