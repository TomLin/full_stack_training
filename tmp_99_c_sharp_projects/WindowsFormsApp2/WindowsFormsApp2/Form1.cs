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

        private void btn公分轉英吋_Click(object sender, EventArgs e)
        {
            if (txt公分.Text != "")
            { //有輸入
                string str使用者輸入 = txt公分.Text;
                float myCM = 0.0f; //公分
                float myInch = 0.0f; //英吋
                myCM = Convert.ToSingle(str使用者輸入);
                myInch = myCM * 0.3937f;
                txt英吋.Text = Convert.ToString(myInch);
            }
            else
            { //沒有輸入
                MessageBox.Show("請輸入公分數值");
                txt英吋.Clear();
            }
        }

        private void btn英吋轉公分_Click(object sender, EventArgs e)
        {   //回家練習

        }

        private void btn坪轉平方公尺_Click(object sender, EventArgs e)
        {
            try
            { //正常執行的程式
                if (txt坪數.Text != "")
                {
                    double my坪數, my平方公尺 = 0.0;
                    my坪數 = Convert.ToDouble(txt坪數.Text);
                    my平方公尺 = my坪數 * 3.3058;
                    //txt平方公尺.Text = my平方公尺.ToString();
                    txt平方公尺.Text = $"{my平方公尺:F2}";
                }
                else
                {
                    MessageBox.Show("請輸入坪數數值");
                    txt平方公尺.Clear();
                }
            }
            catch (Exception error)
            { //產生例外錯誤的情況
                //MessageBox.Show($"{error}");
                MessageBox.Show($"{error.Message}\n有任何問題請打分機104");
                txt平方公尺.Clear();
            }
            finally
            { //任何情況都會執行
                //可以省略
            }
        }

        private void btn平方公尺轉坪_Click(object sender, EventArgs e)
        {   //回家練習

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
                    MessageBox.Show("轉換失敗, 請輸入正確公斤數值");
                    txt磅.Clear();
                }
            }
            else
            {
                MessageBox.Show("請輸入公斤數值");
                txt磅.Clear();
            }
        }

        private void btn磅轉公斤_Click(object sender, EventArgs e)
        {  //回家練習

        }
    }
}
