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
            Console.WriteLine("============ For Loop (迴圈)============");

            for (int i = 1; i <= 10; i += 1)
            { //重覆執行
                Console.WriteLine($"{i}");
            }
            Console.WriteLine("-----------------------------------------");
            //EXE: 輸出 20...2 的偶數
            for (int i = 20; i >= 2; i -= 2)
            {
                Console.WriteLine($"{i}");
            }
            Console.WriteLine("-----------------------------------------");

            int 生命值 = 1000;
            //break 中斷迴圈
            for (int i = 1; i <= 100000; i += 1)
            {
                if (生命值 <= 0)
                {
                    Console.WriteLine("生命值為零, Game Over");
                    break;
                }

                Console.WriteLine($"i:{i} hp:{生命值}");
                生命值 -= 9;
            }
            Console.WriteLine("-----------------------------------------");
            // Continue 跳過這次迴圈
            for (int i = 1; i <= 20; i += 1)
            {
                if ((i == 5) || (i == 8) || (i == 11) || (i == 13))
                { //EXE: 請跳過5, 8 , 11, 13
                    continue;
                }
                
                Console.WriteLine($"{i}");
            }
            Console.WriteLine("-----------------------------------------");
            for (int i = 1; i <= 100; i += 1)
            { // EXE: continue 只能輸出奇數
                if (i % 2 == 0)
                { //偶數跳過
                    continue;
                }
                Console.WriteLine($"{i}");
            }
            Console.WriteLine("-----------------------------------------");
            Console.WriteLine("============ while 迴圈 ============");
            int n = 1;
            //while (true) //無窮迴圈
            while (n <= 20)
            {
                Console.WriteLine($"{n}");
                n++; // n += 1
            }
            Console.WriteLine("-----------------------------------------");
            Console.WriteLine("============ do while 迴圈 ============");

            do
            {
                Console.WriteLine("do..while迴圈執行, 至少執行一次");
            }
            while (false);


            Console.WriteLine("=========================================");
            Console.ReadKey();

        }
    }
}
