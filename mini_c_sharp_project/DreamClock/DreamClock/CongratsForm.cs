using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
// using System.Data.SqlClient; // connect to DB

namespace DreamClock
{
    public partial class CongratsForm : Form
    {   
        // defined dataContext as a field for reuse
        LinqDataClassesDataContext clockDB;

        public CongratsForm()
        {
            InitializeComponent();
        }

        private void CongratsForm_Load(object sender, EventArgs e)
        {
            
            // re-use strDBConnect from Main Form 
            clockDB = new LinqDataClassesDataContext(MainForm.strDBConnect);

            // Update member's accumulated points and tier
            var retMember = clockDB.dreamMembers
                    .Where(s => (s.acct == GlobalVar.memAcct) && (s.pword == GlobalVar.memPassword))
                    .SingleOrDefault();  // SingleOrDefault() is an action, turning a query to a record (similar concepts in Spark)
            
            if (retMember != null)
            {
                retMember.points += 25;  // 25 is the minimum point needed to jump to the next tier
                retMember.lstUpdate = DateTime.Now;
            }

            clockDB.SubmitChanges(); // push changes to DB

            // fetch (image, message) based on member's updated tier
            var qryRetUser = from m in clockDB.dreamMembers
                             where m.acct == GlobalVar.memAcct && m.pword == GlobalVar.memPassword
                                let r = (
                                from r in clockDB.memberRanks
                                where r.threshold <= m.points
                                orderby r.threshold descending
                                select r).FirstOrDefault()
                             select new { curPoints = m.points, curTier = r.memRank };

            var qryImgFile = from v in clockDB.imgs
                             where v.memRank == qryRetUser.SingleOrDefault().curTier
                             select v.imgFile;

            var imgFile = qryImgFile.Single();

            var qryMsgDisplay = from v in clockDB.imgs
                                where v.memRank == qryRetUser.SingleOrDefault().curTier
                                select v.msg;

            var msgDisplay = qryMsgDisplay.Single();

            // string imgFile = "CongratsImg01.png";
            string imgPath = GlobalVar.ImgDir + @"\" + imgFile;
            Debug.WriteLine($"imgPath: {imgPath}");

            FileStream fs = File.OpenRead(imgPath);  // return binary data type
            Image imgCongrat = Image.FromStream(fs);
            picCongrats.Image = imgCongrat;
            
            fs.Close();

            // string msgDisplay = "You are totally crushing it...";
            txtCongrats.Text = msgDisplay.ToString();

            clockDB.Connection.Close();

        }

        private void btnHPage_Click(object sender, EventArgs e)
        {
            Close();
        }
    }
}
