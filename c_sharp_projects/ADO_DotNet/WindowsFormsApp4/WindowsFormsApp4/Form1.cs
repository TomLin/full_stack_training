using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Data.SqlClient; // ADO.Net的命名空間

namespace WindowsFormsApp4
{
    public partial class Form1 : Form
    {   
        // 透過「資料庫連線字串」來connect to SQL Server
        SqlConnectionStringBuilder scsb = new SqlConnectionStringBuilder();
        string strDBConnectionString = ""; // 資料庫連線字串 → (best practice) 放在全域變數比較好

        List<int> searchIDs = new List<int>(); // 進階搜尋結果
        
        int intMaritalStatus = 0; // 0: 全部, 1: 已婚, 2: 單身
        int numEntries = 0; // 會員資料筆數

        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            // 如果本機裝有多個SQL Server，就會有別稱：格式如 ./MSSQLSERVER01 → ./就是localhost
            scsb.DataSource = @"./"; // server name
            // 也有可能是 scsb.DataSource = @"db1.azure.com/eric/db001" (雲端伺服器)，或是寫成IP

            scsb.InitialCatalog = "myDB"; // 資料庫名稱
            scsb.IntegratedSecurity = true; // windows 驗證, false: SQL Server驗證

            strDBConnectionString = scsb.ConnectionString.ToString();

            comboField.Items.Add("姓名");
            comboField.Items.Add("電話");
            comboField.Items.Add("地址");
            comboField.Items.Add("email");
            comboField.SelectedIndex = 0;

            radioAll.Checked = true;
            intMaritalStatus = 0;

        }

        private void dataGV_CellClick(object sender, DataGridViewCellEventArgs e)
        {

        }

        private void btnConnTest_Click(object sender, EventArgs e)
        {
            SqlConnection con = new SqlConnection(strDBConnectionString);
            con.Open();
            string strSQL = "select top 100 * from persons;";
            SqlCommand cmd = new SqlCommand(strSQL, con);
            SqlDataReader reader = cmd.ExecuteReader(); // access data row by row without loading the entire result set into memory.

            string strMsg = "";
            int count = 0;

            while (reader.Read() == true)
            {
                int id = (int)reader["id"];
                string name = (string)reader["姓名"];
                string phone = (string)reader["電話"];
                string email = (string)reader["email"];
                string address = (string)reader["地址"];
                DateTime birthday = (DateTime)reader["生日"];
                bool isMarried = (bool)reader["婚姻狀態"];
                int points = (int)reader["點數"];

                strMsg += $"{id} {name} {phone} {email} {address} {birthday} {isMarried} {points}\n\r";
                count ++;

            }

            strMsg += "-------------------------------------------------\n\r";
            strMsg += $"資料筆數: {count}";

            reader.Close();
            con.Close();
            MessageBox.Show(strMsg);



        }

        private void btnSearch_Click(object sender, EventArgs e)
        {
            SqlConnection con = new SqlConnection(strDBConnectionString);
            con.Open();

            // 下面這個寫法，會有SQL Injection 資安的風險
            // string strSQL = "select * from persons where 姓名 like '%{strSearch}%';";
            // 需改為下面的寫法：
            string strSQL = "select * from persons where 姓名 like @SearchName;";
            SqlCommand cmd = new SqlCommand(strSQL, con);
            cmd.Parameters.AddWithValue("@SearchName", $"%{txtName.Text.Trim()}%"); // 如果有多個代入參數，就再添加多行Parameters.AddWithValue()...
            SqlDataReader reader = cmd.ExecuteReader();

            if (reader.Read() == true)
            {
                txtId.Text = ((int)reader["id"]).ToString();  // 型態轉化的邏輯: reader讀進來object →  轉int → 再轉string → 存入textBox
                txtName.Text = (string)reader["姓名"];
                txtTel.Text = (string)reader["電話"];
                txtEmail.Text = (string)reader["email"];
                txtAddress.Text = (string)reader["地址"];
                dtPicker.Value = (DateTime)reader["生日"];
                chkMarriage.Checked = (bool)reader["婚姻狀態"];
                txtPoints.Text = ((int)reader["點數"]).ToString();

            }
            else
            {
                MessageBox.Show("查無此人");
                ClearField();
            }

            reader.Close();
            con.Close();

            

        }

        void ClearField()
        {
            txtId.Clear();
            txtName.Clear();
            txtTel.Clear();
            txtEmail.Clear();
            txtAddress.Clear();
            txtPoints.Clear();
            dtPicker.Value = new DateTime(1900, 1, 1);
            chkMarriage.Checked = false;

        }

        private void btnClear_Click(object sender, EventArgs e)
        {

        }

