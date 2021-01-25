create role test login password 'test';
create database todo_list with owner test;

create table tasks (                                                             
id serial primary key
, title text
, description text
, owner integer
, priority integer
, dueDate text
, creator integer
, taskStatus integer
, createdAt timestamp with time zone
, updatedAt timestamp with time zone);

grant all on table tasks to test;
grant all on sequence tasks_id_seq to test;


INSERT INTO tasks
values
(2,'Task 1','sleep',6,1,'20200910',6,1,'2020-09-10T06:50:51.479Z','2020-09-10T06:50:51.479Z')
,(3,'Task 2','Task2',6,2,'20141001',6,1,'2020-09-10T16:30:35.115Z','2020-09-10T16:30:35.115Z')
,(4,'Task 2','Task2',7,2,'20141001',6,1,'2020-09-10T16:30:46.732Z','2020-09-10T16:30:46.732Z');

