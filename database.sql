CREATE TABLE public.User_role (id SERIAL NOT NULL PRIMARY KEY, role_name VARCHAR(100) NOT NULL);
CREATE TABLE public.User_app (id SERIAL NOT NULL PRIMARY KEY, first_name VARCHAR(100) NOT NULL, last_name VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL UNIQUE, user_role INT NOT NULL REFERENCES public.User_role(id));
CREATE TABLE public.Review (id SERIAL NOT NULL PRIMARY KEY,user_app_id INT NOT NULL REFERENCES public.user_app(id), review_text TEXT NOT NULL);
CREATE TABLE public.Category (id SERIAL NOT NULL PRIMARY KEY, cat_name VARCHAR(100) NOT NULL);
CREATE TABLE public.Job (id SERIAL NOT NULL PRIMARY KEY, category INT NOT NULL REFERENCES public.category(id), description TEXT NOT NULL, image VARCHAR(100) NOT NULL);

/* Insert Categories */
INSERT INTO category(cat_name)VALUES('drywall');
INSERT INTO category(cat_name)VALUES('roofing');
INSERT INTO category(cat_name)VALUES('demolition');

/* Insert Jobs */
INSERT INTO Job(category, description, image)VALUES((SELECT id from Category WHERE cat_name='drywall'), 'Drywall project for Rigby family', '/images/drywall1.jpg');
INSERT INTO Job(category, description, image)VALUES((SELECT id from Category WHERE cat_name='roofing'), 'Roofing done for Rexburg business', '/images/roofing1.jpg');
INSERT INTO Job(category, description, image)VALUES((SELECT id from Category WHERE cat_name='demolition'), 'Tore out insulation under Rexburg home', '/images/demolition1.jpg');

/* Insert User_roles */
INSERT INTO User_role(role_name)VALUES('Owner');
INSERT INTO User_role(role_name)VALUES('User');

/* Insert User */
INSERT INTO User_app(first_name, last_name, email, user_role)VALUES('Casey', 'Spain', 'spa12007@byui.edu', (SELECT id FROM User_role WHERE role_name='Owner'));

/* Insert Reviews */
INSERT INTO Review(user_app_id, review_text)VALUES((SELECT id from User_app WHERE email='spa12007@byui.edu'), 'We had an awesome experience working with Pannell Construction. Designing our home was easy and nearly effortless with all of their options ready for you pick & choose. Our home was built quickly, and the quality is excellent. They were quick to fix any initial issues, and we couldnt be happier with our home! We would recommend Pannel Construction again and again.');

INSERT INTO Review(user_app_id, review_text)VALUES((SELECT id from User_app WHERE email='spaincasey7@gmail.com'), 'Their homes are beautiful and affordable! They have a ton of floor plans to choose from and their staff is super helpful! Best home builder out there. They really care about their customers!');
INSERT INTO Review(user_app_id, review_text)VALUES((SELECT id from User_app WHERE email='pulp@fiction.com'), 'Amazing to work with, they were always very prompt to respond to our questions and concerns and they made sure things were done right. From the sales team, design team, superintendent down to the closing office the entire crew was personable and provided excellent customer service through the entire process! Highly Recommended!');
INSERT INTO Review(user_app_id, review_text)VALUES((SELECT id from User_app WHERE email='firstnotlast@gofast.com'), 'Pannell construction did such a great job with our house!');
INSERT INTO Review(user_app_id, review_text)VALUES((SELECT id FROM User_app WHERE email='spa12007@byui.edu'), 'Pannell Construction did a great job');


/* Select Statements */
SELECT * FROM Job JOIN Category USING(id) WHERE cat_name = 'demolition';
SELECT * FROM Job JOIN Category USING(id) WHERE cat_name = 'drywall';
SELECT * FROM Job JOIN Category USING(id) WHERE cat_name = 'roofing';

SELECT * FROM User_app JOIN Review USING(user_app_id);

UPDATE Job SET image = '/images/drywall1.jpg' WHERE image = 'drywall1.jpg';
UPDATE Job SET image = '/images/roofing1.jpg' WHERE image = 'roofing1.jpg';
UPDATE Job SET image = '/images/demolition1.jpg' WHERE image = 'demolition1.jpg';

INSERT INTO User_app(first_name, last_name, email, user_role)VALUES('Casey', 'Spain', 'spa12007@byui.edu', (SELECT id FROM User_role WHERE role_name='User'));

SELECT * FROM Review, User_app WHERE Review.user_app_id = User_app.id;