        private void btnUpdate_Click(object sender, EventArgs e)
        {
            // updates persons set 姓名 = '黃中春2', 電話 = '065421231', 地址 = '台南市東區西邊路777號', email = 'kkuuu@aaa.com' where id = 4;

            int intId = 0;
            Int32.TryParse(txtId.Text, out intId);

            if ((intId > 0) && (txtName.Text != "") && (txtTel.Text != "") && (txtEmail.Text != "") &&
                    (txtAddress.Text != "") && (txtPoints.Text != "")) 
            { 
                SqlConnection con = new SqlConnection(strDBConnectionString);
                con.Open();
                
                string strSQL = "updates persons set 姓名 = @NewName,電話 = @NewPhone, " +
                    "地址 = @NewAddress, email = @NewEmail, 生日 = @NewBirthday, 婚姻狀態 = @NewMarriage, 點數 = @NewPoints" +
                    "where id = @SearchId ;";

                SqlCommand cmd = new SqlCommand(strSQL, con);
                cmd.Parameters.AddWithValue("@SearchId", intId);
                cmd.Parameters.AddWithValue("@NewName", txtName.Text.Trim());
                cmd.Parameters.AddWithValue("@NewPhone", txtTel.Text.Trim());
                cmd.Parameters.AddWithValue("@NewAddress", txtAddress.Text.Trim());
                cmd.Parameters.AddWithValue("@NewEmail", txtEmail.Text.Trim());
                cmd.Parameters.AddWithValue("@NewBirthday", dtPicker.Value);
                cmd.Parameters.AddWithValue("@NewMarriage", chkMarriage.Checked);

                int intPoints = 0;
                Int32.TryParse(txtPoints.Text, out intPoints);
                cmd.Parameters.AddWithValue("@NewPoints", intPoints);

                int rows = cmd.ExecuteNonQuery(); // 只執行，不做查詢
                con.Close();
                MessageBox.Show($"資料修改成功, {rows} 筆資料更新");

            }

        }

        private void btnAddNew_Click(object sender, EventArgs e)
        {
            /* insert into persons values('Kay Fung', '0978456441', '台南市西區北邊路74號', 'ssss@eee.com',
             *     '1997-01-15', 0, 500);
             */

            if ((txtName.Text != "") && (txtTel.Text != "") && (txtEmail.Text != "") &&
        (txtAddress.Text != "") && (txtPoints.Text != ""))
            {
                SqlConnection con = new SqlConnection(strDBConnectionString);
                con.Open();

                string strSQL = "insert into persons values(@NewName, @NewPhone, " +
                    "@NewAddress, @NewEmail, @NewBirthday, @NewMarriage, @NewPoints);";

                SqlCommand cmd = new SqlCommand(strSQL, con);
                cmd.Parameters.AddWithValue("@NewName", txtName.Text.Trim());
                cmd.Parameters.AddWithValue("@NewPhone", txtTel.Text.Trim());
                cmd.Parameters.AddWithValue("@NewAddress", txtAddress.Text.Trim());
                cmd.Parameters.AddWithValue("@NewEmail", txtEmail.Text.Trim());
                cmd.Parameters.AddWithValue("@NewBirthday", dtPicker.Value);
                cmd.Parameters.AddWithValue("@NewMarriage", chkMarriage.Checked);

                int intPoints = 0;
                Int32.TryParse(txtPoints.Text, out intPoints);
                cmd.Parameters.AddWithValue("@NewPoints", intPoints);

                int rows = cmd.ExecuteNonQuery(); // 只執行，不做查詢
                con.Close();
                MessageBox.Show($"資料新增成功, {rows} 筆資料受影響");

            }
        }

        private void btnDelete_Click(object sender, EventArgs e)
        {
            // delete from persons where id = 11;
            int deleteId = 0;
            Int32.TryParse(txtId.Text, out deleteId);

            if (deleteId > 0)
            {
                SqlConnection con = new SqlConnection(strDBConnectionString);
                con.Open();

                string strSQL = "delete from perons where id = @deleteId;";
                SqlCommand cmd = new SqlCommand(strSQL, con);

                cmd.Parameters.AddWithValue("@deleteId", deleteId);
                int rows = cmd.ExecuteNonQuery();
                con.Close();
                ClearField(); // 清空欄位

                MessageBox.Show($"資料刪除成功, {rows}列資料受影響");

            }

        }

