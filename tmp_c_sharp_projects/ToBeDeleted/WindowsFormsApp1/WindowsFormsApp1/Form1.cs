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
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            // Form_Load is an event handler that is automatically called
            // when the form is first loaded into memory and displayed (Form 進入記憶體之時),
            // right before it becomes visible to the user.

            // It occurs after the form is constructed (constructor runs) → 建構子創立之前(InitializeComponent)
            // but before the form is shown on the screen.
            lbl回應訊息.Text = "** 歡迎使用本販賣機 **\n請選擇你要買的飲料";
        }

        private void btn紅茶_Click(object sender, EventArgs e)
        {
            lbl回應訊息.Text = "您選了紅茶，請投入30元";

        }

        private void btn綠茶_Click(object sender, EventArgs e)
        {
            lbl回應訊息.Text = "您選了綠茶，請投入40元";
        }

        private void btn烏龍茶_Click(object sender, EventArgs e)
        {
            lbl回應訊息.Text = "您選了烏龍茶，請投入100元";
        }

        private void btn礦泉水_Click(object sender, EventArgs e)
        {
            lbl回應訊息.Text = "您選了礦泉水，請投入10元";
        }

        private void btn載具_Click(object sender, EventArgs e)
        {
            lbl回應訊息.Text = "請掃描QRCode付款";
            
            // 跳出視窗，強制要求使用者回應視窗
            // MessageBox.Show (多載) 同名異式的 method
            // MessageBox.Show(text, caption, buttons, icon) 
            MessageBox.Show(text: "請掃描QRCode付款", caption: "請付款", MessageBoxButtons.YesNo,
                MessageBoxIcon.Information);
        }

        private void btn珍珠奶茶_Click(object sender, EventArgs e)
        {
            lbl回應訊息.Text = "您選了珍珠奶茶，請投入80元";
        }
    }
}
