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
            //EXE: 累積訂單總價, 顯示在下方
            //提示: 在此建立一個總價變數
            int 總價 = 0;

            while (true)
            {
                //Switch 的應用
                string ss = "";
                Console.Clear();
                Console.WriteLine("************ 甜點選單 *************");
                Console.WriteLine("a.布丁 b:冰淇淋 c:奶酪 d:雞蛋糕 all:全包了");
                Console.WriteLine("結束訂購請按exit");
                Console.WriteLine("請輸入甜點代號, 輸入完成按 Enter");
                ss = Console.ReadLine(); //讀取字串, enter輸入

                if (ss == "exit")
                {
                    break;
                }

                switch (ss)
                {
                    case "a":
                        Console.WriteLine("您選了布丁, 請投入30元");
                        break;
                    case "b":
                        Console.WriteLine("您選了冰淇淋, 請投入40元");
                        break;
                    case "c":
                        Console.WriteLine("您選了奶酪, 請投入50元");
                        break;
                    case "d":
                        Console.WriteLine("您選了雞蛋糕, 請投入60元");
                        break;
                    case "all":
                        Console.WriteLine("您全包了, 有折扣, 請投入160元");
                        break;
                    default:
                        Console.WriteLine("無此項商品");
                        break;
                }

                Console.WriteLine("===================================");
                Console.WriteLine("按任意鍵繼續訂購");
                Console.ReadKey();

            }
        }
    }
}
