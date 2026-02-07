-- use testTransaction;


-- 在欄位上對值的限制，用check指令
/*
create table accounts (
	id int primary key identity(1,1),
	username varchar(50) not null unique, 
	balance bigint not null check (balance >= 0)
);
*/

/*
insert into accounts (username, balance)
values ('Tom', 10000),
	('Amy', 10000);
*/

-- explicit transactions mode
-- 開啟明顯交易模式，需要有commit trasaction，才會把新action寫入硬碟(否則更新會暫存在記憶體裡)
begin transaction;

update accounts set balance = balance -50 where username = 'Tom';
update accounts set balance = balance + 50 where username = 'Amy';

commit transaction;
-- commit 做完之後，會回到自動認可交易模式(auto-commit transactions mode)

-- 設定成隱含交易模式(implicit transactions mode)
-- 在一筆交易完成之後，接續的SQL還是需要下指令commit tran，才會完成交易
set implicit_transactions on;
update accounts set balance = balance + 50 where username = 'Amy';

select * from accounts;

-- 回復為自動認可交易模式(autocommit transactions mode)
set implicit_transactions off;

-- try and catch 的除錯控制
-- rollback 的用法
begin try
begin transaction;
update accounts set balance = balance - 50 where username = 'Tom';
update accounts set balance = balance + 50 where username = 'Amy';
commit transaction;

-- 因為balance 欄位有設定check 值不得為負，所以會出錯，就會執行下面的catch
begin transaction;
update accounts set balance = balance - 300000 where username = 'Tom';
update accounts set balance = balance + 300000 where username = 'Amy';
commit transaction;
end try
begin catch
	rollback transaction;  -- rollback transaction 的用法
	print '匯出金額超出帳戶餘額，有錯';
end catch















