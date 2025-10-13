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
            lbl回應訊息.Text = "** 歡迎使用本販賣機 **\n請選擇您要買的飲料";
        }

        private void btn紅茶_Click(object sender, EventArgs e)
        {
            lbl回應訊息.Text = "您選了紅茶, 請投入30元";
        }

        private void btn綠茶_Click(object sender, EventArgs e)
        {
            lbl回應訊息.Text = "您選了綠茶, 請投入35元";
        }

        private void btn烏龍茶_Click(object sender, EventArgs e)
        {
            lbl回應訊息.Text = "您選了烏龍茶, 請投入40元";
        }

        private void btn礦泉水_Click(object sender, EventArgs e)
        {
            lbl回應訊息.Text = "您選了礦泉水, 請投入20元";
        }

        private void btn掃描載具_Click(object sender, EventArgs e)
        {
            lbl回應訊息.Text = "請掃描載具";
        }

        private void btnQRCode付款_Click(object sender, EventArgs e)
        {
            lbl回應訊息.Text = "請掃描QRCode付款";
            //System.Windows.Forms.MessageBox.Show("請掃描QRCode付款");
            //MessageBox.Show("請掃描QRCode付款", "請付款", MessageBoxButtons.YesNo);
            MessageBox.Show("請掃描QRCode付款", "請付款", MessageBoxButtons.YesNo, MessageBoxIcon.Information);
        }

        private void btn珍珠奶茶_Click(object sender, EventArgs e)
        {
            lbl回應訊息.Text = "您選了珍珠奶茶, 請投入45元";
        }

    }
}
