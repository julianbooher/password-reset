-- Highlight all of the lines below CREATE TABLES and execute the query.

-- If you need to restart the database, this DROP statement two lines below will drop all tables in the database in the correct order. 
-- Remove the '--' tag in front of it before you highlight it and press execute.
-- DROP TABLE budget_wording, greeting, app_question, ce_app_question, question, ce_question, app, ce_notes, notes, ce_app, app, grant_window, focus_area, review_status, "user";

--------------------- CREATE TABLES ------------------

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR (80) UNIQUE NOT NULL,
  "password" VARCHAR (1000) NOT NULL,
  "org_name" VARCHAR (100),
  "background" VARCHAR (1000),
  "phone" VARCHAR (25),
  "contact_name" VARCHAR (150),
  "admin" boolean DEFAULT false,
  "remax_employee" boolean DEFAULT false

);

CREATE TABLE "grant_window" (
  "id" SERIAL PRIMARY KEY,
  "start_date" date,
  "end_date" date,
  "funds_available" int
);

CREATE TABLE "review_status" (
  "id" SERIAL PRIMARY KEY,
  "status" VARCHAR (50)
);

CREATE TABLE "focus_area" (
  "id" SERIAL PRIMARY KEY,
  "focus" VARCHAR (50),
  "active" BOOLEAN DEFAULT true
);

CREATE TABLE "app" (
  "id" SERIAL PRIMARY KEY,
  "date_received" date NOT NULL DEFAULT CURRENT_DATE,
  "grant_window_id" int REFERENCES "grant_window",
  "focus_area_id" int REFERENCES "focus_area",
  "user_id" int REFERENCES "user",
  "budget" INT,
  "review_status_id" int REFERENCES "review_status" DEFAULT 2
);

CREATE TABLE "question" (
  "id" SERIAL PRIMARY KEY,
  "question_text" varchar,
  "active" boolean DEFAULT true,
  "created" date DEFAULT CURRENT_DATE
);

CREATE TABLE "app_question" (
  "id" SERIAL PRIMARY KEY,
  "app_id" int REFERENCES "app",
  "question_id" int REFERENCES "question",
  "answer_text" varchar,
  "review_score" int
);

CREATE TABLE "notes" (
  "id" SERIAL PRIMARY KEY,
  "review_note" VARCHAR (750),
  "date_added" date NOT NULL DEFAULT CURRENT_DATE,
  "app_id" int REFERENCES "app"
);

CREATE TABLE "greeting" (
	"id" SERIAL PRIMARY KEY,
	"header" VARCHAR(100),
	"message" VARCHAR(1000),
	"render_position" INT 
);

CREATE TABLE "ce_app" (
	"id" SERIAL PRIMARY KEY,
	"date_received" date NOT NULL DEFAULT CURRENT_DATE,
	"focus_area_id" int REFERENCES "focus_area" DEFAULT 5,
	"user_id" int REFERENCES "user",
	"review_date" date DEFAULT null,
	"budget" INT,
	"review_status_id" int REFERENCES "review_status" DEFAULT 2
);

CREATE TABLE "ce_question" (
	"id" SERIAL PRIMARY KEY,
	"question_text" varchar,
	"active" boolean DEFAULT true,
	"created" date DEFAULT CURRENT_DATE
);

CREATE TABLE "ce_app_question"(
	"id" SERIAL PRIMARY KEY,
	"app_id" INT REFERENCES "ce_app",
	"question_id" INT REFERENCES "ce_question",
	"answer_text" varchar,
	"review_score" int
);

CREATE TABLE "ce_notes" (
	"id" SERIAL PRIMARY KEY,
	"review_note" VARCHAR (750),
	"date_added" date NOT NULL DEFAULT CURRENT_DATE,
	"app_id" INT REFERENCES "ce_app");

CREATE TABLE "budget_wording" (
  "id" SERIAL PRIMARY KEY,
  "question_wording" VARCHAR(120) NOT NULL
);

----------- TEST DATA INSERTS -----------------------------------

INSERT INTO "user"("username", "password", "org_name", "background", "phone", "contact_name", "admin") 
VALUES
('admin', '$2a$10$gjd.WRi46NMPv3CKVZaM1eWz70yQNNDXbZSNZRVI2/ecCNhYMgBSC', 'Results Foundation', 'Grant-giving non-profit.', '000-000-0000', 'Blaire Molitor', TRUE),
('chester@bowl.com', '$2a$10$oYihePWEyOXnwkQ8Me6v0e8DJhs4swzIh3R62TwdrAaaU3d26snbi', 'Chester Bowl', 'Year-round program providing fun outdoor activities for youth of all ages and from all socio-economic backgrounds.', '612-765-4321', 'Chester A. Bowl', FALSE),
('wonderwall@oasis.net', '$2a$10$VzSE4kSvqLqeugiJjLp8mOuanYh5F.8FKGak.cb6K85AyPD5yF2mO', 'The Oasis Foundation', 'Bringing music to underprivileged kids in Liverpool', '4553678923', 'Liam Gallagher', FALSE),
('greenthumb@localgardens.org', '$2a$10$t8msWoIPpRDSEAr6p8VJGuwO5oYfIO51dhQNl7IQji.1Sl3Ytd0sS', 'Local Gardens Initiative', 'Community garden initiative designed to teach kids about healthy eating', '2345678901', 'Sara Greenleaf', FALSE);

