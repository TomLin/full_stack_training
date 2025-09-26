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
            Console.WriteLine("========== 陣列 Array ===========");
            // 初始化整數陣列，在記憶體內，預留6個連續的空間，來放置整數，並且給予default value，在整數，是給0
            // 使用 new 這個 keyword
            int[] arrayOne = new int[6];

            Console.WriteLine($"取出陣列的元素： {arrayOne[0]}"); // 取出array中的第一個值

            Console.WriteLine("---------------------------------");

            arrayOne[0] = 1;
            arrayOne[1] = 2;
            arrayOne[2] = 3;
            arrayOne[3] = 4;
            arrayOne[4] = 5;
            arrayOne[5] = 6;

            Console.WriteLine($"Array的長度： {arrayOne.Length}");

            for (int i = 0 ; i < arrayOne.Length; i++)
            {
                Console.WriteLine( $"arrayOne[{i}] = {arrayOne[i]}" );
            }

            Console.WriteLine("---------------------------------");
            // array的簡寫
            int[] arrayTwo = new int[] {9,8,7,6,5,4,3,2,1};
            int[] arrayThree = { 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 };
            
            Console.WriteLine("---------------------------------");
            // 字串陣列
            string[] arrayCourse = { "Chinese", "English", "Math", "Natural Science", 
                "Computer Science", "Arts", "Biology" };

            Console.WriteLine("---------------------------------");
            Console.WriteLine("請輸入科目名稱(輸入完按Enter)");

            string ss = Console.ReadLine();
            bool isCourse = false;

            for (int i = 0; i < arrayCourse.Length; i++)
            {
                if (arrayCourse[i] == ss)
                { // 有開這門課
                    Console.WriteLine($"有這一門課:{ss} 趕快報名吧！\n");
                    isCourse = true;
                    break;
                }
                else
                { // 沒開這門課
                    isCourse = false;
                }
            }

            if (isCourse == false)
            {
                Console.WriteLine("無此科目");
            }


            Console.WriteLine("=================================");
            Console.ReadKey();
        }
    }
}
