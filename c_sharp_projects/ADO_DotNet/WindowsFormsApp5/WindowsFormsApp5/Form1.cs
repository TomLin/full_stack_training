using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient; // 連接SQL Server使用
using System.Diagnostics;
using System.Drawing;
using System.IO; // 輸出入圖片用
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;


namespace WindowsFormsApp5
{
    public partial class Form1 : Form
    {
        SqlConnectionStringBuilder scsb = new SqlConnectionStringBuilder();
        List<int> listId = new List<int>(); // key
        List<string> listProducts = new List<string>(); // value
        List<int> listPPrices = new List<int>(); // value
        string PGroup = "";

        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            scsb.DataSource = @"./";
            // scsb.DataSource = @".\MSSQLSERVER01";
            scsb.InitialCatalog = "myDB";
            scsb.IntegratedSecurity = true;

            // 將資料庫連線資訊，存在GlovalVar
            GlobalVar.strDBConnectionString = scsb.ConnectionString.ToString();


            PGroup = ""; // 全部
            ReadDB(PGroup);
            ShowListViewImageMode();
        }

        void ReadDB(string strPClass)
        {
            string strSQL = "";
            switch (strPClass)
            {
                case "": // 全部
                    strSQL = $"select * from Products;";
                    break;
                case "sale": // 特價商品
                    strSQL = $"select * from Products where pclass = '{strPClass}' ;";
                    break;
                case "fruitbox": // 水果禮盒
                    strSQL = $"select * from Products where pclass = '{strPClass}' ;";
                    break;
                default: // 全部
                    strSQL = $"select * from Products;";
                    break;
            }

            SqlConnection con = new SqlConnection(GlobalVar.strDBConnectionString);
            con.Open();
            SqlCommand cmd = new SqlCommand(strSQL, con);
            SqlDataReader reader = cmd.ExecuteReader();

            int count = 0;
            while (reader.Read() == true)
            {
                listId.Add((int)reader["id"]);
                listProducts.Add((string)reader["pname"]);
                listPPrices.Add((int)reader["price"]);
                
                string image_name = (string)reader["pimage"]; // 檔名
                string full_dir = GlobalVar.image_dir + @"\" + image_name; // 路徑 + 檔名
                FileStream fs = File.OpenRead(full_dir); // file stream 讀出來，是binary的型式
                Image imgProduct = Image.FromStream(fs); 
                imageListProduct.Images.Add(imgProduct);
                fs.Close(); // 使用完，釋放記憶體
                count ++;

            }
            Console.WriteLine($"text 01 共有 {count} 筆");
            // Debug.WriteLine($"text 02 共有 {count} 筆");
            reader.Close();  // SQL Server 的使用者連線的數量限制，所以不使用時，盡量關閉連線
            con.Close();

        }

        void ShowListViewImageMode()
        {
            listViewEntries.Clear();

            // 圖片模式的四種顯示方式：LargeIcon, Tile, List, SmallIcon
            listViewEntries.View = View.LargeIcon;
            imageListProduct.ImageSize = new Size(120, 120); // 這邊最大的尺寸，就是圖片的尺寸 256x256

            // LargeIcon, Tile
            listViewEntries.LargeImageList = imageListProduct;

            // List, SmallIcon
            listViewEntries.SmallImageList = imageListProduct; // 這裡沒有小圖的圖集，所以用大圖的圖集暫代

            for (int i = 0; i < listId.Count; i++)
            {
                ListViewItem item = new ListViewItem();
                item.ImageIndex = i; // 將 ImageList 裡面的圖片加入
                item.Text = $"{listProducts[i]} {listPPrices[i]}元";
                item.Font = new Font("微軟正黑體", 12, FontStyle.Bold);
                item.ForeColor = Color.Blue;
                item.Tag = listId[i];
                // item.BackColor = Color.LightGray;
                listViewEntries.Items.Add(item);
            }
        }

        void ShowListViewListMode()
        {
            listViewEntries.Clear();
            listViewEntries.LargeImageList = null; // 列表模式下，需要先將 LargeImageList 設為 null 才不會出錯
            listViewEntries.SmallImageList = null; // 列表模式下，需要先將 SmallImageList 設為 null 才不會出錯
            listViewEntries.View = View.Details;  // 列表模式只有一個設定，就是 Details
            listViewEntries.Columns.Add("id", 100);
            listViewEntries.Columns.Add("商品名稱", 200);
            listViewEntries.Columns.Add("商品價格", 100);
            listViewEntries.GridLines = true;  // 畫格線
            listViewEntries.FullRowSelect = true;  // 點擊時，會全選

            for (int i = 0; i < listId.Count; i++)
            {
                ListViewItem item = new ListViewItem();
                item.Text = listId[i].ToString(); // 第一欄，是加在 Text 屬性下
                item.SubItems.Add(listProducts[i]); // 第二欄之後，是加在 SubItems 屬性下
                item.SubItems.Add(listPPrices[i].ToString());
                item.Tag = listId[i];
                item.Font = new Font("微軟正黑體", 12, FontStyle.Regular);
                item.ForeColor = Color.DarkBlue;  // 字體顏色
                // item.BackColor = Color.LightGray; //背景顏色
                listViewEntries.Items.Add(item);

            }
        }



        private void listViewEntries_ItemActivate(object sender, EventArgs e)
        {   // 點擊商品展示(ListView)上的物件，或是圖片，就會trigger the event

            FormDetail myFormDetail = new FormDetail(); // 從自定義另一個表單 FormDetail 而來

            // 因為listView可以複選items，這邊限定，只會使用第一個選項的ID
            myFormDetail.loadID = (int)listViewEntries.SelectedItems[0].Tag;
            myFormDetail.ShowDialog();

        }


        void ReFreshProduct()
        {
            listId.Clear();
            listProducts.Clear();
            listPPrices.Clear();
            imageListProduct.Images.Clear();

            ReadDB(PGroup);

            // 判所目前ListView所要顯示的模式
            if (listViewEntries.View == View.Details)
            {
                ShowListViewListMode();
            }
            else
            {
                ShowListViewImageMode();
            }
                

        }

        private void btnAllProduct_Click(object sender, EventArgs e)
        {
            PGroup = "";
            ReFreshProduct();
        }

        private void btnDiscountProduct_Click(object sender, EventArgs e)
        {
            PGroup = "sale";
            ReFreshProduct();
        }

        private void btnGiftBox_Click(object sender, EventArgs e)
        {
            PGroup = "fruitbox";
            ReFreshProduct();
        }

        private void btnPicMode_Click(object sender, EventArgs e)
        {
            ShowListViewImageMode();
        }

        private void btnListMode_Click(object sender, EventArgs e)
        {
            ShowListViewListMode();
        }

        private void btnAddProduct_Click(object sender, EventArgs e)
        {
            FormDetail myFormDetail = new FormDetail();
            myFormDetail.ShowDialog();

        }

        private void btnRefresh_Click(object sender, EventArgs e)
        {
            ReFreshProduct();
        }
    }
}