INSERT INTO "grant_window"("start_date", "end_date", "funds_available") 
VALUES
('2021-01-29', '2021-02-18', 20000);

INSERT INTO "focus_area"("focus") 
VALUES
('Education'), 
('Health'), 
('Mentorship'), 
('Housing'),
('Community Engagement');

INSERT INTO "review_status"("status") 
VALUES
('Accepted'), 
('Pending'), 
('Rejected');

INSERT INTO "app"("grant_window_id", "focus_area_id", "user_id", "budget", "date_received") 
VALUES
(1, 3, 2, 2500, '2021-02-01'),
(1, 1, 3, 1400, '2021-02-02'),
(1, 2, 4, 2000, '2021-02-03');

INSERT INTO "question"("question_text") 
VALUES 
('Project Description or Description of Need'), 
('Goals and Objectives'), 
('Target Population'), 
('Timeline of Activities'), 
('How will you measure the use of funds issued by the grant?');

INSERT INTO "app_question"("app_id", "question_id", "answer_text")
VALUES 
(1, 1, 'Chester Bowl seeks to create a safe and fun way for children to experience the outdoors on a regular basis. Located in northern Minnesota, Chester Bowl has long been a staple of the community. Providing Summer Camp programs with scholarship opportunities in the Summer, as well as skiiing and snowboarding lessons on the hill in the winter.'), 
(1, 2, 'Our goal is to give today''s youth a safe place to be young and enjoy the wonderful things that nature in northern Minnesota has to offer.'), 
(1, 3, 'Teens & other youth.'), 
(1, 4, 'The activities these funds will be used for will take place over the winter months, from mid-October to the end of February.'), 
(1, 5, 'Success will be measured by ticket sales. If we can increase the amount of participants at Chester Bowl from last year this will be considered a successful use of funds.'),
(2, 1, 'The Oasis Foundation runs a 4-week rock and roll camp for kids without access to music education.'),
(2, 2, 'To spread education, inclusion and music'),
(2, 3, 'Teens from 13 - 17'),
(2, 4, 'January-March: Recruitment, April - June: Preparation, July: Camp, August: Evaluation, November: Planning for next year'),
(2, 5, 'Students and counselors will evaluate the program upon its completion.'),
(3, 1, 'This project turns abandoned urban spaces into community gardens '), 
(3, 2, 'To teach kids about healthy eating, plant care, and the value of investing in the community.'),
(3, 3, 'Children ages 6 and up'),
(3, 4, 'January: Acquisition of materials, February - March: Greenhouse growing, April: Beginning of community classes, May - August: gardening!, September: Harvest Party!'),
(3, 5, 'By the amount of contact our program is able to make with the community, bringing in gardeners, volunteers, and other organizations to help our garden grow.');


INSERT INTO greeting ("header", "message", "render_position")
VALUES ('About Us', 'The Results Foundation was established in 2015 by RE/MAX Results to give back to local communities by providing grants and scholarships to organizations and individuals 
throughout Minnesota and Wisconsin, believing there’s no greater investment than helping individuals and communities overcome obstacles and achieve their goals. Inspired by the philanthropic work of the Sales Executives and staff of RE/MAX Results, the foundation has donated nearly $250,000 in grants to date.', 1),
('Mission','To partner with community organizations and educational institutions in Minnesota and Wisconsin to empower individuals to achieve success through housing, health, education, and mentoring programs.', 2),
('Funding', 'A portion of every closed sale from RE/MAX Results and Results Title is donated to the foundation. Funding is also provided via Results Foundation events including the annual golf tournament, Rock the Foundation, as well as donations from generous individuals and community partners.', 3);


INSERT INTO "ce_question"("question_text")
VALUES
('Organization or Event Name'),
('Organization or event information'),
('Description of request'),
('How does this request support the community?'),
('Request timeline, when is the funding needed?');

INSERT INTO "user" ("username", "password", "phone", "contact_name")
VALUES
('larasmith@results.net', '$2a$10$3iBnDAz5DQ.qZjJrzIHUbe3OGJhQY/Zhgh8JSxdX27fOZWF78H17.', '651-867-5309', 'Lara T. Smith');

INSERT INTO "ce_app" ("user_id", "budget")
VALUES
(5, 2500);

INSERT INTO "ce_app_question"("app_id", "question_id", "answer_text")
VALUES
(1, 1, 'Helping Hands of MN'),
(1, 2, 'Feeding the sick and homebound hot and from scratch meals'),
(1, 3, 'We will pay for the supplies needed to make 200 from scratch meals for homebound hospice patients'),
(1, 4, 'This supports the community by feeding and lifting the spirits of those unseen by many.'),
(1, 5, 'We would like the requested amount in May, as that is when the charity typically sees its lowest donations but highest need.');

INSERT INTO "budget_wording" ("question_wording")
VALUES ('Budget');