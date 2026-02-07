-- create table testIndex;
-- use testIndex;


Create Table products(
	id int primary key identity,
	[p_name] nvarchar(50),
	department nvarchar(50),
	remark nvarchar(50)
)


SET NOCOUNT ON; -- 隱藏幾個資料列受影響
Declare @counter int = 1;

While(@counter <= 100000)
Begin
	Declare @name nvarchar(50) = 'nnn ' + CONVERT(varchar(10), @counter)
	Declare @dept nvarchar(10) = 'Dept ' + CONVERT(varchar(10), @counter)
	Declare @remark nvarchar(50) = 'rrr' + CONVERT(varchar(10), @counter)
	

	Insert into products values (@name, @dept, @remark)

	Set @counter = @counter +1
	
End

-- 要觀察資料搜尋成本，可以看兩個指標
-- 打開「包括實際執行計畫」的功能
-- 查看裡面 I/O 成本
-- 查看裡面 子樹 成本

-- 在加入新資料後，索引也需要重新整理 → (binary search tree) 需要重新整理
-- 在資料表下一層，索引選項下，按右鍵，選擇「重新組織」
select * from products where id = 70000;
select * from products where remark = 'rrr70000';

-- 透過MSSM的圖型化介面，來建立索引
