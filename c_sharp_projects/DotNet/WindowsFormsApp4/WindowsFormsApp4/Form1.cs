using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp4
{
    public partial class Form1 : Form
    {
        List<string> list飲料品項 = new List<string>(); // key
        List<int> list飲料價格 = new List<int>();  // value
        List<string> list甜度 = new List<string>();
        List<string> list冰塊 = new List<string>();  
        List<string> list加料品項 = new List<string>();  // key
        List<int> list加料價格 = new List<int>();  //value

        int 杯數 = 0;
        int 單價 = 0;  // 飲料 + 加料
        int 單品總價 = 0; // 單價 * 杯數
        string 單品名稱 = "";
        string 甜度 = "";
        string 冰塊 = "";
        string 加料 = "";

        bool is外帶 = false;
        bool is買購物袋 = false;

        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            //Form_Load步驟:
            //加入UI,
            //讀入資料,
            //設定UI預設值

            //key 飲料
            list飲料品項.Add("麥香紅茶");
            list飲料品項.Add("茉莉綠茶");
            list飲料品項.Add("波霸奶茶");
            list飲料品項.Add("玫瑰花茶");
            list飲料品項.Add("現打西瓜汁");
            //value
            list飲料價格.Add(30);
            list飲料價格.Add(35);
            list飲料價格.Add(40);
            list飲料價格.Add(45);
            list飲料價格.Add(50);

            //key 加料
            list加料品項.Add("不加料");
            list加料品項.Add("珍珠");
            list加料品項.Add("波霸");
            list加料品項.Add("芋圓");
            list加料品項.Add("椰果");
            //value
            list加料價格.Add(0);
            list加料價格.Add(8);
            list加料價格.Add(10);
            list加料價格.Add(12);
            list加料價格.Add(6);

            //甜度
            list甜度.Add("正常糖");
            list甜度.Add("半糖");
            list甜度.Add("微糖");
            list甜度.Add("無糖");

            //冰塊
            list冰塊.Add("正常冰");
            list冰塊.Add("少冰");
            list冰塊.Add("微冰");
            list冰塊.Add("去冰");

            ////////////////////////////////////
            for (int i = 0; i < list飲料品項.Count; i++)
            {
                listBox飲料品項.Items.Add($"{list飲料品項[i]} - {list飲料價格[i]}元");
            }

            for (int i = 0; i < list加料品項.Count; i++)
            {
                comboBox加料.Items.Add($"{list加料品項[i]} - {list加料價格[i]}元");
            }

            for (int i = 0; i < list甜度.Count; i++)
            {
                comboBox甜度.Items.Add($"{list甜度[i]}");
            }

            for (int i = 0; i < list冰塊.Count; i++)
            {
                comboBox冰塊.Items.Add($"{list冰塊[i]}");
            }


            //// 表單預設值
            comboBox甜度.SelectedIndex = 0;
            甜度 = list甜度[0];
            comboBox冰塊.SelectedIndex = 1;
            冰塊 = list冰塊[1];
            comboBox加料.SelectedIndex = 0;
            加料 = list加料品項[0];

            listBox飲料品項.SelectedIndex = 0;
            單品名稱 = list飲料品項[0];
            杯數 = 1;
            txt杯.Text = $"{杯數}";
            單價 = list飲料價格[listBox飲料品項.SelectedIndex] + 
                list加料價格[comboBox加料.SelectedIndex];

            lbl單品總價.Text = $"{單價}元";
            單品總價 = 單價 * 杯數;
            lbl單品總價.Text = $"{單品總價}元";
            lbl購物車資訊.Text = $"0";
           
        }


        void 計算單品總價()
        {   
            // 在沒有選時，SelectedIndex的值會是-1
            if (listBox飲料品項.SelectedIndex >= 0) 
            { 
                單品總價 = 單價 * 杯數;
                lbl飲料單價.Text = $"{單價}";
                lbl單品總價.Text = $"{單品總價}";
                lbl購物車資訊.Text = $"{GlobalVar.list訂購品項集合.Count}";
            }
        }


        private void listBox飲料品項_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (listBox飲料品項.SelectedIndex >= 0) 
            {
                單品名稱 = list飲料品項[listBox飲料品項.SelectedIndex];
                單價 = list飲料價格[listBox飲料品項.SelectedIndex] +
                    list加料價格[comboBox加料.SelectedIndex];
                計算單品總價();

            }

        }

        private void comboBox甜度_SelectedIndexChanged(object sender, EventArgs e)
        {
            甜度 = list甜度[comboBox甜度.SelectedIndex];
        }

        private void comboBox冰塊_SelectedIndexChanged(object sender, EventArgs e)
        {
            冰塊 = list冰塊[comboBox冰塊.SelectedIndex];
        }

        private void comboBox加料_SelectedIndexChanged(object sender, EventArgs e)
        {
            if ((listBox飲料品項.SelectedIndex >= 0) && (comboBox加料.SelectedIndex >= 0))
            {
                單品名稱 = list飲料品項[listBox飲料品項.SelectedIndex];
                單價 = list飲料價格[listBox飲料品項.SelectedIndex] +
                    list加料價格[comboBox加料.SelectedIndex];

                加料 = list加料品項[comboBox加料.SelectedIndex];
                計算單品總價();
            }
        }

        private void txt杯_TextChanged(object sender, EventArgs e)
        {
            if (txt杯.Text != "")
            {
                bool is杯數正確 = Int32.TryParse(txt杯.Text, out 杯數);

                if ((is杯數正確 == true) && (杯數 > 0) && (杯數 < 100))
                {
                    // 杯數正確
                }
                else
                {
                    // 杯數不符合規定
                    MessageBox.Show($"杯數輸入錯誤，請重新輸入(1-99)杯");
                    杯數 = 1;
                    txt杯.Text = $"{杯數}";
                }

                計算單品總價();
            }
        }

        private void btn加一杯_Click(object sender, EventArgs e)
        {

        }

        private void btn減一杯_Click(object sender, EventArgs e)
        {

        }

        private void chk外帶_CheckedChanged(object sender, EventArgs e)
        {
            is外帶 = chk外帶.Checked;
        }

        private void chk需買購物袋_CheckedChanged(object sender, EventArgs e)
        {
            is買購物袋 = chk需買購物袋.Checked;
        }

        private void btn加入購物車_Click(object sender, EventArgs e)
        {
            if (listBox飲料品項.SelectedIndex >= 0)
            {
                ArrayList 訂購單品資料 = new ArrayList();
                訂購單品資料.Add(單品名稱);
                訂購單品資料.Add(單價);
                訂購單品資料.Add(杯數);
                訂購單品資料.Add(單品總價);
                訂購單品資料.Add(甜度);
                訂購單品資料.Add(冰塊);
                訂購單品資料.Add(加料);
                GlobalVar.list訂購品項集合.Add(訂購單品資料);
                MessageBox.Show("訂購品項已加入購物車!");
                lbl購物車資訊.Text = $"{GlobalVar.list訂購品項集合.Count}";

            }
        }

        private void btn查看購物車_Click(object sender, EventArgs e)
        {
            if (GlobalVar.list訂購品項集合.Count > 0)
            {
                GlobalVar.訂購人資料 = txt訂購人.Text.Trim();
                GlobalVar.is外帶 = is外帶;
                GlobalVar.is買購物袋 = is買購物袋;

                // 開啟購物車
                FormShoppingCart myFormShoppingCart = new FormShoppingCart();
                // myFormShoppingCart.Show();  // 先前開啟的視窗不會關閉
                myFormShoppingCart.ShowDialog(); // 獨佔開啟(需先關閉既有視窗，才能開新視窗)
            }
            else
            {
                MessageBox.Show("請至少加入一件商品");
            }
        }
    }
}
