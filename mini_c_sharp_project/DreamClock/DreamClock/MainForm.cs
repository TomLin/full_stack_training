using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Diagnostics.Eventing.Reader;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Data.SqlClient; // connect to DB

namespace DreamClock
{
    public partial class MainForm : Form
    {
        // DB connection config
        public static string strDBConnect;

        // Data Context (defined as a field)
        LinqDataClassesDataContext clockDB;

        // 循環次數
        int cylTime;

        // 已循環次數
        int curCyl;

        // 任務時長(秒)
        int cntDownSec;

        // 休息秒數
        public readonly int restSec = 2;

        // Flags
        public bool isRestDone = false; // Flag for rest period
        public bool isWorkDone = false; // Flag for work period 

        public MainForm()
        {
            InitializeComponent();
        }

        private void MainForm_Load(object sender, EventArgs e)
        {   
            // Initialize DB connection
            SqlConnectionStringBuilder scsb = new SqlConnectionStringBuilder();
            scsb.DataSource = GlobalVar.dataSrc;
            scsb.InitialCatalog = GlobalVar.catalog;
            scsb.IntegratedSecurity = true;  // window auth
            strDBConnect = scsb.ConnectionString.ToString();

            clockDB = new LinqDataClassesDataContext(strDBConnect);

            // Invoke LogInForm
            InitiateLogIn();

            // Initialize user interface
            Reset();

        }

        private void MainForm_Activated(object sender, EventArgs e)
        {

            // When completing all cycles, do reset
            if (this.curCyl == this.cylTime)
            {   
                Reset();
            }

        }


        void Reset()
        {
            // Layout initialization
            lblAcct.Text = GlobalVar.memAcct;  // Display account name

            // Initial values for circular progress bar
            cirProgBarWork.Maximum = 100;
            cirProgBarWork.Value = 60;
            cirProgBarWork.Text = cirProgBarWork.Value.ToString();

            cirProgBarRest.Maximum = 100;
            cirProgBarRest.Value = 60;
            cirProgBarRest.Text = cirProgBarRest.Value.ToString();
            
            // Initial or Updated user's points and tier

            var qryRetUser = from m in clockDB.dreamMembers
                             where m.acct == GlobalVar.memAcct && m.pword == GlobalVar.memPassword 
                                let r = (
                                from r in clockDB.memberRanks
                                where r.threshold <= m.points
                                orderby r.threshold descending
                                select r).FirstOrDefault()
                             select new { curPoints = m.points, curTier = r.memRank };

            lblCurPoints.Text = qryRetUser.SingleOrDefault().curPoints.ToString();
            lblCurTier.Text = qryRetUser.SingleOrDefault().curTier.ToString();

        }

        void InitiateLogIn()
        {
            LogInForm logInF = new LogInForm();
            logInF.ShowDialog();

        }


        private void btnStart_Click(object sender, EventArgs e)
        {   
            // Check user inputs
            bool isCyl = Int32.TryParse(txtCylTime.Text, out this.cylTime);
            bool isCntDown = Int32.TryParse(txtCntDownSec.Text, out this.cntDownSec);
            
            if (isCyl || isCntDown) {
                // Reset
                this.curCyl = 0;

                while (this.curCyl < this.cylTime)
                {
                    this.isWorkDone = false;
                    this.isRestDone = false;
                    FullCycle();  // 1 work and 1 rest
                    curCyl += 1;
                }

                // Invoke Congrats window...
                CongratsForm cform = new CongratsForm();
                cform.ShowDialog();

            }
            else
            {
                MessageBox.Show("Only integer values accepted for cell Cycles and CountDown Length!");
            }
        }

        void FullCycle()
        {
            while (this.isWorkDone == false || this.isRestDone == false)
            {
                if (isWorkDone == false)
                {
                    WorkCount();
                }
                else if (isRestDone == false)
                {
                    RestCount();
                }
            }

        }

        void WorkCount()
        {
            // Initialize before work clock countdown
            cirProgBarWork.Maximum = this.cntDownSec;
            cirProgBarWork.Value = 0;
            cirProgBarWork.Text = cirProgBarWork.Value.ToString();
            
            timerWork.Start();

            while (this.isWorkDone == false)
            {
                // Keep counting down...
                Application.DoEvents();
                
            }
            MessageBox.Show($"Well done, kiddo! Take a break. {this.cylTime - (this.curCyl + 1)} cycles left...");

        }

        void RestCount()
        {
            cirProgBarRest.Maximum = this.restSec;
            cirProgBarRest.Value = 0;
            cirProgBarRest.Text = cirProgBarRest.Value.ToString();

            timerRest.Start();

            while (this.isRestDone == false)
            {
                // Keep counting down
                Application.DoEvents();
                
            }
            MessageBox.Show("Kiddo! break time is over...");

        }

        private void timerWork_Tick(object sender, EventArgs e)
        {
            if (cirProgBarWork.Value < cirProgBarWork.Maximum)
            {
                cirProgBarWork.Value += 1;
                cirProgBarWork.Text = cirProgBarWork.Value.ToString();
            }
            else
            {
                timerWork.Stop();
                this.isWorkDone = true;
            }
        }

        private void timerRest_Tick(object sender, EventArgs e)
        {
            if (cirProgBarRest.Value < cirProgBarRest.Maximum)
            {
                cirProgBarRest.Value += 1;
                cirProgBarRest.Text = cirProgBarRest.Value.ToString();
            }
            else
            {
                timerRest.Stop();
                this.isRestDone = true;

            }
        }
    }
}
