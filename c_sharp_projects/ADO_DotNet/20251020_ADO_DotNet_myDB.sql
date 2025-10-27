-- create database myDB;
-- use myDB;

CREATE TABLE [dbo].[Persons] (
    [Id]    INT            IDENTITY (1, 1) NOT NULL,
    [�m�W]    NVARCHAR (50)  NULL,
    [�q��]    NVARCHAR (50)  NULL,
    [�a�}]    NVARCHAR (100) NULL,
    [email] NVARCHAR (100) NULL,
    [�ͤ�]    DATE           NULL,
    [�B�ê��A]  BIT            NULL,
    [�I��]    INT            NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


SET IDENTITY_INSERT [dbo].[Persons] ON
INSERT INTO [dbo].[Persons] ([Id], [�m�W], [�q��], [�a�}], [email], [�ͤ�], [�B�ê��A], [�I��]) VALUES (1, N'���p��', N'0955118935', N'�x������ٰϤ��M��9999��', N'eveWang@kdkso.com.tw', N'1992-08-20', 1, 300)
INSERT INTO [dbo].[Persons] ([Id], [�m�W], [�q��], [�a�}], [email], [�ͤ�], [�B�ê��A], [�I��]) VALUES (2, N'���j��', N'0912345678', N'�������e���Ϥ�����8888��', N'mm@hh.com.tw', N'1985-05-05', 0, 1000)
INSERT INTO [dbo].[Persons] ([Id], [�m�W], [�q��], [�a�}], [email], [�ͤ�], [�B�ê��A], [�I��]) VALUES (3, N'�i�j��', N'0977555999', N'���������s�Ϥ��ظ�888��', N'rr@ttt.com', N'1979-01-05', 1, 600)
INSERT INTO [dbo].[Persons] ([Id], [�m�W], [�q��], [�a�}], [email], [�ͤ�], [�B�ê��A], [�I��]) VALUES (4, N'���j�K', N'0955123789', N'�x�n���F�Ϥ��s��444��', N'bb@ccct.com', N'1977-07-06', 0, 700)
SET IDENTITY_INSERT [dbo].[Persons] OFF

