Use Northwind
go

Create Table Questions
(
	QuestionId int identity(1,1) primary key,
	Description nvarchar(128) not null
)
go

Create Table Answers
(
	AnswerId int identity(1,1) primary key,
	Answer nvarchar(64) not null,
	QuestionId int not null,
	FOREIGN KEY (QuestionId) REFERENCES Questions(QuestionId)
)
go


SET IDENTITY_INSERT [dbo].[Questions] ON 
GO
INSERT [dbo].[Questions] ([QuestionId], [Description]) VALUES (1, N'下列何者不為ASP.NET MVC網站的優點?')
GO
INSERT [dbo].[Questions] ([QuestionId], [Description]) VALUES (2, N'在支援Responsive Web Design方面, Visual Studio內建以下何種套件?')
GO
SET IDENTITY_INSERT [dbo].[Questions] OFF
GO

SET IDENTITY_INSERT [dbo].[Answers] ON 
GO
INSERT [dbo].[Answers] ([AnswerId], [Answer], [QuestionId]) VALUES (1, N'支援視覺化設計', 1)
GO
INSERT [dbo].[Answers] ([AnswerId], [Answer], [QuestionId]) VALUES (4, N'安全性佳', 1)
GO
INSERT [dbo].[Answers] ([AnswerId], [Answer], [QuestionId]) VALUES (6, N'架構良好', 1)
GO
INSERT [dbo].[Answers] ([AnswerId], [Answer], [QuestionId]) VALUES (7, N'以上皆非', 1)
GO
INSERT [dbo].[Answers] ([AnswerId], [Answer], [QuestionId]) VALUES (8, N'jQuery UI', 2)
GO
INSERT [dbo].[Answers] ([AnswerId], [Answer], [QuestionId]) VALUES (9, N'jQuery Mobile', 2)
GO
INSERT [dbo].[Answers] ([AnswerId], [Answer], [QuestionId]) VALUES (10, N'Bootstrap', 2)
GO
INSERT [dbo].[Answers] ([AnswerId], [Answer], [QuestionId]) VALUES (11, N'Responsive Foundation', 2)
GO
SET IDENTITY_INSERT [dbo].[Answers] OFF
GO