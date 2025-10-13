using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp7
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("============ 陣列 Array ============");
            int[] arrayOne = new int[6]; //初始化陣列, 0 為初始值
            char[] arrayCharOne = new char[8];
            string[] arrayStringOne = new string[8];

            Console.WriteLine($"取出arrayOne陣列的元素: {arrayOne[5]}"); //索引值從0開始, 連續
            Console.WriteLine($"取出arrayCharOne的元素: _{arrayCharOne[2]}_");
            Console.WriteLine($"取出arrayStringOne的元素: _{arrayStringOne[3]}_");
            Console.WriteLine("--------------------------------------");

            arrayOne[0] = 1;
            arrayOne[1] = 2;
            arrayOne[2] = 3;
            arrayOne[3] = 4;
            arrayOne[4] = 5;
            arrayOne[5] = 6;

            for (int i = 0; i < 6; i += 1)
            {
                Console.WriteLine($"arrayOne[{i}] = {arrayOne[i]}");
            }
            Console.WriteLine("--------------------------------------");
            //陣列的簡寫
            int[] arrayTwo = new int[] { 9,8,7,6,5,4,3,2,1 };
            int[] arrayThree = { 10,20,30,40,50,60,70,80,90,100 };
            Console.WriteLine("--------------------------------------");
            //字串陣列
            string[] array科目名稱 = { "國文","英文","數學","自然","社會","電腦","美術","生物"};

            for (int i = 0; i < array科目名稱.Length; i += 1)
            //for (int i = 0; i <= array科目名稱.GetUpperBound(0); i += 1)
            {
                Console.WriteLine($"{array科目名稱[i]}");
            }
            Console.WriteLine("--------------------------------------");
            Console.WriteLine("請輸入科目名稱(輸入完成請按Ennter)");
            string ss = Console.ReadLine();
            bool is有這個科目 = false;

            for (int i = 0; i < array科目名稱.Length; i += 1)
            {
                if (array科目名稱[i] == ss)
                { //找到了
                    Console.WriteLine($"有開這門課:{ss},趕快報名吧 !!\n");
                    is有這個科目 = true;
                    break;
                }
                else
                { //找不到
                    is有這個科目 = false;
                }
            }

            if (is有這個科目 == false)
            {
                Console.WriteLine("無此科目");
            }

            Console.WriteLine("====================================");
            Console.ReadKey();
        }
    }
}
