using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Data.Entity; // 加入 Entity Framework 的 namespace

namespace WindowsFormsApp10
{
    public partial class Form1 : Form
    {   
        myDBEntities mydb = new myDBEntities(); // 資料庫實體
        Persons myPerson = new Persons(); // 目前正在編輯的會員物件
        
        int myId = 0;
        int dGridViewRowNum = 0;
        int intMarriage = 0; // 0: All, 1: Married, 2: Single


        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            comBoField.Items.Add("姓名");
            comBoField.Items.Add("電話");
            comBoField.Items.Add("地址");
            comBoField.Items.Add("email");
            comBoField.SelectedIndex = 0;

            DisplayAllResult();

        }

        void DisplayAllResult()
        {
            var result = mydb.Persons.Take(2).ToList();  // Take() 類似 SQL 中的 top 效果
            dataGridViewResult.DataSource = result;
            dGridViewRowNum = result.Count();

            Console.WriteLine($"{dGridViewRowNum} records in total...");

        }



        private void dataGridViewResult_CellClick(object sender, DataGridViewCellEventArgs e)
        {

        }

        private void btnConnect_Click(object sender, EventArgs e)
        {
            string strMsg = "";
            var result = mydb.Persons.Take(3);
            foreach (var item in result)
            {
                strMsg = $"{item.id}, {item.姓名}, {item.地址}, {item.電話}";
            }

            strMsg += $"{result.Count()} records in total";

            MessageBox.Show(strMsg);

        }

        private void btnSearchData_Click(object sender, EventArgs e)
        {
            if (txtName.Text.Trim() != "")
            {
                var result = mydb.Persons.Where(s => s.姓名.Contains(
                    txtName.Text.Trim()));
                int cnt = result.Count();
                string strMsg = "";

                if (cnt > 0)
                {
                 
                    dataGridViewResult.DataSource = result.ToList();
                    dGridViewRowNum = result.Count();
                    strMsg = $"{dGridViewRowNum} records in total";

                }
                else
                {
                    strMsg = "查無此人";
                }
                MessageBox.Show(strMsg);
            }
        }

        void ShowMemberField(int intId)
        {
            if (intId > 0)
            {
                myPerson = mydb.Persons.Where(s => s.id == intId).FirstOrDefault();

                if (myPerson != null)
                {
                    myId = myPerson.id;
                    txtName.Text = myPerson.姓名;
                    txtTel.Text = myPerson.電話;
                    txtAddress.Text = myPerson.地址;


                }
            }
        }

    }
}
