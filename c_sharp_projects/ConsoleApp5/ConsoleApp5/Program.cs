using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp5
{
    internal class Program
    {
        static void Main(string[] args)
        {
            // 如果這邊就先定義 i, 那麼下面 for loop 裡面，就會使用這個 i，外層大括號的變數，會被內層大括號的變數延用。
            
            Console.WriteLine("========= For Loop (迴圈) ===========");

            for (int i = 1; i <= 10; i += 2)
            { // 重覆執行
              // C#語言中，在大括號中的區域變數，本例為i，離開大括號後，就被釋放出來了
                Console.WriteLine($"(遞增)目前的index: {i}");

            }

            Console.WriteLine("------------------------------");
            
            for (int j = 20;j >= 2; j -= 2)
            {
                Console.WriteLine($"(遞減)目前的index: {j}");
            }

            Console.WriteLine("------------------------------");

            int money = 100;
            // break 中斷迴圈
            for (int i = 1; i <= 100; i += 1)
            {
                // money <= 0 程式寫法，會比 money == 0 來的好 (防衛性寫法)
                if (money <= 0)
                {
                    Console.WriteLine("money 為零, Game Over");
                    break;
                }

                Console.WriteLine($"(break寫法) 迴圈: {i} money: {money}");
                money -= 7;
            }

            Console.WriteLine("------------------------------");

            // continue 跳過這一次的迴圈
            for (int i = 1; i <= 15; i += 1)
            {
                if (i == 5 || i == 8 || i == 11)
                { // 輸出跳過5,8,11
                    continue;
                }

                Console.WriteLine($"(continue寫法) 目前的index: {i}");
            }

            Console.WriteLine("------------------------------");

            for (int i = 1; i <= 10;i += 1)
            { 
                if (i % 2 == 0)
                { 
                    continue; 
                }

                Console.WriteLine($"(continue寫法) 只有輸出奇數index: {i}");

            }

            Console.WriteLine("------------------------------");
            Console.WriteLine("========== while 迴圈 ============");

            int n = 1;

            while (true)
            {
                if (n >= 100) 
                { 
                    break;
                }
                Console.WriteLine($"while 迴圈的index: {n}");
                n++; // n += 1
            }

            Console.WriteLine("------------------------------");

            int m = 1;

            while (m <= 20)
            {
                Console.WriteLine($"while 迴圈的index: {m}");
                m++;
            }

            Console.WriteLine("------------------------------");

            // do ... while 迴圈，至少會先執行一次



            Console.WriteLine("==============================");
            Console.ReadKey();
        }
    }
}
