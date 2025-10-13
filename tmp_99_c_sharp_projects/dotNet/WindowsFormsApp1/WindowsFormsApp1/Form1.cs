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
            //static 靜態執行的方法
            Person.aboutInfo();

            GlovalVar.myGlovalVar1 = "全域變數值 12345678";
            GlovalVar.myGlovalVar2 = 88888;


        }

        private void btn員工One_Click(object sender, EventArgs e)
        {
            Person 員工1 = new Person();
            員工1.姓名 = "王大衛";
            員工1.身高 = 170.0f;
            員工1.體重 = 75.2;
            員工1.到職日 = Convert.ToDateTime("2018/10/15");
            員工1.薪資 = 25000;
            員工1.部門代號 = MyEnum.Dep.資訊處;

            員工1.顯示基本資料();

            list員工資料集合.Add(員工1);
            
        }

        private void btn員工Two_Click(object sender, EventArgs e)
        {
            Person 員工2 = new Person();
            員工2.姓名 = "李瑪莉";
            員工2.身高 = 162.0f;
            員工2.體重 = 60.3;
            員工2.薪資 = 36000;
            員工2.到職日 = new DateTime(2020, 7, 1, 0, 0, 0);
            // 員工2.部門代號 = MyEnum.Dep.業務部;
            員工2.部門代號 = (MyEnum.Dep)103; // 因為定義了Enum的值，103就代表MyEnum.Dep裡面的業務部


            員工2.顯示基本資料();
            list員工資料集合.Add(員工2);
        }

        private void btn所有員工_Click(object sender, EventArgs e)
        {
            string strMsg = "";

            for (int i = 0; i < list員工資料集合.Count; i++)
            {
                Person myPerson = list員工資料集合[i];
                strMsg += $"{myPerson.姓名} {myPerson.身高}cm {myPerson.體重}kg {myPerson.到職日:D} {myPerson.薪資}元\n";
                strMsg += "-------------------------------------------\n";
            }

            strMsg += $"共同{list員工資料集合.Count} 筆資料";

            MessageBox.Show(strMsg);
        }

        private void btn管理者_Click(object sender, EventArgs e)
        {
            Manager 管理者1 = new Manager();
            管理者1.姓名 = "張經理";
            管理者1.身高 = 174.0f;
            管理者1.體重 = 80.0;
            管理者1.到職日 = Convert.ToDateTime("2000/10/12");
            管理者1.薪資 = 80000;

            管理者1.顯示基本資料();
        }
    }
}
