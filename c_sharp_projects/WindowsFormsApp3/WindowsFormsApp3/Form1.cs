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
            顯示歡迎訊息();
        }

        void 顯示歡迎訊息()
        {
            MessageBox.Show("歡迎使用本程式");
        }

        private void btn方法1_Click(object sender, EventArgs e)
        {
            //顯示歡迎訊息();
            顯示訂購資訊("iPhone 17 Pro Max", 41000.0, 3, "John Lee", true);
        }

        void 顯示訂購資訊(string product, double price, int amount, string user, bool isPay)
        {
            //方法的參數(Parameters) --> 方法內的區域變數(local variable)
            // 參數 = 引數(arguments)

            string str訂購資訊 = $"Dear {user},\n您購買了{product}, {amount}台\n單價 {price}元\n總價 {price * amount}元\n是否已付款 {isPay}\n謝謝光臨";
            MessageBox.Show(str訂購資訊);
        }

        string 顯示訂購資訊2(string product, double price, int amount, string user, bool isPay)
        {
            //方法的參數(Parameters) --> 方法內的區域變數(local variable)
            // 參數 = 引數(arguments)

            string str訂購資訊 = $"Dear {user},\n您購買了{product}, {amount}台\n單價 {price}元\n總價 {price * amount}元\n是否已付款 {isPay}\n謝謝光臨";
            return str訂購資訊;
        }

        private void btn方法2_Click(object sender, EventArgs e)
        {
            //顯示訂購資訊("Samsung Galaxy s25 Ultra", 42000.0, 2, "Mary Wang", false);
            string my訂購資訊 = 顯示訂購資訊2("Samsung Galaxy s25 Ultra", 42000.0, 2, "Mary Wang", false);
            MessageBox.Show(my訂購資訊);
        }

        int 總和(int a, int b, int c, int d, int e)
        {
            int sum = a + b + c + d + e;
            return sum; //回傳值
        }

        double 平均(int a, int b, int c, int d, int e)
        {
            double avg = 0;
            avg = 總和(a, b, c, d, e) / 5.0;
            return avg;
        }

        private void btn方法3_Click(object sender, EventArgs e)
        {
            int mySum = 總和(1,2,3,4,5);
            MessageBox.Show($"數字總和 {mySum}");

            double myAVG = 平均(1, 2, 3, 4, 6);
            MessageBox.Show($"數字平均 {myAVG}");
        }

        ulong 數字階乘(uint num)
        {  //數字階乘 5! = 5 x 4 x 3 x 2 x 1

            ulong factorial = 1;

            for (uint i = num; i >= 1; i -= 1)
            {
                factorial *= i;
            }

            return factorial;
        }

        //遞迴方法
        ulong 數字階乘遞迴法(uint num)
        { //數字階乘 5! = 5 x 4 x 3 x 2 x 1
            if (num == 0)
            { // 0! = 1
                return 1;
            }

            return num * 數字階乘遞迴法(num - 1);
        }

        private void btn方法4_Click(object sender, EventArgs e)
        {
            uint my整數 = 65;
            MessageBox.Show($"數字階乘(迴圈法) {my整數}! = {數字階乘(my整數)}");
            MessageBox.Show($"數字階乘(遞迴) {my整數}! = {數字階乘遞迴法(my整數)}");
        }

        ///////////////////////////////////
        /// 練習題
        /// 將找質數的練習改成方法method版
        /// 1. 回傳bool是否為質數, 參數帶入任意ulong
        /// 2. 找到質數花費的時間,回傳值是DateTime, 參數帶入任意ulong


    }
}
