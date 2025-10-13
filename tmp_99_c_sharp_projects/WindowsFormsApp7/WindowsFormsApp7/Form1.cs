using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp7
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            Console.WriteLine("=============== String 字串進階應用 ===============");
            string strA = "c:\\windows\\notes\\reload\\test.txt";
            strA = @"c:\windows\notes\reload\test.txt"; // @ 代表字串不處理特殊符號 → 被詮釋為全字串 (\n 之類的也不處理)
            Console.WriteLine(strA);

            string strOne = "Hello World !! C# String World";
            Console.WriteLine(strOne);
            Console.WriteLine($"strOne字串長度 {strOne.Length} 個字元");

            int idx = strOne.IndexOf("World");
            Console.WriteLine($"第一個 World 字串的第一個字元索引 {idx}");
            Console.WriteLine($"字元是 {strOne[idx]}");

            Console.WriteLine("--------------------------------------------------");
            string strTwo = strOne.Insert(6, "Hi "); // 會產生copy，如果是字串list(假設 myStringList.Insert 時，會更動原本reference type的實體內容)
            Console.WriteLine(strTwo);

            string strThree = strOne.Remove(6); // 移除索引值開始，到最後一個字元
            Console.WriteLine(strThree);

            string strFour = strOne.Remove(12, 3);
            Console.WriteLine(strFour);

            string strFive = strOne.Replace("World", "Earth"); // 會取代舊字串中，所以 World 的字串
            Console.WriteLine(strFive);

            string strSix = strOne.Substring(6); // 擷取字串
            Console.WriteLine(strSix);

            string strSeven = strOne.Substring(15,2); // 擷取字元
            Console.WriteLine(strSeven);

            string strEight = strOne.ToLower(); // 全變小寫
            Console.WriteLine(strEight);

            string strNine = strOne.ToUpper(); // 全變大寫
            Console.WriteLine(strNine);

            bool is包含字串 = strOne.Contains("C#");
            Console.WriteLine($"有無 C# 字串：{is包含字串}");

            char charOne = strOne[6];
            Console.WriteLine(charOne);

            string strSpaceOne = "    Visual Studio    ";
            string strTrim = strSpaceOne.Trim(); // 去除前後空白字元

            Console.WriteLine("--------------------------------------------------");

            string strCollections = "珍珠|波霸|QQ|椰果|芋圓";
            char charSplit = '|';
            string[] array冰品配料 = strCollections.Split(charSplit);
            List<String> list冰品配料 = array冰品配料.ToList();

            foreach (string 配料 in array冰品配料)
            {
                Console.WriteLine("配料");
            }



        }

    }
}
