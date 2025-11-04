-- create database dreamClock;

-- use dreamClock;

create table img (
	id int primary key not null,
	imgFile nvarchar(100) not null,
	msg nvarchar(1000) not null,
	memRank nvarchar(50) not null
);


-- drop table if exists img;

insert into img (id, imgFile, msg, memRank)
Values 
	(1, 'CongratsImg01.png', N'Rewards for standard members: Dark Sky tour on Mount. John\n普通會員獎勵: 在約瑟山上的星空導覽!', 'Standard'),
	(2, 'CongratsImg02.png', N'Rewards for gold members: Dance with penguines at the end of the world.\n黃金會員獎勵: 在地極之處，與企鵝共舞!', 'Gold'),
	(3, 'CongratsImg03.png', N'Rewards for world members: A getaway trip for two on a desert island.\n世界會員獎勵: 兩人的荒島假期!', 'World'),
	(4, 'CongratsImg04.png', N'Rewards for infinite members: A camping night on Mars.\n無限會員獎勵: 火星上的露營體驗', 'Infinite')
;


select * from img;

create table dreamMember (
	acct nvarchar(100) primary key not null,
	pword nvarchar(100) not null,
	points int default 0 not null,
	lstUpdate datetime default getdate() not null
);


insert into dreamMember (acct, pword, points, lstUpdate)
Values
	('Tom', '0912987654', 10, '2025-01-01 12:30:00'),
	('Jane', '0912333444', 60, '2024-12-30 15:45:00')
;


select * from dreamMember;

create table memberRank (
	threshold int not null,
	memRank nvarchar(50) not null
);

insert into memberRank (threshold, memRank)
Values
	(0, 'Standard'),
	(25, 'Gold'),
	(50, 'World'),
	(75, 'Infinite')
;


