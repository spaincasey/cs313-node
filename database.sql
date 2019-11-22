CREATE TABLE public.User_app (id SERIAL NOT NULL PRIMARY KEY, first_name VARCHAR(100) NOT NULL, last_name VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL UNIQUE, user_role INT NOT NULL REFERENCES public.role(id));
CREATE TABLE public.Job (id SERIAL NOT NULL PRIMARY KEY, category INT NOT NULL REFERENCES public.category(id), description TEXT NOT NULL, image VARCHAR(100) NOT NULL);
CREATE TABLE public.Review (id SERIAL NOT NULL PRIMARY KEY,user_app_id INT NOT NULL REFERENCES public.user_app(id), review_text TEXT NOT NULL);
CREATE TABLE public.Category (id SERIAL NOT NULL PRIMARY KEY, cat_name VARCHAR(100) NOT NULL);
CREATE TABLE public.role (id SERIAL NOT NULL PRIMARY KEY, role_name VARCHAR(100) NOT NULL);

INSERT INTO category(cat_name)VALUES('drywall');
INSERT INTO category(cat_name)VALUES('roofing');
INSERT INTO category(cat_name)VALUES('demolition');

INSERT INTO Job(category, description, image)VALUES((SELECT id from Category WHERE cat_name='drywall'), 'Drywall project for Rigby family', 'drywall1.jpg');
INSERT INTO Job(category, description, image)VALUES((SELECT id from Category WHERE cat_name='roofing'), 'Roofing done for Rexburg business', 'roofing1.jpg');
INSERT INTO Job(category, description, image)VALUES((SELECT id from Category WHERE cat_name='demolition'), 'Tore out insulation under Rexburg home', 'demolition1.jpg');

SELECT * FROM Job JOIN Category USING(id) WHERE cat_name = 'demolition';

INSERT INTO User_app(email)VALUES();
DELETE FROM User_app WHERE email='[object HTMLInputElement]';

INSERT INTO Review(user_app_id, review_text)VALUES((SELECT id from User_app WHERE email='spa12007@byui.edu'), 'We had an awesome experience working with Pannell Construction. Designing our home was easy and nearly effortless with all of their options ready for you pick & choose. Our home was built quickly, and the quality is excellent. They were quick to fix any initial issues, and we couldnt be happier with our home! We would recommend Pannel Construction again and again.');
INSERT INTO Review(user_app_id, review_text)VALUES((SELECT id from User_app WHERE email='spaincasey7@gmail.com'), 'Their homes are beautiful and affordable! They have a ton of floor plans to choose from and their staff is super helpful! Best home builder out there. They really care about their customers!');
INSERT INTO Review(user_app_id, review_text)VALUES((SELECT id from User_app WHERE email='pulp@fiction.com'), 'Amazing to work with, they were always very prompt to respond to our questions and concerns and they made sure things were done right. From the sales team, design team, superintendent down to the closing office the entire crew was personable and provided excellent customer service through the entire process! Highly Recommended!');
INSERT INTO Review(user_app_id, review_text)VALUES((SELECT id from User_app WHERE email='firstnotlast@fast.com'), 'Pannell construction did such a great job with our house!');

INSERT INTO Review(user_app_id, review_text)VALUES((SELECT id FROM User_app WHERE email='spa12007@byui.edu'), 'Pannell Construction did a great job');