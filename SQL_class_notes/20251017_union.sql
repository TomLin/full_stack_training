-- use testUnion;

create table taipei_shop(
	id int not null primary key identity(1,1),
	phoneName varchar(50)
);

create table KH_shop(
	id int not null primary key identity(1,1),
	phoneName varchar(50)
);

insert taipei_shop(phoneName) values('iPhone8'),('iPhone12'), ('iPhone13'),('iPhone13 Pro');
insert KH_shop(phoneName) values('iPhoneSE'),('iPhoneSE2'),('iPhone12'), ('iPhone13');

-- UNION
select phoneName from taipei_shop
UNION
select phoneName from KH_shop
;

select phoneName from taipei_shop
UNION ALL
select phoneName from KH_shop
;

select phoneName from taipei_shop
intersect
select phoneName from KH_shop
;

-- 在 oracle 資料庫，except 的功能稱作 minus
-- 而在 MySQL 裡面，沒有這個keyword，只能用left join處理
select phoneName from taipei_shop
except
select phoneName from KH_shop
;

-- 用 left join 做出 except 的功能
select t.id, t.phoneName
from taipei_shop t
left join KH_shop k on t.phoneName = k.phoneName
where k.phoneName is null
;
