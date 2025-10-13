using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp1
{
    public partial class Form1 : Form
    {
        List<Person> list員工資料集合 = new List<Person>();
        
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void btn建立員工1物件_Click(object sender, EventArgs e)
        {
            Person 員工1 = new Person();
            員工1.姓名 = "王大衛";
            員工1.身高 = 170.0f;
            員工1.體重 = 75.2;
            員工1.到職日 = Convert.ToDateTime("2018/04/07");
            員工1.薪資 = 25000;

            員工1.顯示基本資料();

            list員工資料集合.Add(員工1);
        }

        private void btn建立員工2物件_Click(object sender, EventArgs e)
        {
            Person 員工2 = new Person();
            員工2.姓名 = "李瑪莉";
            員工2.身高 = 162.0f;
            員工2.體重 = 60.3;
            員工2.薪資 = 36000;
            員工2.到職日 = new DateTime(2020,7,1,0,0,0);
            員工2.顯示基本資料();

            list員工資料集合.Add(員工2);
        }

        private void btn列出所有員工_Click(object sender, EventArgs e)
        {
            string strMsg = "";

            for (int i = 0; i < list員工資料集合.Count; i += 1)
            {
                Person myPerson = list員工資料集合[i];
                strMsg += $"{myPerson.姓名} {myPerson.身高}cm {myPerson.體重}kg 到職日:{myPerson.到職日:D} {myPerson.薪資}元\n";
                strMsg += "--------------------------------------\n";
            }

            strMsg += $"共有 {list員工資料集合.Count} 筆資料";

            MessageBox.Show(strMsg);
        }

        private void btn建立管理者物件_Click(object sender, EventArgs e)
        {

        }
    }
}
