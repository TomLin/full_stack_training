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
            Console.WriteLine("========== 條件判斷式 ==========");
            Console.WriteLine("========== if...else ==========");

            int x = 20;
            int y = 80;
            Console.WriteLine($"x: {x} y: {y}");

            if (x > y) // C#中，if 裡面的條件判斷式，不能省略括號()
            {// true
                Console.WriteLine("x 大於 y");

            }
            else if (x == y)
            {
             // true
                Console.WriteLine("x 等於 y");
            }
            else {
                Console.WriteLine("x 小於 y");
            };

            /* 練習題：寫出一個C#的Console程式，有三個初始變數，進行比較數值大小，
             * 執行結果，由小到大排列輸出，需要使用if else的判斷式來寫，不能使用陣列與排序，
             * 並且使用 .net 4.8 framework的架構。
             */

            int a = 3;
            int b = 2;
            int c = 1;

            int temp;

            if (a > b)
            {
                temp = a;
                a = b;
                b = temp;
            }

            if (b > c)
            {
                temp = b;
                b = c;
                c = temp;
            }

            if (a > b)
            {
                temp = a;
                a = b;
                b = temp;
            }

            Console.WriteLine("3個數字的排序(sorting)");
            Console.WriteLine("{0}, {1}, {2}", a, b, c);


            Console.WriteLine("========== 條件判斷式(簡式) ==========");

            int w = -8;
            int s = 0;

            s = (w < 0) ? -1 : w *2; // 簡式判斷，(cond) ? true : false
            Console.WriteLine("簡式判斷式的結果： {0}", s);
            Console.ReadKey();

        }
    }
}
