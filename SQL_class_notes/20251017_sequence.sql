-- use testSequence;

create table myBooks (
	id int not null,
	booktitle nvarchar(50) not null
);


create table company_books (
	id int not null,
	booktitle nvarchar(50) not null
);


create sequence book_seq
as int
start with 101
increment by 1
;


insert into myBooks(id, booktitle)
values(next value for book_seq, '學C#從開始到專家');

insert into company_books(id, booktitle)
values(next value for book_seq, 'C# asp dotnet 8.0');

insert into company_books(id, booktitle)
values(next value for book_seq, 'SQL server手冊');

select * from myBooks;
select * from company_books;

select next value for book_seq;

alter sequence book_seq restart with 104;


