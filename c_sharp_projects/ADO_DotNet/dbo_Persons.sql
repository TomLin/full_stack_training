use myDB;

create table Persons (
	id int identity(1,1) not null,
	[姓名] [nvarchar](50) NULL,
	[電話] [nvarchar](50) NULL,
	[地址] [nvarchar](100) NULL,
	[email] [nvarchar](100) NULL,
	[生日] [date] NULL,
	[婚姻狀態] [bit] NULL,
	[點數] [int] NULL,
);

INSERT [dbo].[Persons] ([姓名], [電話], [地址], [email], [生日], [婚姻狀態], [點數]) VALUES (N'王小明', N'0955118935', N'台中市西屯區中清路9999號', N'eveWang@kdkso.com.tw', CAST(N'1992-08-20' AS Date), 1, 300)
INSERT [dbo].[Persons] ([姓名], [電話], [地址], [email], [生日], [婚姻狀態], [點數]) VALUES (N'陳大光', N'0912345678', N'高雄市前金區中正路8888號', N'mm@gg.com.tw', CAST(N'1985-05-05' AS Date), 0, 1000)
INSERT [dbo].[Persons] ([姓名], [電話], [地址], [email], [生日], [婚姻狀態], [點數]) VALUES (N'張大書', N'0977555999', N'高雄市岡山區中華路888號', N'rr@ttt.com', CAST(N'1979-01-05' AS Date), 1, 600)
INSERT [dbo].[Persons] ([姓名], [電話], [地址], [email], [生日], [婚姻狀態], [點數]) VALUES (N'黃大春', N'0955123789', N'台南市東區中山路444號', N'bb@ccct.com', CAST(N'1977-07-06' AS Date), 0, 700)
INSERT [dbo].[Persons] ([姓名], [電話], [地址], [email], [生日], [婚姻狀態], [點數]) VALUES (N'新名子', N'0977898898', N'高雄市三民區中山路444號', N'kkkk@mmmmm.com', CAST(N'1988-01-03' AS Date), 0, 588)
INSERT [dbo].[Persons] ([姓名], [電話], [地址], [email], [生日], [婚姻狀態], [點數]) VALUES (N'Jack Well', N'0977885412', N'Taipei Beitou Greater Rd No 15', N'dddg@wal.com.tw', CAST(N'1996-04-06' AS Date), 0, 997)
INSERT [dbo].[Persons] ([姓名], [電話], [地址], [email], [生日], [婚姻狀態], [點數]) VALUES (N'Mary Green', N'0965412333', N'KH Taiwan No 999', N'booking@gg.com', CAST(N'1977-03-05' AS Date), 0, 3)
INSERT [dbo].[Persons] ([姓名], [電話], [地址], [email], [生日], [婚姻狀態], [點數]) VALUES (N'kkk', N'0213', N'tta', N'bbb', CAST(N'1900-01-01' AS Date), 0, 777)



