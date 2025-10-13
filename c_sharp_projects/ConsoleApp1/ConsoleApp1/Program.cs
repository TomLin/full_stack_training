using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    internal class Program
    {
        static void Main(string[] args)
        {  // 註解 Comment (單行註解)
           // Main 是程式進入點
            /* 多行註解
             *  123456
             *   abcde
             *    ZXCVB
             */
            //整數 Integer
            int a = 10; // 定義了一個32位元的整數, 變數(Variable)名稱 a, 指定的值是 10
            int b = 20; int c = 30; // = 指定 assign
            c = 35;
            int d = 2147483647; // int 有含正負號, 32位元整數上限除以2
            uint ud = 4294967295; // uint 不含正負號, 32位元整數上限
            long e = 4294967295234; //含正負號 64位元整數
            ulong ue = 6952344294967295234; //不含正負號 64位元整數
            short f = 32767; //含正負號 16位元整數
            ushort uf = 65535; //不含正負號 16位元整數

            // 浮點數 float (32 bits), double (64 Bits)
            float ff = 3.141592f; //精確到 7 位,+-1.5 x 10^-45 到 +-3.4 x 10^38
            double df = 1.2345678912345;  //精確到 16 位, +- 5.0 x 10^-324 到 +-1.7 x 10^308

            // Boolean 布林 1 bit
            bool finish = false; //0: false, 1: true
            bool right = true;

            // Character 字元 16 bits
            char c1 = 'a';
            char c2 = '3';
            char c3 = '#';
            char c4 = '微';

            //String 字串, 長度不固定 由char組成 16 x n bits
            string s1 = "Hello World !!";
            string s2 = "C#";
            string s3 = "物件導向程式設計";
            string s4; //null
            s4 = "Visual C#";
            string s5 = ""; //空字串

            Console.WriteLine("Hi, 這是第一個主控台程式");
            Console.WriteLine("--------------------------------------");
            Console.Write("32位元整數上限(含正負號):");
            Console.WriteLine(d);
            Console.Write("64位元變數內容:");
            Console.WriteLine(e);
            Console.Write("字元內容1:");
            Console.WriteLine(c4);
            Console.Write("字串內容1:");
            Console.WriteLine(s3);
            Console.WriteLine();
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.BackgroundColor = ConsoleColor.DarkMagenta;
            Console.WriteLine("========================================================");
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine("第一次專題發表會 - Windows 視窗程式作品 日期: 2025/11/04");
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine("========================================================");
            Console.ResetColor();
            // 特殊符號控制字元 \
            Console.WriteLine("\"雙引號\"");
            Console.WriteLine("\\反斜線\\");
            Console.WriteLine("\n換行符號\n\n再換行\n"); // \n 換行符號
            Console.WriteLine("\t\t\t縮排");
            Console.WriteLine("========================================================");
            // Console 合併輸出, 合併多個變數或值
            //1. + 號合併輸出
            Console.WriteLine("合併內容");
            Console.WriteLine(s1 + s2);
            Console.WriteLine(a + b);
            Console.WriteLine(s1 + a);
            Console.WriteLine(b + ff);
            Console.WriteLine(a + c2); //a : 10, c2 : 51 (ascii)
            Console.WriteLine(0 + c2); // c2: 51 (ascii)
            Console.WriteLine(c2); // c2: '3'
            Console.WriteLine(s1 + c2);
            Console.WriteLine(s1 + finish); //字串string幾乎可以跟所有內容合併
            //Console.WriteLine(a + finish); //error 語法錯誤

            //2. 字串插值 1
            string strOutput1 = $"float:{ff} double:{df} string:{s1} bool:{right} char:{c3} int:{b}";
            Console.WriteLine(strOutput1);

            //3. 字串插值 2
            string strOutput2 = string.Format("整數: {0} 字串: {1} 浮點: {2}",b,"字串插值1",ff); //0,1,2是索引(index)值
            // index是連續的而且從零開始
            Console.WriteLine(strOutput2);

            Console.WriteLine("======================================");
            Console.WriteLine("按任意鍵結束程式");
            Console.ReadKey();
        }
        
    }
}

