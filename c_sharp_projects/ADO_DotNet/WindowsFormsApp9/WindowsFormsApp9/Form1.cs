using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Data.SqlClient; // 連線資料庫


namespace WindowsFormsApp9
{
    public partial class Form1 : Form
    {
        string strDBConnectionString = "";

        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            SqlConnectionStringBuilder scsb = new SqlConnectionStringBuilder();
            scsb.DataSource = @".";
            scsb.InitialCatalog = "myDB";
            scsb.IntegratedSecurity = true;
            strDBConnectionString = scsb.ConnectionString.ToString();
        }

        private void btnSelect_Click(object sender, EventArgs e)
        {
            //myDBDataClasses1DataContext mydb = new myDBDataClasses1DataContext(strDBConnectionString);
            myDBDataClasses1DataContext mydb = new myDBDataClasses1DataContext();

            Console.WriteLine("========== Linq to SQL Select Demo ==========");
            var result = from s in mydb.Persons select s;

            foreach (var item in result) { 
                Console.WriteLine($"{ item.Id}, {item.姓名}");
            }


        }

        private void btnInsert_Click(object sender, EventArgs e)
        {
            myDBDataClasses1DataContext mydb = new myDBDataClasses1DataContext(strDBConnectionString);

            Console.WriteLine("========== Linq to SQL Insert Demo ==========");

            Persons myPerson = new Persons();
            myPerson.姓名 = "Judy Liao";
            myPerson.地址 = "新北市永和路12345號";
            myPerson.生日 = new DateTime(1996, 3, 1, 0, 0, 0);
            myPerson.電話 = "0966-111-666";
            myPerson.email = "eee@kkk.com";
            myPerson.婚姻狀態 = true;
            myPerson.點數 = 666;

            mydb.Persons.InsertOnSubmit(myPerson);
            // mydb.Persons.InsertAllOnSubmit(myPerson); // 參數是一個collection，集合多筆資料
            mydb.SubmitChanges();
            MessageBox.Show("資料新增成功");

        }

        private void btnUpdate_Click(object sender, EventArgs e)
        {
            myDBDataClasses1DataContext mydb = new myDBDataClasses1DataContext(strDBConnectionString);

            Console.WriteLine("========== Linq to SQL Update Demo ==========");

            var myPerson = mydb.Persons.Where(s => s.Id == 15).FirstOrDefault();

            if (myPerson != null) {
                myPerson.姓名 = "Ivy Chang";
                myPerson.地址 = "台北市復興北路555號";
                myPerson.生日 = new DateTime(1999, 1, 1, 0, 0, 0);


                mydb.SubmitChanges();
                MessageBox.Show("資料修改成功");
            }
            else
            {
                MessageBox.Show("查無此人，無資料異動");

            }
        }

        private void btnDelete_Click(object sender, EventArgs e)
        {
            myDBDataClasses1DataContext mydb = new myDBDataClasses1DataContext(strDBConnectionString);

            Console.WriteLine("========== Linq to SQL Delete Demo ==========");

            var myPerson = mydb.Persons.Where(s => s.Id == 15).FirstOrDefault();

            if (myPerson != null) { 
                mydb.Persons.DeleteOnSubmit(myPerson);
                mydb.SubmitChanges();
                MessageBox.Show("資料刪除成功");
            }
            else
            {
                MessageBox.Show("查無此人，無資料異動");

            }

        }
    }
}
