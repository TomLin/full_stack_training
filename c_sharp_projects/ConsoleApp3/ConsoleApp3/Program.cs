using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp3
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("========= 條件判斷式 =========");
            Console.WriteLine("--------- if...else ----------");

            int x = 80;
            int y = 20;
            Console.WriteLine($"x:{x} y:{y}");

            if (x > y)
            { //true
                Console.WriteLine("x 大於 y");
            }
            else
            { //false
                Console.WriteLine("x 小於等於 y");
            }
            /////////////////////////////////////////
            if (x > y)
            { //true
                Console.WriteLine("x 大於 y");
            }
            else
            { //false
                if (x < y)
                {
                    Console.WriteLine("x 小於 y");
                }
                else
                {
                    Console.WriteLine("x 等於 y");
                }
            }
            //////////////////////////////////////////
            Console.WriteLine("---------- else...if ----------");
            if (x > y)
            {
                Console.WriteLine("x 大於 y");
            }
            else if (x < y)
            {
                Console.WriteLine("x 小於 y");
            }
            else if (x == y)
            {
                Console.WriteLine("x 等於 y");
            }
            else
            {
                Console.WriteLine("其他情況(此例不執行)");
            }
            ////////////////////////////////////////////////////
            Console.WriteLine("========== 條件運算式(簡式) ==========");
            int w = -8;
            int s = 0;

            if (w < 0)
            {
                s = -1;
            }
            else
            { // w >= 0
                s = w * 2;
            }

            s = (w < 0) ? -1 : w * 2;

            Console.WriteLine($"s : {s}");

            Console.WriteLine("==============================");
            Console.ReadKey();

            ////////////////////////////////////////////////////////////
            // 練習題Q: 請寫出一個c#的Console程式, 利用三個初始變數, 做出三個整數比大小的功能,
            // 執行結果列出這三個整數變數的值, 由小到大排列輸出, 只能用 if else來寫.
            // 不能使用陣列和排序. 使用 .net framework 4.8 函式庫.
            //
            // 練習步驟:
            // step 1. 自己嘗試寫作
            // step 2. Google 部落格的教學範例, 再模仿寫一次
            // step 3. 使用AI工具產生
            // (我是初學的學生, 請給我範例, 並且詳細的解釋, 簡單容易理解一點, 謝謝拜託了)
        }
    }
}
