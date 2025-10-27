SELECT TOP (1000) [Id]
      ,[姓名]
      ,[電話]
      ,[地址]
      ,[email]
      ,[生日]
      ,[婚姻狀態]
      ,[點數]
  FROM [myDB].[dbo].[Persons]



  create table Products (
    id int primary key identity(1,1) not null,
    pname nvarchar(100),
    price int,
    pimage nvarchar(100),
    pdesc nvarchar(1000),
    pclass nvarchar(50),
    pamount int
  );


  insert into Products
  Values('蘋果', 50, '1.png', '超好吃的大蘋果', 'gen', 40),
    ('橘子', 28, '2.png', '超有福氣的大橘子', 'sale', 60),
    ('櫻桃', 180, '3.png', '大促銷！飄洋過海的美國櫻桃', 'sale', 50),
    ('葡萄', 200, '4.png', '又大又甜的葡萄', 'gen', 100),
    ('西瓜', 42, '5.png', '不甜免費的大西瓜', 'gen', 65),
    ('精緻的水果禮盒', 600, '6.png', '香蕉、葡萄、桃子、蘋果', 'fruitbox', 20)
;

select * from Products;