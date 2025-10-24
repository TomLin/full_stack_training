using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp5
{
    public partial class FormDetail : Form
    {
        public int loadID = 0; // 從外部(ListViewEntries)傳入id

        public FormDetail()
        {
            InitializeComponent();
        }

        private void FormDetail_Load(object sender, EventArgs e)
        {
            textBoxId.Text = loadID.ToString();
        }
    }
}
