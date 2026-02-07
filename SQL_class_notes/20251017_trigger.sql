-- use eCommerce;

select * from users;

create trigger inform01
on users
after insert 
as
print '有人註冊了';

insert into users(first_name, last_name)
values ('文西', '達');


-- use testTrigger;


create table users_account (
	id int primary key identity(1,1),
	username varchar(50) unique not null,
	passwords varchar(50) not null
);

insert into users_account (username, passwords)
values ('jerry', 'ok666')
;


-- 當使用者更新密碼之後，會將使用者之前的舊密碼，存在此資料表
create table old_password (
	user_id int not null,
	passwords varchar(50) not null,
	updatedBefore datetime not null  -- 捨棄舊密碼，使用新密碼的時間
);


-- drop table users_account;


-- 建立觸發程序
create trigger trigger_save_old_password
on users_account
after update
as
begin
  if update(passwords)
  -- if 判斷式裡面，可以放的syntax範例
  -- if UPDATE(Salary) OR UPDATE(Bonus) → Check if Salary OR Bonus column was updated
  -- if UPDATE(Salary) AND UPDATE(Bonus) → Check if BOTH Salary AND Bonus were updated together
  -- if EXISTS (SELECT 1 FROM Employees WHERE Department = 'Sales') → 一個statement
  -- if EXISTS (
  --    SELECT 1 
  --      FROM Inserted i
  --      JOIN Deleted d ON i.EmployeeID = d.EmployeeID
  --      WHERE i.Salary < d.Salary)  → 用子查詢
  -- if @Dept = 'Sales' → 判斷變數值

    begin
	  declare @userId int
	  declare @old_password varchar(50)

	  select
		-- select的回傳兩個欄位值，assign給了兩個變數
	     @old_password = passwords,  
		 @userId = id
	  -- 暫存的資料表(針對insert, update, delete 指令，sql server 會自動產生暫時的資料表，備用)
	  from deleted  
	  

	  insert into old_password(user_id, passwords, updatedBefore)
	  values(@userId, @old_password, getDate())
	end
end


update users_account
set passwords = 'ok777'
where username = 'jerry'
;

select * from users_account;
select * from old_password;

-- 查看DB有哪些trigger
select * from sys.trigger_events;

-- 刪除 Trigger
drop trigger trigger_save_old_password;



