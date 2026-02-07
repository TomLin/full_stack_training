-- use MyShopTwo;
-- use eCommerce;
/*
create view age_more_30 as
select
emp_id, emp_name, emp_department
from dbo.employee
where emp_age >= 30;
*/

/*
create view age_more_30_encrypt
with encryption
as
select
emp_id, emp_name, emp_department
from dbo.employee
where emp_age >= 30;

*/
/*
alter view age_more_30_check
with encryption
as
select
emp_id, emp_name, emp_department, emp_age
from dbo.employee
where emp_age >= 30
with check option;
*/

/*
insert into age_more_30_check (emp_name, emp_department, emp_age)
values ('Mary', 'HR', 99);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
*/

declare @myName as varchar(50);
set @myName = 'Mary';

-- select @myName;
print @myName;


declare @myId int;
set @myId = 4;
if @myId >= 4
print @myId;
else
print 'smaller than 5';

/*
declare @pId int
set @pId = 1

while (@pId <= 7)
	if (@pId = 2)
	begin
		set @pId = @pId + 1;
		continue
	end
	else
	begin
		select id, p_name, department, price
		from products
		where id = @pId;
		set @pId = @pId + 1;
	end
*/



declare @pId int
set @pId = 1

while (@pId <= 7)
	begin
	if (@pId = 2)
		begin
		set @pId = @pId + 1;
		continue
		end

		select id, p_name, department, price
		from products
		where id = @pId;
		set @pId = @pId + 1;
	end;

