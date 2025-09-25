using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

/* using 關鍵字的使用方式
 * (1) using MyClass.Test.Sample → 之後就可以直接使用 A, 而不需要寫成 MyClass.Test.Sample.A
 * (2) using ma = MyClass.Test.Sample → 之後就可以呼叫 ma.A 
 */


namespace ConsoleApp1
{
    internal class Program
    {
        static void Main(string[] args)
        {   // 註解

            /*
             * 跨行註解
             */

            // 整數 integer
            int a = 10; // 定義了32位元的整數，變數名稱為a，指定的值是10
            int b = 20; int c = 30;
            c = 35;

            // csharp 當中各種 data types
            int d     = 2147483647; // int 有含正負號，32位元整數上限除以2
            uint ud   = 4294967295; // uint 不含正負號，32位元整數上限
            long e    = 4294967295234; // 含正負號，64位元整數
            ulong ue  = 6952344294967295234; // 不含正負號，64位元整數
            short f   = 32767; // 含正負號，16位元整數
            ushort uf = 65535; // 不含正負號，16位元整數

            // 浮點數 float (32 bits), double (64 bits)
            // float and double 都是透過一個 IEEE 754 機制，把輸入的數字做轉換，之後要使用時，再轉回來
            // 轉回來的時候，分別只會有7位和16位的數字資訊是正確的，超過的，在還原中，都會不正確
            float ff  = 3.141592f; // 精確到7位， range +- 1.5 x 10^-45 到 +- 3.4 x 10^38
            double df = 1.2345678912345; //精確到16位， range +- 5.0 x 10^-324 到 +- 1.7 x 10^308

            // Boolean 布林 1 bit
            bool finish = false; // 0: false, 1: true
            bool right = true;

            // Character 使用 16 bits
            char c1 = 'a'; // 使用 single quote
            char c2 = 'b';
            char c3 = '#';
            char c4 = '文'; // 也可以輸入中文

            // String 字串(把char集合起來)，長度不固定，16 bits x N
            string s1 = "Hello World !!"; // 使用 double quote
            string s2 = "C#";
            string s3 = "物件導向程式設計";
            string s4; // 沒有assign值時，它會是 null，在程式存取時，遇到null會有exception發生
            s4 = "Visual C#";
            string s5 = ""; //有空字串，但是沒有空的 char → 不能創造 char c5 = '', 會出錯

            Console.WriteLine("Hi, 這是第一個 Console App 主控台程式");
            Console.WriteLine("---------------------------------");
            Console.Write("32位元整數上限(含正負號):"); // Write 不會進行換行
            Console.WriteLine(d);
            Console.Write("64位元變數內容:");
            Console.WriteLine(e);

            // 更改console展現的字體還有背景顏色
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.BackgroundColor = ConsoleColor.DarkMagenta;
            Console.WriteLine("=================================");
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine("第一次專題發表會 - Windows 視窗程式作品 日期: 2025/11/04");
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine("=================================");
            Console.ResetColor();

            // 特殊符號控制字元，例如雙引號 ""，使用反斜線來escape
            Console.WriteLine("\"雙引號\"");
            Console.WriteLine("\\反斜線\\");
            Console.WriteLine("\n換行符號\n\n再換行\n"); // \n 是換行符號
            Console.WriteLine("\t縮排"); // 一個 \t 會縮排4個字元



            // Console 合併輸出，合併多個變數或值
            // 方法 1. 用 + 號 進行合併
            Console.WriteLine("合併內容：");
            Console.WriteLine(s1 + s2);
            Console.WriteLine(a + b);
            Console.WriteLine(s1 + a); // 字串 + 整數 → 變字串
            Console.WriteLine(b + ff); // 整數 + 浮點數 → 變成浮點數
            Console.WriteLine(a + c2); // a: 10, c2: 51 (ascii) 整數 + 字元 → 變成整數 (字元會轉為ACKII的編碼，再相加)
            Console.WriteLine(0 + c2); // c2: 51 (ascii)
            Console.WriteLine(c2); // c2: '3'
            Console.WriteLine(s1 + c2); // 字串 + 字元 → 變字串
            Console.WriteLine(s1 + finish);
            // Console.WriteLine(a + finish); // error 語法錯誤，不能 整數 + boolean (和其它語言規則不同)

            // 方法 2. 字串插值 一
            Console.WriteLine("=================================");
            string strOutput1 = $"float:{ff} double:{df} string:{s1} boolean:{right} char:{c3} int:{b}";
            Console.WriteLine(strOutput1);

            // 方法 3. 字串插值 二
            // index 是連續的，而且從零開始
            string strOutput2 = string.Format("整數:{0} 字串:{1} 浮點:{2}", b, "字串插值", ff); // 0,1,2 是索引(index)值
            Console.WriteLine(strOutput2);


            /*
             ASCII 是西歐語言會使用的文字編碼
             UTF8  萬國碼，中文會用這個編碼
             */

            Console.WriteLine("=================================");
            Console.WriteLine("按任意鍵結束程式");

            // 等待使用者按下任何一個keyboard上的鍵，才會關閉程式
            Console.ReadKey();

        }
    }
}
