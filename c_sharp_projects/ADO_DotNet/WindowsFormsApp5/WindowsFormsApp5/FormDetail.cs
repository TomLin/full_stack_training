using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp5
{
    public partial class FormDetail : Form
    {
        public int loadID = 0; // 從外部(ListViewEntries)傳入id
        string strUpdatedImgFile = "";
        bool isImgUpdated = false;

        public FormDetail()
        {
            InitializeComponent();
        }

        private void FormDetail_Load(object sender, EventArgs e)
        {
            textBoxId.Text = loadID.ToString();
            comboBoxGroup.Items.Add("gen");
            comboBoxGroup.Items.Add("sale");
            comboBoxGroup.Items.Add("fruitbox");
            comboBoxGroup.SelectedIndex = 0;

            if (loadID == 0)
            {   // 新增模式
                textBoxId.ReadOnly = true;
                // textBoxId.Visible = false;
                groupBoxNew.Visible = true;
                groupBoxUpdate.Visible = false;
                groupBoxDelete.Visible = false;
            }
            else
            {   // 修改, 刪除模式
                textBoxId.ReadOnly = true;
                textBoxId.Visible = true;
                groupBoxNew.Visible = false;
                groupBoxUpdate.Visible = true;
                groupBoxDelete.Visible = true;
                ReadID(loadID);


            }
        }

        void ReadID(int myId)
        {
            if (myId > 0)
            {
                SqlConnection con = new SqlConnection(GlobalVar.strDBConnectionString);
                con.Open();
                string strSQL = "select * from Products where id = @SearchId";
                SqlCommand cmd = new SqlCommand(strSQL, con);
                cmd.Parameters.AddWithValue("@SearchId", myId);
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.Read() == true)
                {
                    textBoxId.Text = reader["id"].ToString();
                    textBoxProduct.Text = reader["pname"].ToString();
                    textBoxPrice.Text = reader["price"].ToString();
                    textBoxDesc.Text = reader["pdesc"].ToString();
                    textBoxAmt.Text = reader["pamount"].ToString();
                    comboBoxGroup.SelectedItem = reader["pclass"].ToString();
                    strUpdatedImgFile = reader["pimage"].ToString();
                    string strFullPath = GlobalVar.image_dir + @"\" + strUpdatedImgFile;

                    FileStream fs = File.OpenRead(strFullPath);
                    pictureBoxProduct.Image = Image.FromStream(fs);
                    fs.Close();
                    pictureBoxProduct.Tag = strFullPath;
                }

                reader.Close();
                con.Close();
            }
        }
        

        void SelectImg()
        {
            OpenFileDialog ofd = new OpenFileDialog();
            ofd.InitialDirectory = GlobalVar.image_dir;
            ofd.Filter = "圖片檔案類型(PNG)|*.png";
            DialogResult R = ofd.ShowDialog();

            if (R == DialogResult.OK)
            {

                FileStream fs = File.OpenRead(ofd.FileName);
                pictureBoxProduct.Image = Image.FromStream(fs);
                fs.Close();

                string strFileExtension = Path.GetExtension(ofd.SafeFileName).ToLower();
                Random myRnd = new Random();

                strUpdatedImgFile = DateTime.Now.ToString("yyMMddHHmmss") + myRnd.Next(1000, 10000).ToString() + strFileExtension;
                isImgUpdated = true;
                pictureBoxProduct.Tag = GlobalVar.image_dir + @"\" + strUpdatedImgFile;
                Console.WriteLine($"{GlobalVar.image_dir + @"\" + strUpdatedImgFile}");

            }
        }


        private void btnPicNew_Click(object sender, EventArgs e)
        {
            SelectImg();
        }

        private void btnSaveNew_Click(object sender, EventArgs e)
        {

        }

        private void btnClearNew_Click(object sender, EventArgs e)
        {

        }

        private void btnPicUpdate_Click(object sender, EventArgs e)
        {

        }

        private void btnSaveUpdate_Click(object sender, EventArgs e)
        {

        }

        private void btnDelete_Click(object sender, EventArgs e)
        {

        }
    }
}
