using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp3
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            // TODO: 這行程式碼會將資料載入 'myDBDataSet.Persons' 資料表。您可以視需要進行移動或移除。
            this.personsTableAdapter.Fill(this.myDBDataSet.Persons);

            ShowTotal();

        }

        void ShowTotal()
        {
            int total = personsBindingSource.Count;
            int curr = personsBindingSource.Position + 1;
            lblEntryNum.Text = $"第{curr}筆/共{total}筆";
        }


        private void personsBindingNavigatorSaveItem_Click(object sender, EventArgs e)
        {
            this.Validate();
            this.personsBindingSource.EndEdit();
            this.tableAdapterManager.UpdateAll(this.myDBDataSet);

        }

        private void btnPageOne_Click(object sender, EventArgs e)
        {
            personsBindingSource.MoveFirst();
            ShowTotal();
        }

        private void btnPrePage_Click(object sender, EventArgs e)
        {
            personsBindingSource.MovePrevious();
            ShowTotal();
        }

        private void btnNextPage_Click(object sender, EventArgs e)
        {
            personsBindingSource.MoveNext();
            ShowTotal();
        }

        private void btnLastPage_Click(object sender, EventArgs e)
        {
            personsBindingSource.MoveLast();
            ShowTotal();
        }

        private void btnSave_Click(object sender, EventArgs e)
        {   // 因為在修改資料過程中，系統常會遇到unexpected error
            try
            {
                personsBindingSource.EndEdit();
                personsTableAdapter.Update(myDBDataSet.Persons);
                ShowTotal();
                MessageBox.Show("修改資料成功");
            }
            catch (Exception ex) 
            { 
                MessageBox.Show($"資料修改發生錯誤：\n {ex.Message}");
            }

        }

        private void btnAddMember_Click(object sender, EventArgs e)
        {
            personsBindingSource.AddNew();
            dtPicker.Value = new DateTime(1900, 1, 1, 0, 0, 0);
            // dtPicker.Value = DateTime.Now;

            // 下面是用來debug系統會預設填入null的狀況
            chkMarriage.Checked = false;

            ShowTotal();
        }

        private void btnSaveMember_Click(object sender, EventArgs e)
        {
            if ((txtName.Text != "") && (txtTel.Text != "") &&
                (txtAddress.Text != "") && (txtEmail.Text != "") &&
                (txtPoints.Text != ""))
            {
                personsBindingSource.EndEdit();
                personsTableAdapter.Update(myDBDataSet.Persons);

                ShowTotal();
                MessageBox.Show("新會員儲存成功");
            }
            else
            {
                MessageBox.Show("欄位需填寫完整");
            }
        }

        private void btnRevert_Click(object sender, EventArgs e)
        {
            personsBindingSource.EndEdit();
            int currIdx = personsBindingSource.Position;
            personsTableAdapter.Fill(myDBDataSet.Persons);
            personsBindingSource.Position = currIdx;

            ShowTotal();

            MessageBox.Show("資料已回復");
        }

        private void btnDelete_Click(object sender, EventArgs e)
        {
            DialogResult R = MessageBox.Show("你確定要刪除此筆資料", "確認刪除", MessageBoxButtons.YesNo, MessageBoxIcon.Question);
            if (R == DialogResult.Yes)
            {
                // 刪除
                personsBindingSource.EndEdit();
                int idxDel = personsBindingSource.Position;
                personsBindingSource.RemoveAt(idxDel);
                personsTableAdapter.Update(myDBDataSet);

                ShowTotal();
                MessageBox.Show("資料已刪除");
            }


        }

        private void label6_Click(object sender, EventArgs e)
        {

        }

        private void txtTel_TextChanged(object sender, EventArgs e)
        {

        }

        private void txtAddress_TextChanged(object sender, EventArgs e)
        {

        }

        private void label4_Click(object sender, EventArgs e)
        {

        }

        private void label5_Click(object sender, EventArgs e)
        {

        }

        private void txtEmail_TextChanged(object sender, EventArgs e)
        {

        }

        private void label3_Click(object sender, EventArgs e)
        {

        }

        private void dtPicker_ValueChanged(object sender, EventArgs e)
        {

        }

        private void chkMarriage_CheckedChanged(object sender, EventArgs e)
        {

        }

        private void label7_Click(object sender, EventArgs e)
        {

        }

        private void btnFilterClear_Click(object sender, EventArgs e)
        {
            personsBindingSource.RemoveFilter();

        }
    }
}
