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
    public partial class LogInForm : Form
    {

        public LinqDataClassesDataContext clockDB;

        public LogInForm()
        {
            InitializeComponent();
        }

        private void LogInForm_Load(object sender, EventArgs e)
        {
            // DB connect
            clockDB = new LinqDataClassesDataContext(MainForm.strDBConnect);
        }

        private void btnSignIn_Click(object sender, EventArgs e)
        {
            string inputAcct = txtAcct.Text.Trim().ToString();
            string inputPassword = txtPassword.Text.Trim().ToString();

            if (inputAcct != "" && inputPassword != "")
            {

                // Verify membership
                var qryMemAcct = clockDB.dreamMembers
                    .Where(s => (s.acct == inputAcct) && (s.pword == inputPassword))
                    .SingleOrDefault();

                if (qryMemAcct != null)
                {
                    GlobalVar.memAcct = qryMemAcct.acct.ToString();
                    GlobalVar.memPassword = qryMemAcct.pword.ToString();
                    GlobalVar.isLogIn = true;
                    MessageBox.Show($"Welcome back {GlobalVar.memAcct} !");
                    Close();

                }
                else
                {
                    MessageBox.Show("Invalid Account or Password! (case-sensitive)");
                    txtAcct.Clear();
                    txtPassword.Clear();
                }
            }
            else
            {
                MessageBox.Show("Empty Account and Password are not allowed! (case-sensitive)");
            }
        }

        private void LogInForm_FormClosing(object sender, FormClosingEventArgs e)
        {
            if (GlobalVar.isLogIn == false)
            {   
                // Forbid window closing
                e.Cancel = true;
            }
        }

        private void btnSignUp_Click(object sender, EventArgs e)
        {
            string inputAcct = txtAcct.Text.Trim().ToString();
            string inputPassword = txtPassword.Text.Trim().ToString();

            if (inputAcct != "" && inputPassword != "")
            {

                // New sign-up for membership
                var newMember = new dreamMember
                {
                    acct = inputAcct,
                    pword = inputPassword,
                    points = 0,
                    lstUpdate = DateTime.Now
                };

                clockDB.dreamMembers.InsertOnSubmit(newMember);
                clockDB.SubmitChanges();

                GlobalVar.memAcct = newMember.acct.ToString();
                GlobalVar.memPassword = newMember.pword.ToString();
                GlobalVar.isLogIn = true;

                MessageBox.Show("Sign up sccessfully!");

                Close();

            }
            else
            {
                MessageBox.Show("Empty Account and Password are not allowed! (case-sensitive)");
            }
        }
    }
}
