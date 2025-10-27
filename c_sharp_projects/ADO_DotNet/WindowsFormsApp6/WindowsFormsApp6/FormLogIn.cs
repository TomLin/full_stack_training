using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp6
{
    public partial class FormLogIn : Form
    {
        public FormLogIn()
        {
            InitializeComponent();
        }

        private void FormLogIn_FormClosing(object sender, FormClosingEventArgs e)
        {   // Form 還在關閉中

            if (GlobalVar.isLogIn == true)
            {
                // 成功登入，登入Form可以關閉

            }
            else
            {   // 未登入，Form不會被關掉
                e.Cancel = true;  // 設為true, Form 就關閉不掉
            }


        }

        private void FormLogIn_Load(object sender, EventArgs e)
        {
            SqlConnectionStringBuilder scsb = new SqlConnectionStringBuilder();
            scsb.DataSource = @".";
            scsb.InitialCatalog = "myDB";
            scsb.IntegratedSecurity = true;
            GlobalVar.strDBConnectionString = scsb.ConnectionString.ToString();

        }

        private void btnLogIn_Click(object sender, EventArgs e)
        {
            int intFieldOne = 0;  // 輸入會員ID
            Int32.TryParse(txtId.Text.Trim(), out intFieldOne);
            string strFieldTwo = txtTel.Text.Trim();  // 輸入會員電話

            if ((intFieldOne > 0) && (strFieldTwo != ""))
            {
                SqlConnection con = new SqlConnection(GlobalVar.strDBConnectionString);
                con.Open();

                // 登入會員，只會有一筆資料
                // 需要id and telephone num. 都輸入成功，才能登入
                string strSQL = "select top 1 * from Persons where id = @SearchOne and 電話 = @SearchTwo"; 

                SqlCommand cmd = new SqlCommand(strSQL, con);
                cmd.Parameters.AddWithValue("@SearchOne", intFieldOne);
                cmd.Parameters.AddWithValue("@SearchTwo", strFieldTwo);
                SqlDataReader reader = cmd.ExecuteReader();


                if (reader.Read() == true)
                {
                    // 登入成功
                    GlobalVar.isLogIn = true;
                    GlobalVar.userName = reader["姓名"].ToString();
                    GlobalVar.userId = intFieldOne;

                    // 權限代碼以range設定，方便未來調整的buffer
                    // 這邊hard-code 一個使用者權限
                    // 權限代碼： 1-10 管理者，11-20 店長，21-30 店員，31-40 會員， 0 訪客
                    GlobalVar.userAccess = 32;  

                    reader.Close();
                    con.Close();
                    MessageBox.Show("登入成功");
                    Close();  // 這裡就像是函數的return，接下來的程式碼就不執行了
                }

                if (GlobalVar.isLogIn == false) {
                    txtMulti.Text = $"登入失敗\n請重新登入";

                    reader.Close();
                    con.Close();

                }

            }
            else
            {
                MessageBox.Show("登入欄位必填或格式有誤");

            }

            

        }
    }
}
