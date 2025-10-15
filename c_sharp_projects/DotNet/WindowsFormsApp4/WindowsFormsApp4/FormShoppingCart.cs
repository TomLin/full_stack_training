using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.IO;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp4
{
    public partial class FormShoppingCart : Form
    {
        public FormShoppingCart()
        {
            InitializeComponent();
        }

        private void FormShoppingCart_Load(object sender, EventArgs e)
        {
            lbl訂購人資訊.Text = $"訂購人 {GlobalVar.訂購人資料}";

            foreach (ArrayList 品項 in GlobalVar.list訂購品項集合)
            {
                string 品項名稱 = (string)品項[0]; // ArrayList的元素是以object的方式儲存資料，使用時需再轉換型別
                int 單價 = (int)品項[1];
                int 杯數 = (int)品項[2];
                int 單品總價 = (int)品項[3];
                string 甜度 = (string)品項[4];
                string 冰塊 = (string)品項[5];
                string 加料 = (string)品項[6];

                string strItem = $"{品項名稱} {單價}元 {杯數}杯 共{單品總價}元 {甜度} {冰塊} {加料}";

                listBox訂購品項列表.Items.Add(strItem);
            }

            計算訂單總價();
        }

        void 計算訂單總價()
        {
            int 訂單總價 = 0;

            foreach (ArrayList 品項 in GlobalVar.list訂購品項集合)
            {
                int 單品總價 = (int)品項[3];
                訂單總價 += 單品總價;
            }

            if((GlobalVar.is買購物袋 ==  true) && (GlobalVar.list訂購品項集合.Count > 0))
            {
                訂單總價 += 2;
                lbl買購物袋.Visible = true;
            }
            else
            {
                lbl買購物袋 .Visible = false;
            }


            if ((GlobalVar.is外帶 == true) && (GlobalVar.list訂購品項集合.Count > 0))
            {
                lbl外帶.Visible = true;
            }
            else
            {
                lbl外帶.Visible = false;
            }

            lbl訂單總價.Text = $"訂單總價: {訂單總價}元";

        }

        private void btn移除所選品項_Click(object sender, EventArgs e)
        {
            if (listBox訂購品項列表.SelectedIndex >= 0)
            {
                int delIdx = listBox訂購品項列表.SelectedIndex;
                listBox訂購品項列表.Items.RemoveAt(delIdx);
                GlobalVar.list訂購品項集合.RemoveAt(delIdx);
                計算訂單總價();
            }
            else
            {
                MessageBox.Show("請選擇移除品項");
            }
        }

        private void btn刪除所有品項_Click(object sender, EventArgs e)
        {
            if (listBox訂購品項列表.Items.Count >= 0)
            {
                foreach(ArrayList 品項 in GlobalVar.list訂購品項集合)
                {
                    品項.Clear();
                }
                GlobalVar.list訂購品項集合.Clear();
                listBox訂購品項列表.Items.Clear();
                計算訂單總價();
                lbl外帶.Visible = false;
                lbl買購物袋.Visible = false;
                lbl訂購人資訊.Text = "";
            }
            else
            {
                MessageBox.Show("無品項可移除");
            }
        }

        private void btn輸出訂購單_Click(object sender, EventArgs e)
        {
            string str預設輸出路徑 = @"C:\Users\iSpan\Desktop" +
                @"\tomlin_full_stack\full_stack_training\c_sharp_projects\DotNet";

            // 亂數作為檔名，並且加上時間，方便後續排序
            Random myRnd = new Random();
            int numRnd = myRnd.Next(1000, 10000); // 1000 - 9999
            string str檔名 = DateTime.Now.ToString("yyyyMMddHHmmss_") +
                numRnd.ToString() + "_訂購單.txt";

            string str完整路徑檔名 = str預設輸出路徑 + @"\" + str檔名;

            Console.WriteLine(str完整路徑檔名);

            SaveFileDialog sfd = new SaveFileDialog();
            sfd.InitialDirectory = str預設輸出路徑;
            sfd.FileName = str檔名;
            sfd.Filter = "文字檔 Text File|*.txt"; // (左邊)文字說明|(右邊)需要篩選的檔案類別
            DialogResult R = sfd.ShowDialog();

            if (R == DialogResult.OK)
            {   // 確認存檔
                str完整路徑檔名 = sfd.FileName;  // 使用者設定新的檔案名稱之後，這個FileName就會是包含directory的完整路徑
                Console.WriteLine(str完整路徑檔名);
            
            }
            else
            {
                // 取消
                return;
            }

            // 訂單輸出
            List<string> list訂單內容 = new List<string>();
            list訂單內容.Add("******** 喝的到飲料店訂購單 ********");
            list訂單內容.Add("----------------------------------");
            list訂單內容.Add($"訂購時間 {DateTime.Now}");
            list訂單內容.Add($"訂購人 {GlobalVar.訂購人資料}");

            foreach (ArrayList 品項 in GlobalVar.list訂購品項集合)
            {
                string 品項名稱 = (string)品項[0]; // ArrayList的元素是以object的方式儲存資料，使用時需再轉換型別
                int 單價 = (int)品項[1];
                int 杯數 = (int)品項[2];
                int 單品總價 = (int)品項[3];
                string 甜度 = (string)品項[4];
                string 冰塊 = (string)品項[5];
                string 加料 = (string)品項[6];

                string strItem = $"{品項名稱} {單價}元 {杯數}杯 共{單品總價}元 {甜度} {冰塊} {加料}";

                list訂單內容.Add(strItem);
            }

            list訂單內容.Add($"==================================");
            if (GlobalVar.is外帶 == true)
            {
                list訂單內容.Add($"{lbl外帶.Text}");
            }

            if (GlobalVar.is買購物袋 == true)
            {
                list訂單內容.Add($"{lbl買購物袋.Text}");
            }

            list訂單內容.Add("==================================");
            list訂單內容.Add($"{lbl訂單總價.Text}");
            list訂單內容.Add("==================================");
            list訂單內容.Add("=========== 謝謝光臨 =============");

            File.WriteAllLines(str完整路徑檔名, list訂單內容, Encoding.UTF8);
            MessageBox.Show("儲存成功");



        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            Close(); // 關閉表單
        }
    }
}
