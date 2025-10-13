using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp2
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void label4_Click(object sender, EventArgs e)
        {

        }

        private void btn公分轉英吋_Click(object sender, EventArgs e)
        {
            if  (txt公分.Text != "")
            {   // 有輸入
                string str使用者輸入 = txt公分.Text;
                float myCM = 0.0f;
                float myInch = 0.0f;
                myCM = Convert.ToSingle(str使用者輸入);
                myInch = myCM * 0.3937f;
                txt英吋.Text = Convert.ToString(myCM);
            }
            else
            {   // 沒有輸入
                MessageBox.Show("請輸入公分數值");
                txt英吋.Clear();
            }
        }

        private void btn坪轉平方公尺_Click(object sender, EventArgs e)
        {
            try
            {   // 正常執行的程式
                if (txt坪.Text != "")
                {

                }

            }
            catch (Exception error) 
            {   // 產生例外錯誤的情況


            }
        }

        private void btn公斤轉磅_Click(object sender, EventArgs e)
        {
            if (txt公斤.Text.Length > 0)
            {
                double myKG, myPound = 0.0;
                bool is轉換成功 = false;
                is轉換成功 = double.TryParse(txt公斤.Text, out myKG);

                if (is轉換成功 == true)
                {
                    myPound = myKG * 2.2;
                    txt磅.Text = $"{myPound:F2}";

                }
                else
                {
                    MessageBox.Show("轉換失敗，請輸入正確公斤數值");
                    txt磅.Clear();
                }

            }
            else
            {
                MessageBox.Show("請輸入公斤數值");
                txt磅.Clear();

            }
        }
    }
}
