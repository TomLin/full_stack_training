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
            Console.WriteLine("=========== 格式化(字串)輸出 ===========");
            double pi = 3.14159265359;
            Console.WriteLine($"{pi}");
            Console.WriteLine($"預設小數格式 {pi:F}");
            Console.WriteLine($"小數格式四位 {pi:F4}");
            Console.WriteLine($"小數格式六位 {pi:F6}");
            Console.WriteLine($"小數格式零位 {pi:F0}");
            Console.WriteLine($"百分比記號 {0.2812345:P}");
            Console.WriteLine($"百分比記號 {0.2812345:P5}");
            Console.WriteLine($"科學記號 {123456789:E}");
            Console.WriteLine($"科學記號 {123456789:E3}");
            Console.WriteLine($"整數補零 {123456:D8}");
            Console.WriteLine($"金融符號 {1234567890:C}");
            Console.WriteLine($"金融符號 {1234567890:C0}");

            Console.WriteLine("=========== 時間顯示格式化 ============");
            DateTime dt = DateTime.Now;
            Console.WriteLine($"{dt}");
            Console.WriteLine($"{dt:d}");
            Console.WriteLine($"{dt:D}");
            Console.WriteLine($"{dt:dddd}");
            Console.WriteLine($"{dt:F}");
            Console.WriteLine($"{dt:T}");
            Console.WriteLine($"{dt:t}");
            Console.WriteLine($"{dt:M}");
            Console.WriteLine($"{dt:ddd}");

            Console.WriteLine("=======================================");
            Console.ReadKey();
            ///////////////////////////////
            ///練習題:
            /// 寫出顯示各種方法求最大質數(ulong)所花費的時間:
            /// 例如:
            /// 1. 自己寫的方法
            /// 2. 平方根求法
            /// 3. Millar-Rabin法
            ///////////////////////////////
        }
    }
}
