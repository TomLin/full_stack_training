/*
create procedure paid_condition
as
select
paid, count(*)
from orders
group by paid;
*/

-- 執行預存程序
-- execute paid_condition;


alter procedure procedure_product_id_dept
@product_id int
as
BEGIN
select
department
from products where id = @product_id;
select 1;
END


execute procedure_product_id_dept 21; -- 30這個argument會代入到@product_id


-- 小於等於xxx價格的商品
-- 以stored procedure 來執行，簡寫指令 proc

create proc procedure_product_price_less_than
@price int
as
select * from products where price <= @price;

-- 執行 procedure
-- 簡寫指令 exec

exec procedure_product_price_less_than 40;


