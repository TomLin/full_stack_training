using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp9
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("========== 格式化(字串)輸出 ==========");
            double pi = 3.14159265359;
            Console.WriteLine($"Pi沒有格式化的輸出： {pi}");
            Console.WriteLine($"Pi格式化的輸出： {pi:F}"); // default
            Console.WriteLine($"Pi格式化的輸出： {pi:F4}");
            Console.WriteLine($"Pi格式化的輸出： {pi:F0}");
            Console.WriteLine($"百分比的輸出： {0.2812345:P}"); // 百分比顯示
            Console.WriteLine($"百分比的輸出： {0.2812345:P5}");


            Console.WriteLine("========== 時間顯示格式化 =============");
            DateTime dt = DateTime.Now;
            Console.WriteLine($"預設時間顯示： {dt}");
            Console.WriteLine($"時間顯示： {dt:d}");
            Console.WriteLine($"時間顯示： {dt:D}");
            Console.WriteLine($"時間顯示： {dt:dddd}");
            Console.WriteLine($"時間顯示： {dt:F}");
            Console.WriteLine($"時間顯示： {dt:T}");
            Console.WriteLine($"時間顯示： {dt:t}");
            Console.WriteLine($"時間顯示： {dt:M}");
            Console.WriteLine($"時間顯示： {dt:ddd}");

            Console.WriteLine("==================================== ");
            Console.ReadKey();

            /* 練習題
             * 寫出各種方法求出最大質數所花費的時間
             * 1. 自己寫的方法
             * 2. 平方根求法
             * 3. Millar-Rabin法 (求質數的一種方法)
             */



        }
    }
}
