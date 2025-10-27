-- create database myDB;
-- use myDB;

CREATE TABLE [dbo].[Persons] (
    [Id]    INT            IDENTITY (1, 1) NOT NULL,
    [姓名]    NVARCHAR (50)  NULL,
    [電話]    NVARCHAR (50)  NULL,
    [地址]    NVARCHAR (100) NULL,
    [email] NVARCHAR (100) NULL,
    [生日]    DATE           NULL,
    [婚姻狀態]  BIT            NULL,
    [點數]    INT            NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


SET IDENTITY_INSERT [dbo].[Persons] ON
INSERT INTO [dbo].[Persons] ([Id], [姓名], [電話], [地址], [email], [生日], [婚姻狀態], [點數]) VALUES (1, N'王小明', N'0955118935', N'台中市西屯區中清路9999號', N'eveWang@kdkso.com.tw', N'1992-08-20', 1, 300)
INSERT INTO [dbo].[Persons] ([Id], [姓名], [電話], [地址], [email], [生日], [婚姻狀態], [點數]) VALUES (2, N'陳大光', N'0912345678', N'高雄市前金區中正路8888號', N'mm@hh.com.tw', N'1985-05-05', 0, 1000)
INSERT INTO [dbo].[Persons] ([Id], [姓名], [電話], [地址], [email], [生日], [婚姻狀態], [點數]) VALUES (3, N'張大書', N'0977555999', N'高雄市岡山區中華路888號', N'rr@ttt.com', N'1979-01-05', 1, 600)
INSERT INTO [dbo].[Persons] ([Id], [姓名], [電話], [地址], [email], [生日], [婚姻狀態], [點數]) VALUES (4, N'黃大春', N'0955123789', N'台南市東區中山路444號', N'bb@ccct.com', N'1977-07-06', 0, 700)
SET IDENTITY_INSERT [dbo].[Persons] OFF

