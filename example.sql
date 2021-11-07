CREATE TABLE users(
    user_id serial PRIMARY KEY,
    user_name VARCHAR(20),
    user_address VARCHAR(20),
    user_sex VARCHAR(1),
    user_role VARCHAR(10)
);

INSERT INTO users(user_name, user_address, user_sex, user_role)
VALUES (
    'Kushagra', 'Dhobighat', 'M', 'user'
);

CREATE TABLE appointments(
    appointment_id serial PRIMARY,
    patient_id int,
    doctor_id int,
    appointment_title VARCHAR(100),
    appointment_date TIMESTAMP,
    appointment_is_active BOOLEAN,
    constraint fk_patient foreign key(patient_id) references users(user_id),
    constraint fk_doctor foreign key(doctor_id) references users(user_id)
);

INSERT INTO appointments(patient_id, doctor_id, appointment_title, appointment_date, appointment_is_active)
VALUES(1,2,'braces installation', NOW(), true);

INSERT INTO appointments(patient_id, doctor_id, appointment_title, appointment_date, appointment_is_active)
VALUES(3,2,'braces removal', NOW(), true);


SELECT appointment_date, appointment_title from appointments inner join users where doctor_id=2;


-- //

CREATE TABLE users(
    id serial PRIMARY key,
    name VARCHAR(50),
    address VARCHAR(50),
    contact VARCHAR(20),
    email VARCHAR(50),
    sex VARCHAR(1),
    is_active BOOLEAN DEFAULT true,
    created_on TIMESTAMP DEFAULT NOW(),
    role VARCHAR(20) DEFAULT 'patient'
);

INSERT INTO users(name, address, contact, email, sex, role) VALUES ('gaurav', 'ranibari', '9876543210', 'g@g.com', 'm', 'doctor');
INSERT INTO users(name, address, contact, email, sex, role) VALUES ('luna', 'ranibari', '9876543210', 'l@g.com', 'm', 'doctor');
INSERT INTO users(name, address, contact, email, sex, role) VALUES ('kushagra', 'sanepa', '9876543210', 'k@g.com', 'm', 'patient');
INSERT INTO users(name, address, contact, email, sex, role) VALUES ('samhita', 'sanepa', '9876543210', 's@g.com', 'm', 'patient');
INSERT INTO users(name, address, contact, email, sex, role) VALUES ('aashram', 'satdobato', '9876543210', 'aa@g.com', 'm', 'patient');
INSERT INTO users(name, address, contact, email, sex, role) VALUES ('anwesh', 'kalanki', '9876543210', 'a@g.com', 'm', 'patient');

CREATE TABLE doctors(
    id int PRIMARY key,
    department VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_on TIMESTAMP DEFAULT NOW(),
    nmc VARCHAR(10),
    constraint fk_user foreign key(id) references users(id) on delete cascade
);

insert into doctors(id, department, nmc) VALUES(1, 'ortho', '5678');

CREATE TABLE patients(
    id int PRIMARY key,
    is_active BOOLEAN DEFAULT true,
    created_on TIMESTAMP DEFAULT NOW(),
    constraint fk_user foreign key(id) references users(id) on delete cascade
);

insert into patients(id) VALUES(3);
insert into patients(id) VALUES(4);
insert into patients(id) VALUES(5);
insert into patients(id) VALUES();


select * from doctors inner join users on doctors.id = user.id;

select name, contact,email, doctors.is_active, department, nmc from doctors inner join users on doctors.id=users.id;

select name, contact, email, patients.is_active, from patients inner join users on patients.id=users.id;

CREATE TABLE appointments(
    id serial PRIMARY key,
    title VARCHAR(50),
    subtitle VARCHAR(200),
    created_on TIMESTAMP DEFAULT NOW(),
    patient_id int,
    doctor_id int,
    cost float,
    status varchar(10) DEFAULT 'pending',
    appointment_for TIMESTAMP DEFAULT NOW(),
    constraint fk_patient foreign key(patient_id) references patients(id) on delete cascade,
    constraint fk_doctor foreign key(doctor_id) references doctors(id) on delete cascade
);

insert into appointments(title, subtitle, coast, patient_id, doctor_id)
VALUES('teeth scaling', 'scaling the top teeth', 50, 4,1);


select a.id, a.title, a.subtitle, a.appointment_for, d.department, u.name as "doctor", u.contact  
from appointments as a 
    inner join doctors as d on a.doctor_id=d.id 
    inner join users as u on u.id = d.id; 