using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp6
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("========= 多重迴圈 ===========");
            Console.WriteLine("--------- 十十乘法表 ---------");

            for (int i = 0; i < 10; i++)
            {
                for (int j = 0; j < 10; j++)
                {
                    Console.WriteLine($"十十乖法表: {i} x {j} = {i * j}");
                }
            }

            Console.WriteLine("----------- 表格 1 -----------");
            // 表格 table 15 列(row) 10 欄 (column)

            for (int i = 1; i <= 9; i++)
            {
                for (int j = 1;  j <= 9; j++)
                {
                    Console.Write($"[{i,-3},{j,-3}]"); // {word, -3} 表示 left aligned, length is 3
                }
                Console.WriteLine();
            }


            Console.WriteLine("====================");
            Console.ReadKey();
        }
    }
}
