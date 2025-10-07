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
            顯示歡迎訊息();
        }

        void 顯示訂購資訊(string product, double price, int amout, string user, bool isPay) 
        {
            
        }


        
    }
}
