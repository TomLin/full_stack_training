using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics.Eventing.Reader;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp6
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            FormLogIn myFormLogin = new FormLogIn();
            myFormLogin.ShowDialog();
            ShowAccess();
        }

        void ShowAccess()
        {
            // 權限代碼： 1-10 管理者，11-20 店長，21-30 店員，31-40 會員， 0 訪客
            lblUser.Text = $"使用者: {GlobalVar.userName} 權限: {GlobalVar.userAccess}";

            if (GlobalVar.userAccess >= 1 && GlobalVar.userAccess <= 10)
            {
                // 管理者
                btnOrder.Visible = true;
                btnPDisplay.Visible = true;
                btnMember.Visible = true;
                btnOrderMgt.Visible = true;
                btnSysConfig.Visible = true;
            }
            else if (GlobalVar.userAccess >= 11 && GlobalVar.userAccess <= 20)
            {
                // 店長
                btnOrder.Visible = true;
                btnPDisplay.Visible = true;
                btnMember.Visible = true;
                btnOrderMgt.Visible = true;
                btnSysConfig.Visible = false;

            }
            else if (GlobalVar.userAccess >= 21 && GlobalVar.userAccess <= 30)
            {
                // 店員
                btnOrder.Visible = true;
                btnPDisplay.Visible = true;
                btnMember.Visible = false;
                btnOrderMgt.Visible = true;
                btnSysConfig.Visible = false;
            }
            else if (GlobalVar.userAccess >= 31 && GlobalVar.userAccess <= 40)
            {
                // 會員
                btnOrder.Visible = true;
                btnPDisplay.Visible = true;
                btnMember.Visible = false;
                btnOrderMgt.Visible = false;
                btnSysConfig.Visible = false;
            }
            else if (GlobalVar.userAccess == 0)
            {
                // 訪客
                btnOrder.Visible = false;
                btnPDisplay.Visible = true;
                btnMember.Visible = false;
                btnOrderMgt.Visible = false;
                btnSysConfig.Visible = false;
            }
            else
            {
                // 其它
                btnOrder.Visible = false;
                btnPDisplay.Visible = false;
                btnMember.Visible = false;
                btnOrderMgt.Visible = false;
                btnSysConfig.Visible = false;
            }



        }

        private void btnLogOut_Click(object sender, EventArgs e)
        {   // 當登出時，重設 global variables
            GlobalVar.isLogIn = false;
            GlobalVar.userName = "";
            GlobalVar.userId = 0;
            GlobalVar.userAccess = 0;
            lblUser.Text = "";

            btnOrder.Visible = false;
            btnPDisplay.Visible = false;
            btnMember.Visible = false;
            btnOrderMgt.Visible = false;
            btnSysConfig.Visible = false;

            // 再重新叫出登入畫面
            FormLogIn myFormLogin = new FormLogIn();
            myFormLogin.ShowDialog();

        }

        
        private void Form1_Activated(object sender, EventArgs e)
        {   // 登出，再重新登入之後，Form 1 會再重新顯示權限畫面
            ShowAccess();
        }
    }
}
