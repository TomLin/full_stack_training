using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace DreamClock
{
    public partial class MainForm : Form
    {
        // 循環次數
        int repTime = 0;

        // 已循環次數
        int curRep = 0;

        // 任務時長(秒)
        int cntDownSec = 20;

        // 休息秒數
        int restSec = 5;

        public MainForm()
        {
            InitializeComponent();
        }

        private void MainForm_Load(object sender, EventArgs e)
        {   
            // 初始畫面 for circular progress bar 
            cirProgBarWork.Text = cntDownSec.ToString();
            cirProgBarWork.Value = cntDownSec;
            cirProgBarWork.Maximum = 100;

        }

        private void btnAccept_Click(object sender, EventArgs e)
        {
            bool isRepConvert = Int32.TryParse(txtRepTime.Text.ToString(), out repTime);
            bool isCntDownConvert = Int32.TryParse(txtCntDownSec.Text.ToString(), out cntDownSec);

            if (isRepConvert && isCntDownConvert)
            {
                btnAccept.Enabled = false; // 在倒數時，使用者不能再按扭
                ReCount();

                if (curRep == repTime)
                {
                    // 重設 curRep
                    curRep = 0;

                    btnAccept.Enabled = true;
                }

            }
            else
            {
                MessageBox.Show("循環次數與任數時長，都需要輸入「整數值」喔！");
                txtRepTime.Text = ""; // 清空錯誤字元
                txtCntDownSec.Text = "";
            }

        }

        /*
        void Reset()
        {
            cntDownSec = 0;
            cirProgBar.Text = cntDownSec.ToString();
            cirProgBar.Value = cntDownSec;
            cirProgBar.Maximum = 100;
        }
        */

        void ReCount()
        {
            /* DialogResult r = MessageBox.Show("循環結束！是否接續", "Confirmation", MessageBoxButtons.OKCancel);

            if (r == DialogResult.OK) {

            }
            */



            if (curRep < repTime) {

                if (curRep > 0)  // 重覆循環前，先休息一下
                {
                    Rest();
                }

                // 初始化 circular progress bar 的值
                cirProgBarWork.Value = 0;
                cirProgBarWork.Text = cirProgBarWork.Value.ToString();
                cirProgBarWork.Maximum = cntDownSec;

                timerWork.Start();
            }

        }

        void Rest()
        {
            cirProgBarRest.Value = 0;
            cirProgBarRest.Text = cirProgBarRest.Value.ToString();
            cirProgBarRest.Maximum = restSec;

            timerRest.Start();

        }

        

        private void timer_Tick(object sender, EventArgs e)
        {
            if (cirProgBarWork.Value < cirProgBarWork.Maximum)
            {
                cirProgBarWork.Value += 1;
                cirProgBarWork.Text = cirProgBarWork.Value.ToString();
            }
            else
            {
                timerWork.Stop();
                // TODO: 把資料寫入DB
                
                curRep += 1;
                MessageBox.Show($"循環結束！ 剩下 {repTime - curRep} 次循環");
                ReCount();
            }
        }

        private void timerRest_Tick(object sender, EventArgs e)
        {
            if (cirProgBarRest.Value < cirProgBarRest.Maximum) { 
                cirProgBarRest.Value += 1;
                cirProgBarRest.Text = cirProgBarRest.Value.ToString();
            }
            else
            {
                timerRest.Stop();
                MessageBox.Show($"休息結束，再接再勵");

            }
        }
    }
}
