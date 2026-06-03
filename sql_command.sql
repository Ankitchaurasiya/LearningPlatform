psql postgres
\l
\r (creat the sql line)
CREATE DATABASE nodedb;

-----
-- create the users table
create table users (
	id SERIAL primary key,
	name text not null,
	email_id VARCHAR(255) unique not null,
	username varchar(255) not null,
	create_at timestamp default current_timestamp,
	updated_at timestamp default current_timestamp
);

-- drop table users;
--delete from users;
-- create the courses table

create table courses (
	id SERIAL primary key,
	title varchar(255) not null,
	description TEXT,
	category varchar(255) not null,
	created_at timestamp default current_timestamp,
	updated_at timestamp default current_timestamp
);

-- drop table courses;

-- create enrollment table
create table enrollments (
	id SERIAL primary key,
	user_id Integer not null,
	course_id Integer not null,
	created_at timestamp default current_timestamp,
	updated_at TIMESTAMP default CURRENT_TIMESTAMP,
	
	constraint fk_user 
		foreign key (user_id)
		references users(id)
		on delete cascade,
		
	constraint fk_course
		foreign key (course_id)
		references courses(id)
		on delete cascade,
		
		constraint unique_enrollment
			UNIQUE(user_id, course_id)
);

alter table enrollments add column progress Integer default 0
check (progress >= 0 and progress <= 100);



-- users queries
select * from users;
insert into users (name, email_id, username) values ('ankit', 'ankit@gmail.com', 'an_it_') returning *;

select u.name, u.email_id, u.username, count(*) as enrolled_courses, 
sum(case when e.progress = 100 then 1 else 0 end ) as completed_courses,
--round(sum(e.progress)::numeric / count(*), 5) as average_progress
round(AVG(e.progress), 5) as average_progress
from users u
left join enrollments e on e.user_id = u.id 
where u.id = 1
group by u.email_id, u.name, u.username;

select  u.name, u.email_id, u.username, count(*) as enrolled_courses, 
sum(case when e.progress = 100 then 1 else 0 end ) as completed_courses,
round(AVG(e.progress), 5) as average_progress
from users u
left join enrollments e on e.user_id = u.id
group by u.id, u.email_id, u.name, u.username
order by completed_courses desc, average_progress DESC;


SELECT
    DENSE_RANK() OVER (
        ORDER BY
            completed_courses DESC,
            average_progress DESC
    ) AS rank,
    *
FROM (
    SELECT
        u.id,
        u.name,
        COUNT(e.id) AS enrolled_courses,

        COALESCE(
            SUM(
                CASE
                    WHEN e.progress = 100 THEN 1
                    ELSE 0
                END
            ),
            0
        ) AS completed_courses,

        COALESCE(
            ROUND(AVG(e.progress), 2),
            0
        ) AS average_progress

    FROM users u
    LEFT JOIN enrollments e
        ON e.user_id = u.id

    GROUP BY u.id, u.name
) t;


create table user_creds (
id serial primary key,
user_id integer unique not null references users(id),
password_hashed  varchar(255) not null,
created_at timestamp default current_timestamp
)

alter table user_creds alter column password_hashed type text;

--delete from user_creds;

-- courses queries

insert into courses (title, description, category) values('RockXD', 'Assessment of RockXd', 'SDE');
--delete from courses where id = 3;

-- enrollment queries
insert into enrollments (user_id, course_id) values('1', '1');