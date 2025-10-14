using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp3
{
    public partial class Form1 : Form
    {
        Label myLabel = new Label();  // 定義在Form1的欄位，別的方法才能使用它
        List<Button> list品項按紐集合 = new List<Button>();
        
        // 鍵值對應key(冰飲名稱) - value(價格)
        Dictionary<string, int> dict冰飲 = new Dictionary<string, int>();
        


        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

            dict冰飲.Add("紅茶1", 30);
            dict冰飲.Add("紅茶2", 31);
            dict冰飲.Add("紅茶3", 32);
            dict冰飲.Add("紅茶4", 33);
            dict冰飲.Add("紅茶5", 34);

            dict冰飲.Add("綠茶1", 40);
            dict冰飲.Add("綠茶2", 41);
            dict冰飲.Add("綠茶3", 42);
            dict冰飲.Add("綠茶4", 43);
            dict冰飲.Add("綠茶5", 44);

            dict冰飲.Add("奶茶1", 50);
            dict冰飲.Add("奶茶2", 51);
            dict冰飲.Add("奶茶3", 52);
            dict冰飲.Add("奶茶4", 53);
            dict冰飲.Add("奶茶5", 54);

            程式化語法產生Label();
            程式化語法產生品項Button(3, 6);

        }

        void 程式化語法產生Label()
        {
            myLabel.BackColor = Color.Pink;
            myLabel.ForeColor = Color.Blue;
            myLabel.Font = new Font("微軟正黑體", 16);

            myLabel.Text = "喝的到飲料店POS機";
            myLabel.TextAlign = ContentAlignment.MiddleCenter;

            // myLabel的點，會以左上角為原點
            myLabel.Location = new Point(310, 20); // 第一個參數是X座標，第二個參數是Y座標
            
            // width, height，也是以左上角為基準
            myLabel.Size = new Size(300, 40); // 第一個參數是width, 第二個參數是height
            Controls.Add(myLabel);  // 將這個myLabel元件，加到UI上頭
        }

        void 程式化語法產生品項Button(int col, int row)
        {
            int idx = 0; // 索引值對應

            for (int i = 0; i < row; i++) // y軸往下遞增 
            {
                for (int j = 0; j < col; j++) // x軸往右遞增
                {
                    if (idx >= dict冰飲.Count)
                    {
                        return;
                    }

                    // 產生Button
                    // 在這邊是區域物件，但是等一下會被add進去List(Class Field)
                    Button dButton = new Button();
                    dButton.BackColor = Color.LightBlue;
                    dButton.ForeColor = Color.DarkBlue;
                    dButton.Font = new Font("微軟正黑體", 14);
                    dButton.TextAlign = ContentAlignment.MiddleCenter;

                    // 第一個Button位置是在(20, 60)
                    int myX = 20 + (110 * i);
                    int myY = 60 + (90 * j);

                    dButton.Location = new Point(myX, myY);
                    dButton.Size = new Size(110, 90);
                    dButton.Text = $"{dict冰飲.ElementAt(idx).Key}\n" +
                        $"{dict冰飲.ElementAt(idx).Value}元";

                    // += 這個運算子，是事件指定運算子， -= 是事件解除運算子
                    dButton.Click += dButton_Click;
                    dButton.Tag = idx; // 給每一個Button一個編號 

                    Controls.Add(dButton);
                    list品項按紐集合.Add(dButton);
                    idx += 1;
                }
            }
        }

        private void dButton_Click(object sender, EventArgs e)
        {   // Button共用事件(event)

            Button myButton = (Button)sender; // 這個sender就是按鈕本身，再轉換成Button type (原本是object)
            int idx = (int)myButton.Tag;

            string 品項名稱 = dict冰飲.ElementAt(idx).Key;
            int 品項價格 = dict冰飲.ElementAt(idx).Value;

            MessageBox.Show($"dButton按鈕事件:\n{品項名稱}\n{品項價格}元");
        }

        private void btn清除所有品項_Click(object sender, EventArgs e)
        {
            foreach (Button myBtn in list品項按紐集合)
            {
                myBtn.Click -= dButton_Click; // 解除button與事件的連結
                Controls.Remove(myBtn);
            }

        }

        private void btn今天喝什麼_Click(object sender, EventArgs e)
        {
            if (list品項按紐集合.Count > 0)
            {   
                foreach (Button myBtn in list品項按紐集合)
                {
                    myBtn.BackColor = Color.LightBlue;
                }
                Random myRnd = new Random();
                int myIdx = myRnd.Next(0, list品項按紐集合.Count);
                Button chooseBtn = list品項按紐集合[myIdx];
                chooseBtn.BackColor = Color.DarkOrchid;
            }
        }
    }
}