        void ShowDetails(int myId)
        {   // 顯示會員詳細資訊
            if (myId > 0)
            {
                SqlConnection con = new SqlConnection( strDBConnectionString);
                con.Open();
                string strSQL = "select * from persons where id = @SearchId;";
                SqlCommand cmd = new SqlCommand(strSQL, con);
                cmd.Parameters.AddWithValue("@SearchId", myId);
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.Read() == true)
                {
                    txtId.Text = ((int)reader["id"]).ToString();
                    txtName.Text = (string)reader["姓名"];
                    txtTel.Text = (string)reader["電話"];
                    txtEmail.Text = (string)reader["email"];
                    txtAddress.Text = (string)reader["地址"];
                    dtPicker.Value = (DateTime)reader["生日"];
                    chkMarriage.Checked = (bool)reader["婚姻狀態"];
                    txtPoints.Text = ((int)reader["點數"]).ToString();
                }
                else
                {
                    MessageBox.Show("查無此人");
                    ClearField();
                }

                reader.Close();
                con.Close();   

            }
        }


        void ShowAllEntries(int topNum)
        {
            SqlConnection con = new SqlConnection(strDBConnectionString);
            con.Open();

            string strSQL = $"select top (@topNum) * from persons;";
            SqlCommand cmd = new SqlCommand(strSQL, con);
            cmd.Parameters.AddWithValue("@topNum", topNum);
            SqlDataReader reader = cmd.ExecuteReader();

            // 輸出到dataGridView

            if (reader.HasRows)
            {
                DataTable dt = new DataTable();
                dt.Load(reader);  // 用dataTable這個in-memory物件，把reader的所有rows的資料，存入
                dataGV.DataSource = dt;
                
                int numEntries = dt.Rows.Count;
                MessageBox.Show($"Data Table View筆數: {numEntries}");

            }

            reader.Close();
            con.Close();
        }



        private void btnAllEntries_Click(object sender, EventArgs e)
        {
            ShowAllEntries(100);
        }

        private void dataGV_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            // DataGridViewCellEventArgs 這是點擊dataGridView的Cell，產生事件後，一併由publisher回傳的事件相關資訊

            // 確保只有使用者點擊表格內的資料，才會反應，否則點擊其它區域，就不動作
            if ((e.RowIndex >= 0) && (e.ColumnIndex >= 0) && (e.RowIndex < numEntries))
            {
                // 從使用者選取的cell，回傳那個rowIndex，抓出row entry，再取第一個欄位的值(就是使用者ID)
                int selectId = (int)dataGV.Rows[e.RowIndex].Cells[0].Value;
                ShowDetails(selectId);
            }
        }



        private void btnAdvanceSearch_Click(object sender, EventArgs e)
        {   // window forms 的值，如果沒有值，就會回傳 -1
            // window forms 的 textBox，不會有null，沒有輸入就是空字串
            if (txtKeyword.Text != "") {

                string strSeachField = comboField.SelectedItem.ToString();
                string strStartBirth = dtpStart.Value.ToString();
                string strEndBirth = dtpEnd.Value.ToString();

                string strSQL_MaritalStatus = "";

                switch (intMaritalStatus)
                {
                    case 0: // 全部
                        strSQL_MaritalStatus = " ";
                        break;
                    case 1: // 已婚
                        strSQL_MaritalStatus = " and (婚姻狀態=1) ";
                        break;
                    case 2: // 單身
                        strSQL_MaritalStatus = " and (婚姻狀態=2) ";
                        break;
                    default:
                        strSQL_MaritalStatus = " ";
                        break;
                }

                SqlConnection con = new SqlConnection(strDBConnectionString);
                con.Open();
                string strSQL = $"select * from persons where {strSeachField} like @SearchWord and " +
                    $"(生日 >= @StartBirth) and (生日 <= @EndBirth) {strSQL_MaritalStatus}";
                SqlCommand cmd = new SqlCommand(strSQL, con);
                cmd.Parameters.AddWithValue("@SearchWord", $"%{txtKeyword.Text.Trim()}%");

                // Windows Form裡面的dateTimePicker的時間Value，和SQL Server的日期格式相符，不需要轉成字串回傳給SQL Server
                cmd.Parameters.AddWithValue("@StartBirth", dtpStart.Value);  
                cmd.Parameters.AddWithValue("@EndBirth", dtpEnd.Value);

                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {
                    DataTable dt = new DataTable();
                    dt.Load(reader);  // 用dataTable這個in-memory物件，把reader的所有rows的資料，存入
                    dataGV.DataSource = dt;

                    int numEntries = dt.Rows.Count;
                    MessageBox.Show($"Data Table View筆數: {numEntries}");

                }
                else
                {
                    numEntries = 0;
                    dataGV.DataSource = null;
                    MessageBox.Show("查無資料");
                }

                reader.Close();
                con.Close();
            }

        }

        private void radioAll_CheckedChanged(object sender, EventArgs e)
        {
            intMaritalStatus = 0;
        }

        private void radioMarried_CheckedChanged(object sender, EventArgs e)
        {
            intMaritalStatus = 1;
        }

        private void radioSingle_CheckedChanged(object sender, EventArgs e)
        {
            intMaritalStatus = 2;
        }




    }
}
