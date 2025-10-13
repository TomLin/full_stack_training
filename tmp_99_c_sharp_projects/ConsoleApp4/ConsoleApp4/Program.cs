using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp4
{
    internal class Program
    {
        static void Main(string[] args)
        {
            // Switch 的應用
            string ss = "";
            Console.WriteLine("========== 甜點選單 ==========");
            Console.WriteLine("a. 布丁 b: 冰淇淋 c: 奶酪 d:雞蛋糕 all:全包了");
            Console.WriteLine("請輸入甜點代號，輸入完成按 Enter");
            ss = Console.ReadLine(); // 讀取user輸入的字串，按enter輸入

            switch (ss)
            {
                case "a":
                    Console.WriteLine("你選了布丁，請投入30元");
                    break; // 記得每一個case都要使用break跳出
                case "b":
                    Console.WriteLine("你選了冰淇淋，請投入35元");
                    break;
                case "c":
                    Console.WriteLine("你選了奶酪，請投入40元");
                    break;
                case "d":
                    Console.WriteLine("你選了雞蛋糕，請投入50元");
                    break;
                case "all":
                    Console.WriteLine("你輸入all(全包了)，請投入50元");
                    break;
                default:
                    Console.WriteLine("無此項商品");
                    break;
            }
            
            Console.WriteLine("==========================");
            Console.ReadKey();



        }
    }
}
