* Admin:
1. Upload videos (Maybe), Upload testimonials (Maybe) (Can be from clients or partners)
2. Upload blogs

* User: 
1. Should have a calendar where they can see the next open workshop session 
    EXAMPLE: (There are 12 days,  13 hours, 40 minutes, 5 seconds till the next course)
=> Admin: (how many people enrolled for this | how many availabe spaces there are)

2. Can enroll in a waiting list for the course. 
    - Enrollment:
        - complete form with personal and other data (To be determined)
        - pay for the participation (Stripe payment for the service)
=> Admin: (how many people enrolled for this | how many availabe spaces there are | who is on the waiting list)

4. Can see an event list (events that can be online/offline) and allow the user to enroll by completing a form
=> Admin: CRUD Events

5. Can see blogs
=> CRUD blogs

6. Users can buy digital products like books, courses and events? (to be discussed)

* Summary:
** What users could buy on the site:
- Products (books, courses)
- Personal workshop session?
- Events (offline/online)
** What users can do on the site:
- See next available workshops
- Enroll for a course by being sent on a waiting list
- See blogs
** What admins can do:
- Upload testimonials (maybe, not mandatory)
- Upload blog articles
- Add new products?

START PLAN:
- ADMIN:
    - CRUD admins
    - CRUD blogs
    - CRUD EVENTS
    - Read available data about users enrolled in the workshop, and events
    

TO BE DONE:
 - EMAIL VERIFICATION FOR ADMIN ACCOUNT (to be sent an email and also verifiy the format of email)
 - PASSWORD HASHING ADMIN
 - LOG IN/LOG OUT ADMIN