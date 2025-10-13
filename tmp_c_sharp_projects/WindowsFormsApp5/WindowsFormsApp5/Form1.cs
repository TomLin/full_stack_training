using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net.NetworkInformation;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp5
{
    public partial class Form1 : Form
    {
        //class variable 類別變數(整個類別可視)
        string[] arrayStudentName;//學生姓名陣列
        int[] arrayStudentScore; //學生成績陣列;
        string[] arrayTempStudentName; //學生姓名暫存陣列
        int[] arrayTempStudentScore; //學生成績暫存陣列

        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            arrayStudentName = new string[5];//key(鍵), key-value(鍵值對應), 索引值index對應
            arrayStudentName[0] = "王小明";
            arrayStudentName[1] = "陳大貓";
            arrayStudentName[2] = "林玉珮";
            arrayStudentName[3] = "張文書";
            arrayStudentName[4] = "黃忠孝";

            arrayStudentScore = new int[5];//value(值)
            arrayStudentScore[0] = 76;
            arrayStudentScore[1] = 68;
            arrayStudentScore[2] = 54;
            arrayStudentScore[3] = 94;
            arrayStudentScore[4] = 86;

            arrayTempStudentName = new string[5];
            arrayTempStudentScore = new int[5];
        }

        void 姓名排序(string[] myArrayName)
        {
            Array.Sort(myArrayName); //標點符號, 0-9, a-z, 中文字筆畫由小到大

            string strMsg = "";

            for (int i = 0; i < myArrayName.Length; i += 1)
            {
                strMsg += $"姓名: {myArrayName[i]}\r\n"; // 在 textbox中，需要使用\r\n來進行換行
            }

            txt查詢結果.Text = strMsg;
        }

        private void btn姓名排序_Click(object sender, EventArgs e)
        {
            Array.Copy(arrayStudentName, arrayTempStudentName, arrayStudentName.Length);
            姓名排序(arrayTempStudentName); //排序副本
        }

        void 成績排序(string[] myArrayName, int[] myArrayScore)
        {
            Array.Sort(myArrayScore, myArrayName); //維持key-Value一致 → Sort 方法的多載，同時變動兩個array

            string strMsg = "";

            for (int i = 0; i < myArrayName.Length; i += 1)
            {
                strMsg += $"姓名: {myArrayName[i]} 成績: {myArrayScore[i]}分\r\n";
            }

            txt查詢結果.Text = strMsg;
        }

        private void btn成績排序_Click(object sender, EventArgs e)
        {
            Array.Copy(arrayStudentName, arrayTempStudentName, arrayStudentName.Length);
            Array.Copy(arrayStudentScore, arrayTempStudentScore, arrayStudentScore.Length);
            成績排序(arrayTempStudentName, arrayTempStudentScore);
        }

        private void btn所有學生成績_Click(object sender, EventArgs e)
        {
            string strMsg = "";

            for (int i = 0; i < arrayStudentName.Length; i += 1)
            {
                strMsg += $"姓名: {arrayStudentName[i]} 成績: {arrayStudentScore[i]}分\r\n";
            }

            txt查詢結果.Text = strMsg;
        }

        private void btn姓名搜尋_Click(object sender, EventArgs e)
        {
            if (txt搜尋關鍵字.Text != "")
            {
                int index, 名次 = 0;
                string strMsg = $"搜尋結果\r\n---------------------------------\r\n";
                string str搜尋姓名 = txt搜尋關鍵字.Text;

                Array.Copy(arrayStudentName, arrayTempStudentName, arrayStudentName.Length);
                Array.Copy(arrayStudentScore, arrayTempStudentScore, arrayStudentScore.Length);
                成績排序(arrayTempStudentName, arrayTempStudentScore);

                index = Array.IndexOf(arrayTempStudentName, str搜尋姓名); //index不是名次

                if (index == -1)
                {
                    //找不到
                    strMsg += "查無此人";
                }
                else
                {   //找到了
                    名次 = arrayTempStudentName.Length - index; // 數學技巧，從遞增array的index，得到名次
                    strMsg += $"姓名 {arrayTempStudentName[index]} 成績 {arrayTempStudentScore[index]} 第{名次}名";
                }

                txt查詢結果.Text = strMsg;
            }
            else
            {
                MessageBox.Show("請輸入姓名關鍵字");
            }
        }
    }
}
